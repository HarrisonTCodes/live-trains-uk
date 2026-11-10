import { toAlertText } from '../utils/alerts';

test('removes markup and keeps words separated', () => {
  expect(
    toAlertText('<p>Trains running <strong>between</strong> stations.</p><p>More info.</p>'),
  ).toBe('Trains running between stations. More info.');
});

test('decodes named and numeric non-breaking spaces', () => {
  expect(toAlertText('Trains between&nbsp;Station and Station&#160;may be delayed.')).toBe(
    'Trains between Station and Station may be delayed.',
  );
  expect(toAlertText('Trains&#xA0;are delayed.')).toBe('Trains are delayed.');
});

test('decodes common and numeric character references', () => {
  expect(toAlertText('Trains &amp; buses &#8217; &#x2019;')).toBe('Trains & buses ’ ’');
});

test.each(['More details', 'Latest information'])(
  'removes the %s suffix and everything after it',
  (suffix) => {
    expect(toAlertText(`Trains are delayed. ${suffix} can be found in <a>this link</a>.`)).toBe(
      'Trains are delayed.',
    );
  },
);

test('normalizes repeated whitespace', () => {
  expect(toAlertText('<p>Trains   are</p>\n delayed.')).toBe('Trains are delayed.');
});
