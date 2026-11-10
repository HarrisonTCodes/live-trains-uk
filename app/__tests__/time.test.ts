import { getDuration, formatDuration } from '../utils/time';

test('same day time difference', () => {
  expect(getDuration('16:50', '17:21')).toBe(31);
  expect(getDuration('08:00', '10:00')).toBe(120);
  expect(getDuration('8:00', '10:00')).toBe(120);
  expect(getDuration('8:00', '13:02')).toBe(302);
});

test('next day time difference', () => {
  expect(getDuration('23:50', '00:10')).toBe(20);
  expect(getDuration('22:30', '01:15')).toBe(165);
});

test('edge cases', () => {
  expect(getDuration('00:00', '00:00')).toBe(0);
  expect(getDuration('23:59', '00:01')).toBe(2);
  expect(getDuration('12:00', '12:00')).toBe(0);
});

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
