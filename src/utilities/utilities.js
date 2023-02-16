import { BASE_URL } from '../api/pokemon.js';
import { POKEMON_PER_PAGE } from '../pokedex.js';

export function getId (url) {
  return url.slice(url.search('pokemon') + 8, url.length - 1);
}

export function getUrl (offset) {
  return `${BASE_URL}?offset=${offset}&limit=${POKEMON_PER_PAGE}`;
}

export function formatPokemonInfo (pokemonData) {
  const { name, weight, height, types, abilities, sprites } = pokemonData;
  // eslint-disable-next-line camelcase
  const { front_default } = sprites.other['official-artwork'];

  const formattedTypes = types.map((type) => type.type.name).join(', ');
  const formattedAbilities = abilities.map((ability) => ability.ability.name).join(', ');

  return {
    name,
    // eslint-disable-next-line camelcase
    image: front_default,
    weight: `${weight / 10} kg`,
    height: `${height * 10} cm`,
    types: formattedTypes,
    abilities: formattedAbilities
  };
}
