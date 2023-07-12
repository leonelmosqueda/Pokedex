function generatePokemonListKey (offset, limit) {
  return `pokemon_list_${offset}_${limit}`;
}

/**
 * Fetches a list of Pokémon from localStorage based on the given offset and limit.
 *
 * @typedef { import('../entities/pokemonList').PokemonList } PokemonList
 *
 * @param {Number} offset - The starting index of the Pokémon list.
 * @param {Number} limit - The maximum number of Pokémon to retrieve.
 * @return {PokemonList} - An instance of PokemonList containing the Pokémon list.
 */
export function fetchPokemonList (offset, limit) {
  const pokemonListKey = generatePokemonListKey(offset, limit);
  const pokemonList = JSON.parse(localStorage.getItem(pokemonListKey));

  if (pokemonList === null) {
    throw new Error(`Pokemon list not found for offset=${offset} and limit=${limit}`);
  }

  return pokemonList;
}

/**
 * Saves a list of Pokemon to the local storage.
 *
 * @param {Number} offset - The offset for the list.
 * @param {Number} limit - The maximum number of Pokemon to save.
 * @param {Object} pokemonList - The list of Pokemon to save.
 * @throws {Error} Invalid arguments: offset and limit must be numbers, and pokemonList must be an object.
 */
export function savePokemonListToLocalStorage (offset, limit, pokemonList) {
  if (typeof offset !== 'number' || typeof limit !== 'number' || typeof pokemonList !== 'object') {
    throw new Error('Invalid arguments: offset and limit must be numbers, and pokemonList must be an object');
  }

  const key = generatePokemonListKey(offset, limit);
  localStorage.setItem(key, JSON.stringify(pokemonList));
}

function getPokemonInfoKey (id) {
  return `pokemon_info_${id}`;
}

/**
 * Fetches the information of a pokemon based on its ID.
 *
 * @typedef { import('../entities/pokemon').Pokemon } Pokemon
 *
 * @param {Number} id - The ID of the pokemon to fetch.
 * @throws {Error} Throws an error if the ID is undefined or if the pokemon info is not found.
 * @return {Pokemon} The pokemon information.
 */
export function fetchPokemonInfo (id) {
  if (id === undefined) {
    throw new Error('An ID is needed to fetch a pokemon');
  }

  const pokemonInfoKey = getPokemonInfoKey(id);
  const pokemonInfo = JSON.parse(localStorage.getItem(pokemonInfoKey));

  if (pokemonInfo === null) {
    throw new Error(`Pokemon info with id ${id} not found`);
  }

  return pokemonInfo;
}

/**
 * Saves a Pokemon to the local storage.
 *
 * @param {Number} id - The ID of the Pokemon.
 * @param {Object} pokemon - The Pokemon object to be saved.
 * @throws {Error} An id and a pokemon are needed to save to localStorage.
 */
export function savePokemonToLocalStorage (id, pokemon) {
  if (typeof id !== 'number' || typeof pokemon !== 'object') {
    throw new Error('An id and a pokemon are needed to save to localStorage');
  }

  const pokemonInfoKey = getPokemonInfoKey(id);
  const pokemonInfoJson = JSON.stringify(pokemon);

  localStorage.setItem(pokemonInfoKey, pokemonInfoJson);
}
