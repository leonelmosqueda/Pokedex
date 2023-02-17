import { POKEMON_PER_PAGE } from '../pokedex.js';
import {
  fetchPokemonList as fetchPokemonListFromLocalStorage,
  fetchPokemonInfo as fetchPokemonInfoFromLocalStorage,
  savePokemonList,
  savePokemon
} from '../storage/pokemon.js';
import {
  fetchPokemonList as fetchPokemonListFromApi,
  fetchPokemonInfo as fetchPokemonInfoFromApi
} from '../api/pokemon.js';

export async function fetchPokemonList (page) {
  const limit = POKEMON_PER_PAGE;
  const offset = (page - 1) * limit;
  try {
    return fetchPokemonListFromLocalStorage(offset, limit);
  } catch (e) {
    const pokemonList = await fetchPokemonListFromApi(page);
    savePokemonList(offset, limit, pokemonList);
    return pokemonList;
  }
}

export async function fetchPokemonInfo (id) {
  if (id === undefined) {
    throw new Error('An id is needed to fetch a pokemon');
  }

  try {
    return fetchPokemonInfoFromLocalStorage(id);
  } catch (e) {
    const pokemonInfo = await fetchPokemonInfoFromApi(id);
    savePokemon(id, pokemonInfo);
    return pokemonInfo;
  }
}
