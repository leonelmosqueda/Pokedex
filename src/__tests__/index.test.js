import init from '../pokedex.js';
import '../index.js';

jest.mock('../pokedex.js', () => jest.fn());

test('init pokedex', () => {
  expect(init).toHaveBeenCalledTimes(1);
});
