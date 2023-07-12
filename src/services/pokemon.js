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

/**
 * Fetches a list of Pokemon based on the provided page number.
 *
 * @typedef { import('../entities/pokemonList').PokemonList } PokemonList
 *
 * @param {Number} page - The page number to fetch the Pokemon list from.
 * @return {Promise<PokemonList>} pokemonList - A promise that resolves to an PokemonList object.
 */
export async function fetchPokemonList (page) {
  const limit = POKEMON_PER_PAGE;
  const offset = (page - 1) * limit;

  try {
    const pokemonList = await fetchPokemonListFromLocalStorage(offset, limit);
    return pokemonList;
  } catch (error) {
    const pokemonListData = await fetchPokemonListFromApi(page);
    const pokemonList = mapPokemonList(pokemonListData);
    savePokemonList(offset, limit, pokemonList);
    return pokemonList;
  }
}

/**
 * Fetches pokemon data based on the given id.
 * @typedef { import('../entities/pokemon').Pokemon } Pokemon
 *
 * @param {number} id - The id of the pokemon to fetch.
 * @return {Promise<Pokemon>} The pokemon data.
 */
export async function fetchPokemonData (id) {
  if (id === undefined) {
    throw new Error('An id is needed to fetch a pokemon');
  }

  try {
    return await fetchPokemonInfoFromLocalStorage(id);
  } catch (error) {
    const pokemonData = await fetchPokemonInfoFromApi(id);
    const pokemon = mapPokemon(pokemonData);
    savePokemon(id, pokemon);
    return pokemon;
  }
}
