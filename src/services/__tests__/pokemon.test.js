import { fetchPokemonInfo, fetchPokemonList } from "../pokemon";

jest.mock('../../storage/pokemon', () => ({
  ...jest.requireActual('../../storage/pokemon'),
  fetchPokemonList: jest.fn(),
  savePokemonList: jest.fn(),
  fetchPokemonInfo: jest.fn(),
  savePokemon: jest.fn(),
}));

jest.mock('../../api/pokemon', () => ({
  ...jest.requireActual('../../api/pokemon'),
  fetchPokemonList: jest.fn(),
  fetchPokemonInfo: jest.fn(),
}));

import { 
  fetchPokemonList as fetchPokemonListFromLocalStorage,
  fetchPokemonInfo as fetchPokemonInfoFromLocalStorage,
  savePokemonList,
  savePokemon, } from "../../storage/pokemon";
import { 
  fetchPokemonList as fetchPokemonListFromApi,
  fetchPokemonInfo as fetchPokemonInfoFromApi, } from "../../api/pokemon";

import { POKEMON_PER_PAGE } from "../../pokedex";

describe('fetchPokemonList function', () => {
  test('should return data from local storage when available', async () => {
    const mockData = [{ name: 'bulbasaur' }, {name: 'ivysaur'}];
    fetchPokemonListFromLocalStorage.mockImplementationOnce(() => mockData);
    const result = await fetchPokemonList(1);
    expect(result).toEqual(mockData);
  });

  test('should call fetchPokemonListFromApi and save data to local storage when not available in local storage', async () => {
    const mockData = [{ name: 'bulbasaur' }, { name: 'ivysaur' }];
    fetchPokemonListFromLocalStorage.mockImplementationOnce(() => { throw new Error(); });
    fetchPokemonListFromApi.mockImplementationOnce(() => Promise.resolve(mockData));
    savePokemonList.mockImplementationOnce(() => {});

    const result = await fetchPokemonList(1);
    
    expect(fetchPokemonListFromApi).toHaveBeenCalled();
    expect(savePokemonList).toHaveBeenCalledWith(0, POKEMON_PER_PAGE, mockData);
    expect(result).toEqual(mockData);
  });

  test('should call fetchPokemonListFromApi when an error occurs while trying to get data from local storage', async () => {
    fetchPokemonListFromLocalStorage.mockImplementationOnce(() => { throw new Error(); });
    fetchPokemonListFromApi.mockImplementationOnce(() => Promise.resolve([]));

    await fetchPokemonList(1);

    expect(fetchPokemonListFromApi).toHaveBeenCalled();
  })
});

describe('fetchPokemonInfo function services', () => {
  test('throws an error if called without an ID', async () => {
    await expect(fetchPokemonInfo()).rejects.toThrow('An id is needed to fetch a pokemon');
  });

  test('returns pokemon info from local storage if available', async () => {
    const mockData = { name: 'bulbasaur' };
    fetchPokemonInfoFromLocalStorage.mockReturnValueOnce(mockData);

    const result = await fetchPokemonInfo(1);

    expect(result).toEqual(mockData);
    expect(fetchPokemonInfoFromLocalStorage).toHaveBeenCalledWith(1);
  });

  test('calls api and saves to local storage if not available in local storage', async () => {
    const mockData = { name: 'bulbasaur' };
    fetchPokemonInfoFromLocalStorage.mockImplementationOnce(() => { throw new Error(); });
    fetchPokemonInfoFromApi.mockResolvedValueOnce(mockData);

    const result = await fetchPokemonInfo(2);
    expect(result).toEqual(mockData);
    expect(fetchPokemonInfoFromApi).toHaveBeenCalledWith(2);
    expect(savePokemon).toHaveBeenCalledWith(2, mockData)
  });
})
