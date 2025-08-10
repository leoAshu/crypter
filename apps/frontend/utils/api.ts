const fetchTickers = async (cryptoIds: string[], fiatId: string): Promise<Record<string, Ticker>> => {
  const cryptoIdsParam = cryptoIds.join(',');

  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIdsParam}&vs_currencies=${fiatId}&include_24hr_change=true`,
  );

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();

  // Transform into our ticker structure
  const tickers: Record<string, Ticker> = {};
  Object.keys(data).forEach((id) => {
    tickers[id] = {
      symbol: id,
      price: data[id][fiatId],
      change24h: data[id][`${fiatId}_24h_change`],
    };
  });

  return tickers;
};

export { fetchTickers };
