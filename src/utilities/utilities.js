import { BASE_URL } from '../api/pokemon.js';
import { POKEMON_PER_PAGE } from '../pokedex.js';

export function getId (url) {
  const index = url.search('/v2/pokemon/');
  if(index === -1) {
    throw new Error('Incorrect URL: must contain "pokemon"');
  }
  const lastIndex = url.lastIndexOf('/');
  return url.slice(index + 12, lastIndex);
}

export function getUrl (offset) {
  if (offset === null || offset === undefined || typeof offset !== 'number' || offset < 0 || isNaN(offset)) {
    throw new Error('Invalid parameter: offset must be a positive number and cannot be null or undefined');
  }

  return `${BASE_URL}?offset=${offset}&limit=${POKEMON_PER_PAGE}`;
}

export function formatPokemonInfo (pokemonData) {
  const { name, weight, height, types, abilities, sprites } = pokemonData;

  const image_url = sprites.other['official-artwork'].front_default;

  const formattedTypes = `${types.map(( { type: { name } }) => name).join(', ')}`;
  const formattedAbilities = `${abilities.map(( { ability: { name } }) => name).join(', ')}`;

  return {
    name,
    image: image_url,
    weight: `${weight / 10} kg`,
    height: `${height * 10} cm`,
    types: formattedTypes,
    abilities: formattedAbilities
  };
}
