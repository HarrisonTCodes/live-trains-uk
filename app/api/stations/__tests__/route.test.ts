import { matchStation } from '../route';

test('exact match', () => {
  expect(matchStation('london bridge', 'lon')).toBe(true);
  expect(matchStation('london bridge', 'london b')).toBe(true);
  expect(matchStation('london bridge', 'london bridge')).toBe(true);
});

test('CRS match', () => {
  expect(matchStation('london bridge', 'lbg')).toBe(true);
  expect(matchStation('yarmouth (isle of wight)', 'ymh')).toBe(true);
  expect(matchStation('altnabreac', 'abc')).toBe(true);
});

test('word match', () => {
  expect(matchStation('london bridge', 'bri')).toBe(true);
  expect(matchStation('london bridge', 'bridge')).toBe(true);
  expect(matchStation('ashchurch for tewkesbury', 'for')).toBe(true);
});

test('no match', () => {
  expect(matchStation('london bridge', 'londn')).toBe(false);
  expect(matchStation('ashchurch for tewkesbury', 'bridge')).toBe(false);
  expect(matchStation('barrhill', 'hill')).toBe(false);
});
