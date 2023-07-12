import { BASE_URL } from '../api/pokemon.js';
import { POKEMON_PER_PAGE } from '../pokedex.js';

export function getId (url) {
  const startIndex = url.search('pokemon') + 8;
  const endIndex = url.length - 1;
  return url.slice(startIndex, endIndex);
}

export function getUrl (pageOffset) {
  const url = `${BASE_URL}?offset=${pageOffset}&limit=${POKEMON_PER_PAGE}`;
  return url;
}

/**
 * Formats the information of a Pokemon.
 *
 * @param {Object} pokemon - The Pokemon object to format.
 * @param {String} pokemon.name - The name of the Pokemon.
 * @param {Number} pokemon.height - The height of the Pokemon in decimeters.
 * @param {Number} pokemon.weight - The weight of the Pokemon in hectograms.
 * @param {String} pokemon.image - The URL of the Pokemon's image.
 * @param {Array} pokemon.types - An array of strings representing the types of the Pokemon.
 * @param {Array} pokemon.abilities - An array of strings representing the abilities of the Pokemon.
 * @returns {Object} - The formatted Pokemon object.
 */
export function formatPokemonData (pokemon) {
  const { name, height, weight, image, types, abilities } = pokemon;
  const typesString = types.join(' - ');
  const abilitiesString = abilities.join(' - ');
  const formattedWeight = `${weight / 10} kg`;
  const formattedHeight = `${height * 10} cm`;

  return {
    name,
    image,
    weight: formattedWeight,
    height: formattedHeight,
    types: typesString,
    abilities: abilitiesString
  };
}
