function getPokemonListKey (offset, limit) {
  return `pokemon_list_${offset}_${limit}`;
}

export function fetchPokemonList (offset, limit) {
  const pokemonList = JSON.parse(localStorage.getItem(getPokemonListKey(offset, limit)));

  if (pokemonList === null) {
    throw new Error(`Pokemon list not found for offset=${offset} and limit=${limit}`);
  }

  return pokemonList;
}

export function savePokemonList (offset, limit, pokemonList) {
  if (offset === undefined || limit === undefined || typeof pokemonList !== 'object') {
    throw new Error('Offset, limit and pokemon list needed');
  }

  localStorage.setItem(getPokemonListKey(offset, limit), JSON.stringify(pokemonList));
}

function getPokemonInfoKey (id) {
  return `pokemon_info_${id}`;
}

export function fetchPokemonInfo (id) {
  if (id === undefined) {
    throw new Error('An ID is needed to fetch a pokemon');
  }

  const pokemonInfo = JSON.parse(localStorage.getItem(getPokemonInfoKey(id)));

  if (pokemonInfo === null) {
    throw new Error(`Pokemon info with id ${id} not found`);
  }

  return pokemonInfo;
}

export function savePokemon (id, pokemon) {
  if (id === undefined || typeof pokemon !== 'object') {
    throw new Error('An id and a pokemon are needed to save to localStorage');
  }

  localStorage.setItem(getPokemonInfoKey(id), JSON.stringify(pokemon));
}
