// src/services/binance.js
export const createBinanceSocket = (symbols, onMessage) => {
    // Binance streams expect lowercase symbol pairs, e.g. btcusdt@ticker
    const streams = symbols.map(s => `${s.toLowerCase()}usdt@ticker`).join('/');
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
    ws.onmessage = evt => {
      const { s: symbol, c: price, P: pricePct24h } = JSON.parse(evt.data).data;
      onMessage({ symbol, price: +price, percentChange24h: +pricePct24h });
    };
    return ws;
  };
  