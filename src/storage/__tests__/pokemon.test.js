import { fetchPokemonInfo, fetchPokemonList, savePokemon, savePokemonList } from "../pokemon";

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => store[key] = value.toString(),
    clear: () => store = {}
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

describe('fetchPokemonList function', () => {
  beforeEach(() => {
    localStorage.clear()
  });

  test('should throw an error if pokemon list is not found in localStorage', () => {
    const offset = 0;
    const limit = 10;
    const testFn = () => fetchPokemonList(offset, limit);

    const originalGetItem = localStorage.getItem;

    localStorage.getItem = () => null;
    
    expect(testFn).toThrow(`Pokemon list not found for offset=${offset} and limit=${limit}`);

    localStorage.getItem = originalGetItem;
  });

  test('should return pokemon list from localStorage', () => {
    const offset = 0;
    const limit = 10;
    const pokemonList = [{ name: 'pikachu' }, { name: 'bulbasaur' }];

    localStorage.setItem(`pokemon_list_${offset}_${limit}`, JSON.stringify(pokemonList));
    expect(fetchPokemonList(offset, limit)).toEqual(pokemonList);
  });
});

describe('fetchPokemonInfo function', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should return the pokemon info from localStorage', () => {
    const id = 1;
    const pokemonInfo = { name: 'bulbasaur', types: 'grass' };
    localStorage.setItem(`pokemon_info_${id}`, JSON.stringify(pokemonInfo));

    const result = fetchPokemonInfo(id);

    expect(result).toEqual(pokemonInfo);
  });

  test('should throw an error if ID is not provided', () => {
    const testFn = () => fetchPokemonInfo();
    expect(testFn).toThrowError('An ID is needed to fetch a pokemon');
  });

  test('should throw an error if the pokemon info is not found in localStorage', () => {
    const id = 1;
    const testFn = () => fetchPokemonInfo(id);

    expect(testFn).toThrowError(`Pokemon info with id ${id} not found`);
  });
});

describe('savePokemonList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should save the pokemon list to localStorage', () => {
    const offset = 0;
    const limit = 10;
    const pokemonList = [{ name: 'bulbasaur' }, { name: 'ivysaur' }];

    savePokemonList(offset, limit, pokemonList);

    const pokemonListLocalStorage = JSON.parse(localStorage.getItem(`pokemon_list_${offset}_${limit}`));

    expect(pokemonListLocalStorage).toEqual(pokemonList);
  });

  test('should throw an error if offset, limit or pokemon list are not provided', () => {
    const testFn = () => savePokemonList();

    expect(testFn).toThrowError('Offset, limit and pokemon list needed');
  });
});

describe('savePokemon', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should save the pokemon info to localStorage', () => {
    const id = 10;
    const pokemonInfo = { name: 'pikachu', types: 'lightning' };

    savePokemon(id, pokemonInfo);

    const pokemonInfoLocalStorage = JSON.parse(localStorage.getItem(`pokemon_info_${id}`));

    expect(pokemonInfoLocalStorage).toEqual(pokemonInfo);
  });

  test('should throw an error if id or pokemon are not provided', () => {
    const testFn = () => savePokemon();

    expect(testFn).toThrowError('An id and a pokemon are needed to save to localStorage');
  });
});