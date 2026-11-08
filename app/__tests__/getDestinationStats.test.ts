import type { Service } from '../types/app';
import getDestinationStats from '../utils/getDestinationStats';

test('calculates average duration and variance separately for each destination', () => {
  const stats = getDestinationStats([
    { arrivalCrs: 'AAA', duration: 20 },
    { arrivalCrs: 'AAA', duration: 30 },
    { arrivalCrs: 'BBB', duration: 45 },
    { arrivalCrs: 'BBB', duration: 45 },
  ] as Service[]);

  expect(stats.get('AAA')).toEqual({ averageDuration: 25, hasDurationVariance: true });
  expect(stats.get('BBB')).toEqual({ averageDuration: 45, hasDurationVariance: false });
});

test('a single service has no duration variance', () => {
  expect(getDestinationStats([{ arrivalCrs: 'AAA', duration: 20 }] as Service[]).get('AAA')).toEqual({
    averageDuration: 20,
    hasDurationVariance: false,
  });
});

test('returns no destination stats when there are no services', () => {
  expect(getDestinationStats([])).toEqual(new Map());
});
