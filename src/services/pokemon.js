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
import { mapPokemon, mapPokemonList } from '../mappers/pokedex.js';

export async function fetchPokemonList (page) {
  const limit = POKEMON_PER_PAGE;
  const offset = (page - 1) * limit;
  try {
    return fetchPokemonListFromLocalStorage(offset, limit);
  } catch (e) {
    const pokemonListData = await fetchPokemonListFromApi(page);
    const pokemonList = mapPokemonList(pokemonListData);
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
    const pokemonData = await fetchPokemonInfoFromApi(id);
    const pokemon = mapPokemon(pokemonData);
    savePokemon(id, pokemon);
    return pokemon;
  }
}
