import { fetchPokemonList, fetchPokemonData } from './services/pokemon.js';
import { showPokemonList } from './ui/list.js';
import { showPaginator } from './ui/paginator.js';
import { showPokemonInfo } from './ui/pokemon.js';
import { formatPokemonData } from './utilities/utilities.js';

export const POKEMON_PER_PAGE = 10;
const currentPage = 1;

async function updatePokemonList (page) {
  const pokemonListData = await fetchPokemonList(page);
  const totalPages = Math.ceil(pokemonListData.total / POKEMON_PER_PAGE);

  showPokemonList(pokemonListData.results, updatePokemonInfo);
  showPaginator(page, totalPages, updatePokemonList);
}

async function updatePokemonInfo (id) {
  try {
    const pokemonData = await fetchPokemonData(id);
    const formattedPokemonData = formatPokemonData(pokemonData);
    showPokemonInfo(formattedPokemonData);
  } catch (error) {
    console.error('Failed to update Pokemon info:', error);
  }
}

export async function init () {
  const pokemonListData = await fetchPokemonList(currentPage);
  const totalPages = Math.ceil(pokemonListData.total / POKEMON_PER_PAGE);

  const updatePokemonInfoCallback = updatePokemonInfo;
  const updatePokemonListCallback = updatePokemonList;

  showPokemonList(pokemonListData.results, updatePokemonInfoCallback);
  showPaginator(currentPage, totalPages, updatePokemonListCallback);
}
