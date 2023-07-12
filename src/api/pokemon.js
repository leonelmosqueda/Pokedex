import { POKEMON_PER_PAGE } from '../pokedex.js';

export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemonList (page = 1) {
  const limit = POKEMON_PER_PAGE;
  const offset = (page - 1) * limit;

  const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);

  return await response.json();
}

export async function fetchPokemonInfo (id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await response.json();
}
