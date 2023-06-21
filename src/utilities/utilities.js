import { POKEMON_PER_PAGE } from '../pokedex.js';

export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export function getId (url) {
  return url.slice(url.search('pokemon') + 8, url.length - 1);
}

export function getUrl (offset) {
  return `${BASE_URL}?offset=${offset}&limit=${POKEMON_PER_PAGE}`;
}

export function formatPokemonInfo (pokemon) {
  const formattedTypes = pokemon.types.map((type) => type.type.name).join(', ');
  const formattedAbilities = pokemon.abilities.map((ability) => ability.ability.name).join(', ');

  return {
    name: pokemon.name,
    image: pokemon.urlImage,
    weight: `${pokemon.weight / 10} kg`,
    height: `${pokemon.height * 10} cm`,
    types: formattedTypes,
    abilities: formattedAbilities
  };
}
