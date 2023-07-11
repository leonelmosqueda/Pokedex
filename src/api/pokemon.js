import { POKEMON_PER_PAGE } from '../pokedex.js';

export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemonList (page = 1) {
  const limit = POKEMON_PER_PAGE;
  const offset = (page - 1) * limit;
  const url = `${BASE_URL}?offset=${offset}&limit=${limit}`;
  const response = await fetch(url);
  const data = response.json();
  return data;
}

export async function fetchPokemonInfo (id) {
  const url = `${BASE_URL}/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
