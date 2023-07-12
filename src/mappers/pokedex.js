import { Pokemon } from '../entities/pokemon.js';
import { PokemonList } from '../entities/pokemonList.js';

/**
 * @param {Object} apiData
 * @returns {Pokemon}
 */

/**
 * Generates a new Pokemon object based on the provided API data.
 *
 * @param {Object} apiData - The data received from the API.
 * @return {Pokemon} The newly generated Pokemon object.
 */
export function mapPokemon (apiData) {
  const { id, name, height, weight, sprites, types, abilities } = apiData;
  const urlImage = sprites.other['official-artwork'].front_default;
  const typeNames = types.map((type) => type.type.name);
  const abilityNames = abilities.map((ability) => ability.ability.name);

  return new Pokemon(id, name, height, weight, urlImage, typeNames, abilityNames);
}

/**
 * This function maps the given API data to a PokemonList object.
 *
 * @param {object} apiData - The data obtained from the API.
 * @return {PokemonList} - The PokemonList object created from the API data.
 */
export function mapPokemonList (apiData) {
  const { count, results } = apiData;

  return new PokemonList(count, results);
}
