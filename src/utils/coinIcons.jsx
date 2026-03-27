/**
 * Coin Icons - Local PNG logos from public folder
 * No external dependencies - always loads reliably
 */

export const CoinIcon = ({ symbol, className = "w-7 h-7" }) => {
  const symbolLower = symbol.toLowerCase().slice(0, 3);

  const coinMap = {
    btc: '/btc-logo.png',
    eth: '/eth-logo.png',
    bnb: '/bnb-logo.png',
    sol: '/sol-logo.png',
    xrp: '/xrp-logo.png',
    ada: '/ada-logo.png',
  };

  const fileName = coinMap[symbolLower];
  if (!fileName) return null;

  return (
    <img
      src={fileName}
      alt={symbol}
      className={className}
      loading="lazy"
    />
  );
};
