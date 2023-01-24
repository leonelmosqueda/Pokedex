const URL_API = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_LIMIT_PER_PAGE = 10;

let currentPage;
let currentOffset;
let totalPages;
let pokemonAmount;

function getListUrl (offset) {
  return `${URL_API}?offset=${offset}&limit=${POKEMON_LIMIT_PER_PAGE}`;
}

function getData (url) {
  try {
    const response = fetch(url).then((r) => r.json());
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  }
}

function createList (count) {
  const $list = document.querySelector('#list');

  for (let i = 0; i < count; i += 1) {
    const newPokemon = document.createElement('a');
    newPokemon.classList.add(
      'list-group-item',
      'list-group-item-action',
      'p-2',
      'text-start',
      'text-capitalize',
      'fs-6'
    );
    newPokemon.dataset.list = '';

    $list.appendChild(newPokemon);
  }
}

function getId (url) {
  return url.slice(url.search('pokemon') + 7);
}

function configurePokemonList (pokemonList) {
  const $listItems = document.querySelectorAll('[data-list]');

  $listItems.forEach((item, index) => {
    const pokemon = item;
    pokemon.textContent = pokemonList[index].name;
    pokemon.dataset.id = getId(pokemonList[index].url);
  });
}

function setNumeration (pagination, firstNumber) {
  for (let i = 0; i < 5; i += 1) {
    const paginationList = pagination;
    paginationList[i + 1].textContent = firstNumber + i;
    paginationList[i + 1].dataset.page = firstNumber + i;
  }
}

function setPageOffset (pagination, initialOffset) {
  const paginationList = pagination;
  paginationList[0].dataset.offset = 0;
  paginationList[6].dataset.offset = totalPages * POKEMON_LIMIT_PER_PAGE;

  for (let i = 0; i < pagination.length - 2; i += 1) {
    paginationList[i + 1].dataset.offset = initialOffset + POKEMON_LIMIT_PER_PAGE * i;
  }
}

function configurePaginationData (pagination, offset, page) {
  if (page <= 3 || page === 'first') {
    setNumeration(pagination, 1);
    setPageOffset(pagination, 0);
    if (page === 'first' || page === 1) {
      pagination[0].classList.add('disabled');
      pagination[6].classList.remove('disabled');
    } else {
      pagination[0].classList.add('disabled');
      pagination[6].classList.remove('disabled');
    }
  } else if (page >= totalPages - 3 || page === 'last') {
    setNumeration(pagination, totalPages - 4);
    setPageOffset(pagination, totalPages * POKEMON_LIMIT_PER_PAGE - 40);
    if (page === 'last' || page === totalPages) {
      pagination[0].classList.remove('disabled');
      pagination[6].classList.add('disabled');
    } else {
      pagination[0].classList.remove('disabled');
      pagination[6].classList.add('disabled');
    }
  } else {
    setNumeration(pagination, page - 2);
    setPageOffset(pagination, offset - 20);
    pagination[0].classList.remove('disabled');
    pagination[6].classList.remove('disabled');
  }
}

function highlightCurrentPageButton (page) {
  let actualPage = page;
  if (page === 'first') actualPage = 1;
  if (page === 'last') actualPage = totalPages;

  const $currentPage = document.querySelector(`[data-page="${actualPage}"]`);

  $currentPage.classList.add('active');
}

function configurePagination (offset, page) {
  const $pagination = document.querySelectorAll('#pagination li a');

  configurePaginationData($pagination, offset, page);
  highlightCurrentPageButton(page);
}

async function setInitialParameters () {
  currentOffset = 0;
  currentPage = 1;
  const url = getListUrl(currentOffset);
  const data = await getData(url);
  pokemonAmount = data.count;
  totalPages = Math.round(pokemonAmount / POKEMON_LIMIT_PER_PAGE);
  createList(data.results.length);
  configurePokemonList(data.results);
  configurePagination(currentOffset, currentPage);
}

const $pages = document.querySelectorAll('[data-page]');

function hideSelectedPage () {
  $pages.forEach((page) => page.classList.remove('active'));
}

function clearList () {
  const $list = document.querySelectorAll('[data-list]');

  $list.forEach((pokemon) => pokemon.remove());
}

function hideSelectedPokemon () {
  const $pokemonList = document.querySelectorAll('[data-list]');

  $pokemonList.forEach((pokemon) => pokemon.classList.remove('active'));
}

async function handlePagination () {
  hideSelectedPage();
  currentOffset = this.dataset.offset;
  currentPage = this.dataset.page;
  const url = getListUrl(currentOffset);
  const data = await getData(url);
  clearList();
  configurePagination(currentOffset, currentPage);
  createList(data.results.length);
  configurePokemonList(data.results);
  hideSelectedPokemon();
}

$pages.forEach((page) => {
  page.addEventListener('click', handlePagination);
});

const $list = document.querySelector('#list');

function validateClick (element) {
  if (element.hasAttribute('data-list')) return true;
  return false;
}

function highlightSelectedPokemon (pokemon) {
  pokemon.classList.add('active');
}

function getPokemonUrl (id) {
  return `${URL_API + id}`;
}

function setImage (image) {
  const $image = document.querySelector('[data-result="image"]');

  $image.classList.remove('rotate');
  $image.src = image;
}

function setName (name) {
  const $name = document.querySelector('[data-result="name"]');

  $name.textContent = name;
}

function setStats (data) {
  const $height = document.querySelector('[data-result="height"]');
  const $weight = document.querySelector('[data-result="weight"]');
  const $type = document.querySelector('[data-result="type"]');
  const $abilities = document.querySelector('[data-result="abilities"]');

  $height.textContent = `${data.height * 10} cm`;
  $weight.textContent = `${data.weight / 10} kg`;

  if (data.types.length === 2) {
    $type.textContent = `${data.types[0].type.name} and ${data.types[1].type.name}`;
  } else {
    $type.textContent = `${data.types[0].type.name}`;
  }

  if (data.abilities.length === 3) {
    $abilities.textContent = `${data.abilities[0].ability.name}, ${data.abilities[1].ability.name} and ${data.abilities[2].ability.name}`;
  } else if (data.abilities.lenth === 2) {
    $abilities.textContent = `${data.abilities[0].ability.name} and ${data.abilities[1].ability.name}`;
  } else {
    $abilities.textContent = `${data.abilities[0].ability.name}`;
  }
}

function handlePokemonData (data) {
  setImage(data.sprites.other['official-artwork'].front_default);
  setName(data.name);
  setStats(data);
}

$list.addEventListener('click', async (e) => {
  const pokemon = e.target;

  if (!validateClick(pokemon)) return;

  hideSelectedPokemon();
  highlightSelectedPokemon(pokemon);
  const pokemonData = await getData(getPokemonUrl(pokemon.dataset.id));
  handlePokemonData(pokemonData);
});

setInitialParameters();
