import convertTransportMode from '../utils/convertTransportMode';

test('underground', () => {
  expect(convertTransportMode('underground')).toBe('underground');
  expect(convertTransportMode('tube')).toBe('underground');
});

test('bus', () => {
  expect(convertTransportMode('bus')).toBe('bus');
  expect(convertTransportMode('replacement_bus')).toBe('bus');
});

test('train', () => {
  expect(convertTransportMode('train')).toBe('train');
  expect(convertTransportMode('national-rail')).toBe('train');
  expect(convertTransportMode('overground')).toBe('train');
});

test('walk', () => {
  expect(convertTransportMode('walk')).toBe('walk');
  expect(convertTransportMode('walking')).toBe('walk');
});

test('transfer', () => {
  expect(convertTransportMode('transfer')).toBe('transfer');
});

test('dlr', () => {
  expect(convertTransportMode('dlr')).toBe('dlr');
});
