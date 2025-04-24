import cryptoReducer, { simulatePriceUpdate, setFilter } from './cryptoSlice';

test('simulatePriceUpdate tweaks prices', () => {
  const start = {
    assets: [{ id:'tst', price: 100, percentChange24h: 0, volume24h: 1_000 }],
    filter:'', sortBy:'price', sortDir:'asc'
  };
  const next = cryptoReducer(start, simulatePriceUpdate());
  expect(next.assets[0].price).not.toBe(100);
});

test('setFilter changes filter', () => {
  const start = { assets:[], filter:'', sortBy:'', sortDir:'' };
  const next = cryptoReducer(start, setFilter('gainers'));
  expect(next.filter).toBe('gainers');
});
