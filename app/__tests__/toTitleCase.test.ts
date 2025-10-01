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

test('handles kebab-case', () => {
  expect(toTitleCase('tir-phil')).toBe('Tir-Phil');
});

test('handles special untitled words', () => {
  expect(toTitleCase('ashton-under-lyne')).toBe('Ashton-under-Lyne');
  expect(toTitleCase('clacton-on-sea')).toBe('Clacton-on-Sea');
  expect(toTitleCase('chapel-en-le-frith')).toBe('Chapel-en-le-Frith');
  expect(toTitleCase('ashchurch for tewkesbury')).toBe('Ashchurch for Tewkesbury');
});

test('handles station names beginning with "the"', () => {
  expect(toTitleCase('the hawthorns')).toBe('The Hawthorns');
  expect(toTitleCase('the lakes')).toBe('The Lakes');
});
