import { POKEMON_PER_PAGE } from '../../pokedex';
import { BASE_URL, fetchPokemonInfo, fetchPokemonList } from '../pokemon';
import pokemonListPage1 from '../../../cypress/fixtures/pokemon-list-page-1.json';
import pokemonListPage2 from '../../../cypress/fixtures/pokemon-list-page-2.json';
import pokemonInfoBulbasaur from '../../../cypress/fixtures/pokemon-info-bulbasaur.json';

describe('fetchPokemonList function', () => {
  const totalPokemon = 1279;

  beforeEach(() => {
    global.fetch = jest.fn();
    const { count, results } = pokemonListPage1
    global.fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        count,
        results
      })
    }));
  });

  it('returns a list of pokemon with the correct number of elements', async () => {
    const data = await fetchPokemonList();
    
    expect(data.pokemonList).toHaveLength(POKEMON_PER_PAGE);
  });

  it('returns a list of pokemon with valid names and URLs', async () => {
    const data = await fetchPokemonList();

    data.pokemonList.forEach(pokemon => {
      expect(pokemon.name).toBeTruthy();
      expect(pokemon.url).toMatch(/^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\d+\/$/);
    });
  });

  it('returns the correct value for totalPokemon', async () => {
    const data = await fetchPokemonList();

    expect(data.totalPokemon).toBe(totalPokemon);
  });

  it('returns the correct list of pokemon for page 2', async () => {
    const { count, results } = pokemonListPage2;
    global.fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        count,
        results
      })
    }));

    const data = await fetchPokemonList(2);

    expect(data.pokemonList).toHaveLength(POKEMON_PER_PAGE);
    expect(data.totalPokemon).toBe(totalPokemon);
  });
});

describe('fetchPokemonInfo function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    global.fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(pokemonInfoBulbasaur)
    }));
  });

  it('should returns correct data when ID is valid', async () => {
    const id = 1;
    const data = await fetchPokemonInfo(id);

    expect(data).toBeDefined();
    expect(data.id).toBe(id);
  });

  it('should handles errors correctly', async () => {
    global.fetch.mockReset();
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        status: 404
      })
    );

    const invalidId = 'invalid';
    await expect(fetchPokemonInfo(invalidId)).rejects.toThrow();
  });

  it('should call the correct URL and use fetch', async () => {
    const id = 1;
    const expectedUrl = `${BASE_URL}/${id}`;

    global.fetch.mockReset();
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(pokemonInfoBulbasaur),
      })
    );

    await fetchPokemonInfo(id);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });
});
