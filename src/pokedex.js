import { PokemonListApi } from './api/PokemonListApi.js';
import { Pokemon } from './entities/Pokemon.js';
import { PokemonList } from './entities/PokemonList.js';
import { PokemonListService } from './services/PokemonListService.js';
import { LocalStorageService } from './services/LocalStorageService.js';
import { showPokemonList } from './ui/list.js';
import { showPaginator } from './ui/paginator.js';
import { showPokemonInfo } from './ui/pokemon.js';
import { formatPokemonInfo } from './utilities/utilities.js';
import { PokemonInfoService } from './services/PokemonInfoService.js';
import { PokemonInfoApi } from './api/PokemonInfoApi.js';

export const POKEMON_PER_PAGE = 10;
let totalPages;

async function updatePokemonList (page) {
  const pokemonListService = new PokemonListService(new PokemonListApi(), new LocalStorageService());
  const pokemonData = new PokemonList(await pokemonListService.getAll(page));
  totalPages = Math.ceil(pokemonData.total / POKEMON_PER_PAGE);
  showPokemonList(pokemonData.list, updatePokemonInfo);
  showPaginator(page, totalPages, updatePokemonList);
}

async function updatePokemonInfo (id) {
  const pokemonInfoService = new PokemonInfoService(new PokemonInfoApi(), new LocalStorageService());
  const pokemon = new Pokemon(await pokemonInfoService.getAll(id));
  const formattedPokemonInfo = formatPokemonInfo(pokemon);
  showPokemonInfo(formattedPokemonInfo);
}

export async function init () {
  const initialPage = 1;
  const pokemonListService = new PokemonListService(new PokemonListApi(), new LocalStorageService());
  const pokemonData = new PokemonList(await pokemonListService.getAll(initialPage));
  totalPages = Math.ceil(pokemonData.total / POKEMON_PER_PAGE);
  showPokemonList(pokemonData.list, updatePokemonInfo);
  showPaginator(initialPage, totalPages, updatePokemonList);
}
