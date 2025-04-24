import { selectFilteredSorted } from './cryptoSelectors';
test('selectFilteredSorted shows only gainers', () => {
  const state = {
    crypto: {
      assets: [
        { id:'a', percentChange24h: 5, marketCap: 2 },
        { id:'b', percentChange24h: -3, marketCap: 1 }
      ],
      filter: 'gainers',
      sortBy: 'marketCap',
      sortDir: 'asc'
    }
  };
  const out = selectFilteredSorted(state);
  expect(out).toEqual([{ id:'a', percentChange24h: 5, marketCap: 2 }]);
});
