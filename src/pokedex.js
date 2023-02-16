import { fetchPokemonInfo, fetchPokemonList } from './api/pokemon.js';
import { showPokemonList } from './ui/list.js';
import { showPaginator } from './ui/paginator.js';
import { showPokemonInfo } from './ui/pokemon.js';
import { formatPokemonInfo } from './utilities/utilities.js';

export const POKEMON_PER_PAGE = 10;
const currentPage = 1;
let pokemonListData = [];
let totalPages;

async function updatePokemonList (page) {
  pokemonListData = await fetchPokemonList(page);
  totalPages = Math.ceil(pokemonListData.totalPokemon / POKEMON_PER_PAGE);
  showPokemonList(pokemonListData.pokemonList, updatePokemonInfo);
  showPaginator(page, totalPages, updatePokemonList);
}

async function updatePokemonInfo (id) {
  const pokemonInfo = await fetchPokemonInfo(id);
  const formattedPokemonInfo = formatPokemonInfo(pokemonInfo);
  showPokemonInfo(formattedPokemonInfo);
}

export async function init () {
  pokemonListData = await fetchPokemonList(currentPage);
  totalPages = Math.ceil(pokemonListData.totalPokemon / POKEMON_PER_PAGE);
  showPokemonList(pokemonListData.pokemonList, updatePokemonInfo);
  showPaginator(currentPage, totalPages, updatePokemonList);
}
