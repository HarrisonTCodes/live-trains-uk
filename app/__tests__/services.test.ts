import type { Service } from '../types/app';
import { getDestinationStats, getNextFastest } from '../utils/services';

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
  expect(
    getDestinationStats([{ arrivalCrs: 'AAA', duration: 20 }] as Service[]).get('AAA'),
  ).toEqual({
    averageDuration: 20,
    hasDurationVariance: false,
  });
});

test('returns no destination stats when there are no services', () => {
  expect(getDestinationStats([])).toEqual(new Map());
});

test('same day all on time', () => {
  expect(
    getNextFastest([
      { departureTime: '1:00', arrivalTime: '01:10', estimatedArrivalTime: 'On time' },
      { departureTime: '1:01', arrivalTime: '01:05', estimatedArrivalTime: 'On time' },
      { departureTime: '1:02', arrivalTime: '01:03', estimatedArrivalTime: 'On time' },
      { departureTime: '1:03', arrivalTime: '02:00', estimatedArrivalTime: 'On time' },
    ] as Service[]),
  ).toBe(2);
});

test('same day fastest scheduled delayed', () => {
  expect(
    getNextFastest([
      { departureTime: '1:00', arrivalTime: '01:10', estimatedArrivalTime: 'On time' },
      { departureTime: '1:01', arrivalTime: '01:05', estimatedArrivalTime: 'On time' },
      { departureTime: '1:02', arrivalTime: '01:03', estimatedArrivalTime: '01:20' },
      { departureTime: '1:03', arrivalTime: '02:00', estimatedArrivalTime: 'On time' },
    ] as Service[]),
  ).toBe(1);
});

test('same day fastest scheduled cancelled', () => {
  expect(
    getNextFastest([
      { departureTime: '1:00', arrivalTime: '01:10', estimatedArrivalTime: 'On time' },
      { departureTime: '1:01', arrivalTime: '01:05', estimatedArrivalTime: 'On time' },
      { departureTime: '1:02', arrivalTime: '01:03', estimatedArrivalTime: 'Cancelled' },
      { departureTime: '1:03', arrivalTime: '02:00', estimatedArrivalTime: 'On time' },
    ] as Service[]),
  ).toBe(1);
});

test('same day fastest scheduled departure cancelled', () => {
  expect(
    getNextFastest([
      { departureTime: '1:00', arrivalTime: '01:10', estimatedArrivalTime: 'On time' },
      { departureTime: '1:01', arrivalTime: '01:05', estimatedArrivalTime: 'On time' },
      {
        departureTime: '1:02',
        estimatedDepartureTime: 'Cancelled',
        arrivalTime: '01:03',
        estimatedArrivalTime: 'On time',
      },
      { departureTime: '1:03', arrivalTime: '02:00', estimatedArrivalTime: 'On time' },
    ] as Service[]),
  ).toBe(1);
});

test('same day all multiple fastest', () => {
  expect(
    getNextFastest([
      { departureTime: '1:00', arrivalTime: '01:10', estimatedArrivalTime: 'On time' },
      { departureTime: '1:01', arrivalTime: '01:02', estimatedArrivalTime: '01:05' },
      { departureTime: '1:02', arrivalTime: '01:05', estimatedArrivalTime: 'On time' },
      { departureTime: '1:03', arrivalTime: '02:00', estimatedArrivalTime: 'On time' },
    ] as Service[]),
  ).toBe(1);
});

test('different day no crossover service all on time', () => {
  expect(
    getNextFastest([
      { departureTime: '23:40', arrivalTime: '23:50', estimatedArrivalTime: 'On time' },
      { departureTime: '23:42', arrivalTime: '23:48', estimatedArrivalTime: 'On time' },
      { departureTime: '00:05', arrivalTime: '00:10', estimatedArrivalTime: 'On time' },
      { departureTime: '00:08', arrivalTime: '00:20', estimatedArrivalTime: 'On time' },
    ] as Service[]),
  ).toBe(1);
});

test('different day with crossover service all on time', () => {
  expect(
    getNextFastest([
      { departureTime: '23:40', arrivalTime: '23:50', estimatedArrivalTime: 'On time' },
      { departureTime: '23:42', arrivalTime: '23:48', estimatedArrivalTime: 'On time' },
      { departureTime: '23:55', arrivalTime: '00:05', estimatedArrivalTime: 'On time' },
      { departureTime: '00:08', arrivalTime: '00:20', estimatedArrivalTime: 'On time' },
    ] as Service[]),
  ).toBe(1);
});

test('different day with multiple crossover services all on time', () => {
  expect(
    getNextFastest([
      { departureTime: '23:40', arrivalTime: '23:50', estimatedArrivalTime: 'On time' },
      { departureTime: '23:42', arrivalTime: '23:48', estimatedArrivalTime: 'On time' },
      { departureTime: '23:55', arrivalTime: '00:05', estimatedArrivalTime: 'On time' },
      { departureTime: '23:58', arrivalTime: '00:10', estimatedArrivalTime: 'On time' },
      { departureTime: '00:08', arrivalTime: '00:20', estimatedArrivalTime: 'On time' },
    ] as Service[]),
  ).toBe(1);
});

test('different day delayed crossover service', () => {
  expect(
    getNextFastest([
      { departureTime: '23:40', arrivalTime: '00:07', estimatedArrivalTime: 'On time' },
      { departureTime: '23:42', arrivalTime: '00:10', estimatedArrivalTime: 'On time' },
      { departureTime: '23:55', arrivalTime: '00:05', estimatedArrivalTime: '01:00' },
      { departureTime: '00:08', arrivalTime: '00:30', estimatedArrivalTime: 'On time' },
    ] as Service[]),
  ).toBe(0);
});

test('all cancelled', () => {
  expect(
    getNextFastest([
      {
        departureTime: '23:40',
        estimatedDepartureTime: 'Cancelled',
        arrivalTime: '00:07',
        estimatedArrivalTime: 'On time',
      },
      { departureTime: '23:42', arrivalTime: '00:10', estimatedArrivalTime: 'Cancelled' },
    ] as Service[]),
  ).toBe(-1);
});

test('no services', () => {
  expect(getNextFastest([])).toBe(-1);
});
