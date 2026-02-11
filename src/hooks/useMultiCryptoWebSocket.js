import { useState, useEffect, useRef } from 'react';

const COINS = ['btcusdt', 'ethusdt', 'bnbusdt', 'solusdt', 'xrpusdt', 'adausdt'];

export const useMultiCryptoWebSocket = () => {
  const [marketData, setMarketData] = useState({});
  const [chartData, setChartData] = useState({});
  const [selectedCoin, setSelectedCoin] = useState('btcusdt');
  const prevPricesRef = useRef({});

  useEffect(() => {
    const streams = COINS.map(c => `${c}@trade`).join('/');
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

    ws.onopen = () => console.log('✅ Bağlantı Başarılı!');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const data = message.data;
      const symbol = data.s.toLowerCase();

      const currentPrice = parseFloat(data.p);
      if (!prevPricesRef.current[symbol]) {
        prevPricesRef.current[symbol] = currentPrice;
      }
      const openPrice = prevPricesRef.current[symbol];
      const changePercent = ((currentPrice - openPrice) / openPrice) * 100;

      setMarketData(prev => ({
        ...prev,
        [symbol]: {
          price: currentPrice,
          change: changePercent,
          time: data.T
        }
      }));
    };

    const interval = setInterval(() => {
        setChartData(prev => {
            const newCharts = { ...prev };
            setMarketData(currentMarket => {
                Object.keys(currentMarket).forEach(symbol => {
                    const coinData = currentMarket[symbol];
                    if(coinData) {
                        const existingData = newCharts[symbol] || [];
                        const lastPoint = existingData[existingData.length - 1];
                        // Veri tekrarını önle ama akışı bozma
                        if (!lastPoint || lastPoint.x !== coinData.time) {
                            const newPoint = { x: Date.now(), y: coinData.price };
                            const updatedData = [...existingData, newPoint];
                            if (updatedData.length > 100) updatedData.shift();
                            newCharts[symbol] = updatedData;
                        }
                    }
                });
                return currentMarket;
            });
            return newCharts;
        });
    }, 1000);

    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, []);

  return { marketData, chartData, selectedCoin, setSelectedCoin };
};