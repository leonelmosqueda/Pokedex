import { Pokemon } from '../entities/pokemon.js';

/**
 * @param {Object} apiData
 * @returns {Pokemon}
 */

export function mapPokemon (apiData) {
  const { id, name, height, weight, sprites, types, abilities } = apiData;
  const urlImage = sprites.other['official-artwork'].front_default;
  const typeNames = types.map((type) => type.type.name);
  const abilityNames = abilities.map((ability) => ability.ability.name);

  return new Pokemon(id, name, height, weight, urlImage, typeNames, abilityNames);
}
