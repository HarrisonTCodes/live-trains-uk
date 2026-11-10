import { convertTransportMode } from '../utils/plans';

test('underground', () => {
  expect(convertTransportMode('underground')).toBe('UNDERGROUND');
  expect(convertTransportMode('tube')).toBe('UNDERGROUND');
});

test('bus', () => {
  expect(convertTransportMode('bus')).toBe('BUS');
  expect(convertTransportMode('replacement-bus')).toBe('BUS');
});

test('train', () => {
  expect(convertTransportMode('train')).toBe('TRAIN');
  expect(convertTransportMode('national-rail')).toBe('TRAIN');
  expect(convertTransportMode('overground')).toBe('TRAIN');
});

test('walk', () => {
  expect(convertTransportMode('walk')).toBe('WALK');
  expect(convertTransportMode('walking')).toBe('WALK');
});

test('transfer', () => {
  expect(convertTransportMode('transfer')).toBe('TRANSFER');
});

test('dlr', () => {
  expect(convertTransportMode('dlr')).toBe('DLR');
});
