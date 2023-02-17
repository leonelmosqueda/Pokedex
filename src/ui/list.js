import { getId } from '../utilities/utilities.js';

const $list = document.querySelector('#list');

function clearList () {
  const $listElements = $list.querySelectorAll('[data-item]');

  for (const $element of $listElements) {
    $element.remove();
  }
}

function createListItem () {
  return document.createElement('a');
}

function configureListItem (listItem) {
  listItem.dataset.item = '';

  listItem.setAttribute('href', '#');

  listItem.classList.add(
    'list-group-item',
    'list-group-item-action',
    'fs-6',
    'p-2',
    'text-start',
    'text-capitalize',
    'user-select-none'
  );

  return listItem;
}

function createList (count) {
  for (let i = 0; i < count; i += 1) {
    $list.appendChild(configureListItem(createListItem()));
  }
}

function setPokemonName (item, name) {
  item.textContent = name;
}

function setPokemonId (item, id) {
  item.dataset.id = id;
}

function handleActiveItem (item) {
  const $activeItem = document.querySelector('[data-item].active');

  if ($activeItem) {
    $activeItem.classList.remove('active');
  }
  item.classList.add('active');
}

function configureList (pokemonList) {
  const $listItems = document.querySelectorAll('#list [data-item]');

  $listItems.forEach((item, index) => {
    setPokemonName(item, pokemonList[index].name);
    setPokemonId(item, getId(pokemonList[index].url));
  });
}

// debouncing

function handlePokemonClick (event, callback) {
  const { target } = event;
  handleActiveItem(target);
  const id = target.dataset.id;
  clearTimeout(handlePokemonClick.timerId); // cancela temporizador anterior
  handlePokemonClick.timerId = setTimeout(() => {
    callback(id);
  }, 100); // retrasa la llamada al callback
}

handlePokemonClick.timerId = null;

function configurePokemonList (callback) {
  $list.removeEventListener('click', handleClick);
  $list.addEventListener('click', handleClick);

  function handleClick (event) {
    handlePokemonClick(event, callback);
  }
}

export function showPokemonList (pokemonList, callbackUpdatePokemon) {
  clearList();
  createList(pokemonList.length);
  configureList(pokemonList);
  configurePokemonList(callbackUpdatePokemon);
}
