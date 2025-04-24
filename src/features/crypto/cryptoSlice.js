// src/features/crypto/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 93759.48,
      percentChange1h: 0.43,
      percentChange24h: 0.93,
      percentChange7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21.0,
      chartData7d: Array.from({ length: 7 }, () => Math.random() * 10 + 90),
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      percentChange1h: 0.60,
      percentChange24h: 3.21,
      percentChange7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      chartData7d: Array.from({ length: 7 }, () => Math.random() * 5 + 80),
    },
    {
      id: 'usdt',
      name: 'Tether',
      symbol: 'USDT',
      price: 1.0,
      percentChange1h: 0.00,
      percentChange24h: 0.00,
      percentChange7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      chartData7d: Array.from({ length: 7 }, () => 1 + Math.random() * 0.02 - 0.01),
    },
    {
      id: 'xrp',
      name: 'XRP',
      symbol: 'XRP',
      price: 2.22,
      percentChange1h: 0.46,
      percentChange24h: 0.54,
      percentChange7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      chartData7d: Array.from({ length: 7 }, () => Math.random() * 2 + 1.5),
    },
    {
      id: 'sol',
      name: 'Solana',
      symbol: 'SOL',
      price: 151.51,
      percentChange1h: 0.53,
      percentChange24h: 1.26,
      percentChange7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      circulatingSupply: 517.31,
      maxSupply: null,
      chartData7d: Array.from({ length: 7 }, () => Math.random() * 20 + 130),
    },
  ],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    simulatePriceUpdate(state) {
      state.assets.forEach(asset => {
        // random factor between -0.5% and +0.5%
        const f = 1 + (Math.random() - 0.5) / 100;
        asset.price = +(asset.price * f).toFixed(2);
        asset.percentChange1h = +((Math.random() - 0.5)).toFixed(2);
        asset.percentChange24h = +((Math.random() - 0.5) * 2).toFixed(2);
        asset.percentChange7d = +((Math.random() - 0.5) * 10).toFixed(2);
        asset.volume24h = Math.round(asset.volume24h * f);
        // shift chartData7d and append new point
        asset.chartData7d.shift();
        asset.chartData7d.push(+asset.price.toFixed(2));
      });
    },
  },
});

export const { simulatePriceUpdate } = cryptoSlice.actions;
export default cryptoSlice.reducer;
