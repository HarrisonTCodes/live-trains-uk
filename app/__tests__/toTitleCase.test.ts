import toTitleCase from '../utils/toTitleCase';

test('handles one word', () => {
  expect(toTitleCase('hello')).toBe('Hello');
  expect(toTitleCase('world')).toBe('World');
});

test('handles multiple words', () => {
  expect(toTitleCase('hello world')).toBe('Hello World');
  expect(toTitleCase('this is a jest test')).toBe('This Is A Jest Test');
});

test('handles mixed case', () => {
  expect(toTitleCase('hELLo WoRLD')).toBe('Hello World');
  expect(toTitleCase('ThIs is a JEsT teST')).toBe('This Is A Jest Test');
});

test('handles all caps', () => {
  expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
  expect(toTitleCase('THIS IS A JEST TEST')).toBe('This Is A Jest Test');
});

test('handles empty string input', () => {
  expect(toTitleCase('')).toBe('');
});

test('handles single character words', () => {
  expect(toTitleCase('a b c d')).toBe('A B C D');
});
