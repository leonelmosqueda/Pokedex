import { BASE_URL } from '../utilities/utilities.js';

export class PokemonInfoApi {
  async getPokemonInfo (id) {
    const url = `${BASE_URL}/${id}`;
    const response = await fetch(url);
    const pokemonInfo = await response.json();
    return pokemonInfo;
  }
}
