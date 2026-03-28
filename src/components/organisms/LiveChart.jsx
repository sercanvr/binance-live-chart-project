import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { useMultiCryptoWebSocket } from '../../hooks/useMultiCryptoWebSocket';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../atoms/Card';
import { CoinIcon } from '../../utils/coinIcons';
/**
 * Özel Tooltip Bileşeni
 * Recharts tooltip'ini Binance temasına uygun şekilde stillendirir.
 */
const CustomChartTooltip = ({ active, payload, formatPrice }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-foreground text-background px-3 py-2 rounded-lg text-sm font-mono font-medium shadow-lg border border-border">
        ${formatPrice(value)}
      </div>
    );
  }
  return null;
};

const LiveChart = () => {
  const { marketData, chartData, selectedCoin, setSelectedCoin } = useMultiCryptoWebSocket();
  const currentMarket = marketData[selectedCoin];
  const currentChart = chartData[selectedCoin] || [];
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Fiyat formatlama: Düşük fiyatlı coinler için 4 ondalık, diğerleri için 2
  const formatPrice = (price) => {
    if (!price) return '---.--';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price);
  };

  // Sayfa title'ını canlı fiyatla güncelle
  useEffect(() => {
    if (currentMarket) {
      const formattedPrice = formatPrice(currentMarket.price);
      document.title = `$${formattedPrice} | ${selectedCoin.slice(0, 3).toUpperCase()} USDT | ₿inance Live Chart`;
    }
  }, [currentMarket, selectedCoin]);

  // Recharts için veri formatı: { x: timestamp, y: price } -> { time: ts, price: val }
  const rechartsData = currentChart.map((point) => ({
    time: point.x,
    price: point.y,
  }));

  /**
   * Y Ekseni Domain Hesaplama
   * min/max fiyatı alıp %10 padding ekler.
   * Böylece çizgi hiçbir zaman kutunun tavanına/tabanına yapışmaz.
   */
  const yDomain = useMemo(() => {
    if (rechartsData.length < 2) return ['auto', 'auto'];
    const prices = rechartsData.map(d => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || max * 0.001; // Aynı fiyatta sıfır bölme koruması
    const padding = range * 0.15; // %15 üst/alt boşluk
    return [min - padding, max + padding];
  }, [rechartsData]);

  const isPositive = (currentMarket?.change || 0) >= 0;
  const chartColor = isPositive ? '#10b981' : '#ef4444';

  // Coin kısaltması (tekrar kullanım için)
  const coinSymbol = selectedCoin.slice(0, 3);
  const coinKey = coinSymbol.toLowerCase();

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto p-4 items-start">

      {/* SOL KOLON: Grafik + Bilgi Kartları */}
      <div className="flex-1 flex flex-col gap-6 w-full">

        {/* === ANA GRAFİK KARTI (ReUI Pattern) === */}
        <div className="bg-muted/30 dark:bg-muted/20 border border-border rounded-3xl p-2.5 shadow-sm">
          <Card className="rounded-[28px] bg-background border-border/50 p-5 md:p-6">

            {/* Kart Başlığı: Coin bilgisi + border-bottom */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-border">
              <div className="flex items-center gap-3">
                {/* Coin Logosu */}
                <div className="flex items-center justify-center size-10 rounded-full bg-muted/80 overflow-hidden border-2 border-gray-700 dark:border-gray-700">
                  <CoinIcon symbol={coinSymbol} className="w-7 h-7" />
                </div>
                {/* Coin Adı + Alt Başlık */}
                <div className="flex flex-col gap-0.5">
                  <h1 className="text-base font-semibold text-foreground uppercase leading-none flex items-center gap-2">
                    {coinSymbol}/USDT
                    <span className="text-[10px] bg-[#FCD535] text-gray-700 px-1.5 py-0.5 rounded border border-[#D4A000] font-medium font-semibold">
                      {t('market.perp')}
                    </span>
                  </h1>
                  <p className="text-sm text-muted-foreground">{t('market.realTimePrice')}</p>
                </div>
              </div>
            </div>

            {/* Ana Metrik: Fiyat + Değişim Yüzdesi */}
            <div className="space-y-1.5 mb-6">
              <div className={`text-3xl md:text-4xl font-semibold tracking-tight transition-colors duration-300 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {currentMarket ? `$${formatPrice(currentMarket.price)}` : t('market.loading')}
              </div>
              <div className="flex items-center gap-2 text-sm">
                {isPositive ? (
                  <TrendingUp className="size-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="size-4 text-red-500" />
                )}
                <span className={`font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {currentMarket ? `${currentMarket.change >= 0 ? '+' : ''}${currentMarket.change.toFixed(2)}%` : '0.00%'}
                </span>
                <span className="text-muted-foreground">{t('market.change1s')}</span>
              </div>
            </div>

            {/* === RECHARTS AREA CHART === */}
            <div className="relative h-48 md:h-56 w-full overflow-hidden rounded-xl">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={rechartsData}
                  margin={{ top: 8, left: 0, right: 0, bottom: 0 }}
                >
                  {/* Gradient Tanımları */}
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.6} />
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0.05} />
                    </linearGradient>
                    {/* Aktif nokta gölgesi */}
                    <filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="1" dy="1" stdDeviation="3" floodColor={chartColor} floodOpacity="0.5" />
                    </filter>
                  </defs>

                  {/* X Ekseni: Gizli (temiz görünüm) */}
                  <XAxis dataKey="time" hide />

                  {/* Y Ekseni: %15 padding ile taşmayı önle */}
                  <YAxis domain={yDomain} hide />

                  {/* Özel Tooltip */}
                  <RechartsTooltip
                    content={<CustomChartTooltip formatPrice={formatPrice} />}
                    cursor={{
                      strokeWidth: 1,
                      strokeDasharray: '3 3',
                      stroke: chartColor,
                      strokeOpacity: 0.7,
                    }}
                  />

                  {/* Area: Doğal Eğrili Gradient */}
                  <Area
                    dataKey="price"
                    type="natural"
                    fill="url(#priceGradient)"
                    stroke={chartColor}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: chartColor,
                      stroke: isDark ? '#09090b' : '#ffffff',
                      strokeWidth: 2,
                      filter: 'url(#dotShadow)',
                    }}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Binance Logo Watermark - Sol Alt Köşe */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 opacity-100 pointer-events-none select-none">
                <svg viewBox="0 0 126.61 126.61" className="h-3.5 w-3.5" fill="#F0B90B">
                  <path d="M38.73 53.2l24.59-24.58 24.6 24.6 14.3-14.31L63.32 0l-38.9 38.9 14.31 14.3zM0 63.31l14.3-14.31 14.31 14.31L14.3 77.62 0 63.31zm38.73 10.11l24.59 24.59 24.6-24.6 14.31 14.32-38.9 38.9-38.91-38.91 14.31-14.3zM97.41 63.31l14.3-14.31 14.31 14.31-14.31 14.31-14.3-14.31z" />
                  <path d="M77.83 63.3L63.32 48.78 52.59 59.51l-1.24 1.23-2.54 2.54 14.51 14.51 14.51-14.51.01-.01-.01.03z" />
                </svg>
                <span className="text-[10px] font-medium text-muted-foreground/50">Binance</span>
              </div>
            </div>

            {/* Veri Kaynağı Atfı */}
            <p className="text-center text-xs text-muted-foreground/60 mt-4">
              {t('market.dataProvided')}
            </p>
          </Card>
        </div>

        {/* === PİYASA BİLGİSİ KARTI === */}
        <Card className="p-5 md:p-6 bg-background">
          <h3 className="text-lg font-semibold text-foreground mb-2 uppercase">
            {t('market.about', { symbol: coinSymbol.toUpperCase() })}
          </h3>
          <div className="min-h-[100px]">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(`coins.${coinKey}.description`)}
            </p>
            <br />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(`coins.${coinKey}.description2`)}
            </p>
            <br />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(`coins.${coinKey}.description3`)}
            </p>
            <br />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(`coins.${coinKey}.description4`)}
            </p>
            <br />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(`coins.${coinKey}.description5`)}
            </p>
          </div>
          {/* Etiketler — flex-wrap ile taşarsa alta iner */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">
              #{coinSymbol.toUpperCase()}
            </span>
            <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded border border-blue-500/20">
              {t('tags.crypto')}
            </span>
            <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded border border-purple-500/20">
              {t('tags.defi')}
            </span>
            <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20">
              {t('tags.blockchain')}
            </span>
            <span className="text-xs bg-orange-500/10 text-orange-500 px-2 py-1 rounded border border-orange-500/20">
              {t('tags.web3')}
            </span>
            <span className="text-xs bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded border border-cyan-500/20">
              {t('tags.trading')}
            </span>
            <span className="text-xs bg-rose-500/10 text-rose-500 px-2 py-1 rounded border border-rose-500/20">
              {t('tags.investment')}
            </span>
            <span className="text-xs bg-fuchsia-500/10 text-fuchsia-500 px-2 py-1 rounded border border-fuchsia-500/20">
              {t('tags.altcoin')}
            </span>
          </div>
        </Card>
      </div>

      {/* SAĞ KOLON: Market Listesi + Trade Butonu */}
      <div className="w-full lg:w-80 flex flex-col gap-6">

        {/* Market Listesi Kartı */}
        <Card className="p-0 bg-background h-fit rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">{t('market.title')}</h3>
          </div>
          <div className="flex flex-col">
            {['btcusdt', 'ethusdt', 'bnbusdt', 'solusdt', 'xrpusdt', 'adausdt'].map((coin, index, array) => {
              const coinData = marketData[coin];
              const isSelected = selectedCoin === coin;
              const coinChange = coinData?.change || 0;
              const isLast = index === array.length - 1;

              return (
                <div
                  key={coin}
                  onClick={() => setSelectedCoin(coin)}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-all
                    border-b border-border/50 last:border-0 hover:bg-muted/50 relative
                    ${isSelected
                      ? 'bg-primary/10 dark:bg-primary/15'
                      : ''}
                    ${isLast ? 'rounded-b-xl' : ''}`}
                >
                  {/* Seçili coin göstergesi (sol kenar çizgisi) */}
                  {isSelected && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-primary ${isLast ? 'rounded-bl-xl' : ''}`} />
                  )}

                  <div className="flex items-center gap-3 pl-2">
                    <CoinIcon symbol={coin} className="w-8 h-8" />
                    <div>
                      <div className={`font-bold uppercase ${
                        isSelected
                          ? 'text-foreground dark:text-white'
                          : 'text-foreground/90'
                      }`}>
                        {coin.slice(0, 3)}
                      </div>
                      <div className="text-xs text-muted-foreground">USDT</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-mono ${
                      isSelected
                        ? 'text-foreground dark:text-white'
                        : 'text-foreground/90'
                    }`}>
                      {coinData ? `$${formatPrice(coinData.price)}` : '---'}
                    </div>
                    <div className={`text-xs font-medium ${coinChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {coinChange >= 0 ? '+' : ''}{coinChange.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Trade Butonu — Liquid glass efekt */}
        <a
          href={`https://www.binance.com/en/trade/${coinSymbol.toUpperCase()}_USDT`}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full bg-primary backdrop-blur-md text-gray-700 dark:text-white hover:text-white dark:hover:text-[#2E343E] font-bold
                    py-4 rounded-xl shadow-sm active:scale-[0.97]
                    flex items-center justify-center gap-2.5 text-base
                    border-2 border-gray-700 dark:border-white hover:border-primary dark:hover:border-primary"
        >
          <span>{t('market.trade')} {coinSymbol.toUpperCase()}</span>
          <i className="fa-solid fa-right-from-bracket text-sm" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default LiveChart;