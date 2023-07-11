import { BASE_URL } from '../api/pokemon.js';
import { POKEMON_PER_PAGE } from '../pokedex.js';

export function getId (url) {
  return url.slice(url.search('pokemon') + 8, url.length - 1);
}

export function getUrl (offset) {
  return `${BASE_URL}?offset=${offset}&limit=${POKEMON_PER_PAGE}`;
}

/**
 * Formats the information of a Pokemon.
 *
 * @param {Object} pokemon - The Pokemon object to format.
 * @param {string} pokemon.name - The name of the Pokemon.
 * @param {number} pokemon.height - The height of the Pokemon in decimeters.
 * @param {number} pokemon.weight - The weight of the Pokemon in hectograms.
 * @param {string} pokemon.image - The URL of the Pokemon's image.
 * @param {Array} pokemon.types - An array of strings representing the types of the Pokemon.
 * @param {Array} pokemon.abilities - An array of strings representing the abilities of the Pokemon.
 * @return {Object} - The formatted Pokemon object.
 */
export function formatPokemonInfo ({ name, height, weight, image, types, abilities }) {
  const typesString = types.join(' - ');
  const abilitiesString = abilities.join(' - ');

  return {
    name,
    image,
    weight: `${weight / 10} kg`,
    height: `${height * 10} cm`,
    types: typesString,
    abilities: abilitiesString
  };
}
