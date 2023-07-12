import { getId } from '../utilities/utilities.js';

const $list = document.querySelector('#list');

function clearList () {
  const $listElements = document.querySelectorAll('[data-item]');

  $listElements.forEach(element => element.remove());
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

function updatePokemonName (element, newName) {
  element.textContent = newName;
}

function setPokemonId (item, id) {
  item.dataset.id = id;
}

function setActiveItem (item) {
  const $activeItem = document.querySelector('[data-item].active');

  if ($activeItem) {
    $activeItem.classList.remove('active');
  }
  item.classList.add('active');
}

function configureList (pokemonList) {
  const $listItems = document.querySelectorAll('#list [data-item]');

  $listItems.forEach((item, index) => {
    updatePokemonName(item, pokemonList[index].name);
    setPokemonId(item, getId(pokemonList[index].url));
  });
}

// debouncing

function handleClickOnPokemon (event, callback) {
  const { target } = event;
  setActiveItem(target);
  const id = Number(target.dataset.id);
  clearTimeout(handleClickOnPokemon.timerId); // cancela temporizador anterior
  handleClickOnPokemon.timerId = setTimeout(() => {
    callback(id);
  }, 100); // retrasa la llamada al callback
}

handleClickOnPokemon.timerId = null;

function configurePokemonList (callback) {
  $list.removeEventListener('click', handleClick);
  $list.addEventListener('click', handleClick);

  function handleClick (event) {
    handleClickOnPokemon(event, callback);
  }
}

export function showPokemonList (pokemonList, updateCallback) {
  clearList();
  createList(pokemonList.length);
  configureList(pokemonList);
  configurePokemonList(updateCallback);
}
