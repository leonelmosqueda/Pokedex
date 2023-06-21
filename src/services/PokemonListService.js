import { POKEMON_PER_PAGE } from '../pokedex.js';

export class PokemonListService {
  constructor (pokemonListApi, localStorageService) {
    this.api = pokemonListApi;
    this.localStorage = localStorageService;
  }

  async getAll (page) {
    const limit = POKEMON_PER_PAGE;
    const offset = (page - 1) * limit;
    try {
      return this.localStorage.getPokemonList(offset, limit);
    } catch (error) {
      const pokemonList = await this.api.getAll(page);
      this.localStorage.cachePokemonList(offset, limit, pokemonList);
      return pokemonList;
    }
  }
}
