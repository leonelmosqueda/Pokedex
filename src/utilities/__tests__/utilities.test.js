import { formatPokemonInfo, getId, getUrl } from "../utilities.js";
import pokemonInfoBulbasaur from '../../../cypress/fixtures/pokemon-info-bulbasaur.json';

describe('getId function', () => {
  it('should return the correct ID with a valid URL', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/25/';
    const id = getId(url);
    const expected = '25';
    expect(id).toEqual(expected);
  });

  it('should throw an error when URL is incorrect', () => {
    const url = 'https://pokeapi.co/api/v2/pokemonn/25/';
    const error = 'Incorrect URL: must contain "pokemon"';
    const testFn = () => getId(url);

    expect(testFn).toThrow(error);
  });
});

describe('getUrl function', () => {
  it('should return the correct URL with a valid offset', () => {
    const offset = 0;
    const expectedUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';

    expect(getUrl(offset)).toEqual(expectedUrl);
  });

  it('should throw an error when offset is undefined', () => {
    const offset = undefined;
    const error= 'Invalid parameter: offset must be a positive number and cannot be null or undefined';

    const testFn = () => getUrl(offset);

    expect(testFn).toThrow(error);
  });

  it('should throw an error when offset is null', () => {
    const offset = null;
    const error = 'Invalid parameter: offset must be a positive number and cannot be null or undefined';

    const testFn = () => getUrl(offset);

    expect(testFn).toThrow(error);
  });

  it('should throw an error when offset is NaN', () => {
    const offset = NaN;
    const error = 'Invalid parameter: offset must be a positive number and cannot be null or undefined';

    const testFn = () => getUrl(offset);

    expect(testFn).toThrow(error);
  });

  it('should throw an error when offset is a negative number', () => {
    const offset = -10;
    const error = 'Invalid parameter: offset must be a positive number and cannot be null or undefined';

    const testFn = () => getUrl(offset);

    expect(testFn).toThrow(error);
  });
});

describe('formatPokemonInfo function', () => {
  test('should return an object with formatted pokemon data', () => {
    const mockPokemonData = pokemonInfoBulbasaur;
    const formattedPokemonInfo = formatPokemonInfo(mockPokemonData);
    const expectedInfo = {
      name: 'bulbasaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      weight: '6.9 kg',
      height: '70 cm',
      types: 'grass, poison',
      abilities: 'overgrow, chlorophyll', 
    };

    expect(formattedPokemonInfo).toEqual(expectedInfo);
  });
});