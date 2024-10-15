import formatDuration from '../utils/formatDuration';

test('hours and minutes', () => {
  expect(formatDuration(125)).toBe('2h 5m');
  expect(formatDuration(90)).toBe('1h 30m');
});

test('only hours', () => {
  expect(formatDuration(120)).toBe('2h');
  expect(formatDuration(60)).toBe('1h');
});

test('only minutes', () => {
  expect(formatDuration(45)).toBe('45m');
  expect(formatDuration(10)).toBe('10m');
});
