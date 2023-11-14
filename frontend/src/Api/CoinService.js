export const SingleCoin = id => `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 14, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`;
