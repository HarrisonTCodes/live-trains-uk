import formatEstimated from '../utils/formatEstimated';

test('times', () => {
  expect(formatEstimated('18:54')).toBe('Estimated 18:54');
  expect(formatEstimated('12:01')).toBe('Estimated 12:01');
  expect(formatEstimated('00:13')).toBe('Estimated 00:13');
});

test('states', () => {
  expect(formatEstimated('Delayed')).toBe('Delayed');
  expect(formatEstimated('Cancelled')).toBe('Cancelled');
  expect(formatEstimated('On time')).toBe('On time');
});

test('undefined', () => {
  expect(formatEstimated()).toBe('');
});
