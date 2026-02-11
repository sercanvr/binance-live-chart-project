import { useState, useEffect, useRef } from 'react';
export const useBinanceWebSocket = (symbol = 'btcusdt') => {
// Ekrana basılacak son fiyat (React State)
const [data, setData] = useState(null);
// Performance Optimization
const bufferRef = useRef(null);
// WebSocket bağlantısı
const wsRef = useRef(null);

useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
    wsRef.current = ws;

    ws.onopen = () => {
        console.log('🟢 WebSocket Bağlantısı Kuruldu:', symbol);
    };

    ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const tradeData = {
        price: new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(parseFloat(message.p)),
        time: message.T,
        quantity: message.q
    };

    bufferRef.current = tradeData;
    };

    ws.onclose = () => console.log('🔴 WebSocket Bağlantısı Koptu');
    ws.onerror = (err) => console.error('⚠️ WebSocket Hatası:', err);

    const interval = setInterval(() => {
    if (bufferRef.current) {
        setData(bufferRef.current);
        bufferRef.current = null;
    }
    }, 500);

    return () => {
        clearInterval(interval);
        ws.close();
    };
}, [symbol]);

    return data;
};