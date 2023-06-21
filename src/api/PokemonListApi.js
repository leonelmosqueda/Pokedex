import { POKEMON_PER_PAGE } from '../pokedex.js';
import { BASE_URL } from '../utilities/utilities.js';

export class PokemonListApi {
  async getAll (page) {
    const limit = POKEMON_PER_PAGE;
    const offset = (page - 1) * limit;
    const url = `${BASE_URL}?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    const pokemonList = data.results.map((result) => ({
      name: result.name,
      url: result.url
    }));

    return {
      pokemonList,
      totalPokemon: data.count
    };
  }
}
