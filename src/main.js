const URL_API = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_LIMIT_PER_PAGE = 10;

let currentPage;
let currentOffset;
let totalPages;
let pokemonAmount;

async function setInitialParameters() {
    currentOffset = 0;
    currentPage = 1;
    const url = getListUrl(currentOffset);
    const data = await getData(url);
    pokemonAmount = data.count;
    totalPages = Math.round(pokemonAmount / POKEMON_LIMIT_PER_PAGE);
    createList(data.results.length);
    configurePokemonList(data.results);
    configurePagination(currentOffset, currentPage)
}

function getListUrl (offset) {
    return `${URL_API}?offset=${offset}&limit=${POKEMON_LIMIT_PER_PAGE}`;
}

function getData (url) {
    try {
        const response = fetch(url).then(response => response.json());
        return response;
    } catch (error) {
        console.error(error);
    }
}

function createList (count) {
    const $list = document.querySelector('#list');

    for (let i = 0; i < count; i++) {
        const newPokemon = document.createElement('a');
        newPokemon.classList.add('list-group-item', 'list-group-item-action', 'p-2', 'text-start', 'text-capitalize', 'fs-6');
        newPokemon.dataset.list = '';

        $list.appendChild(newPokemon);
    }
}

function configurePokemonList (pokemonList) {
    const $listItems = document.querySelectorAll('[data-list]');

    $listItems.forEach((item, index) => {
        item.textContent = pokemonList[index].name;
        item.dataset.id = getId(pokemonList[index].url);
    })
}

function getId (url) {
    return url.slice(url.search('pokemon') + 7);
}

function configurePagination (currentOffset, currentPage) {
    const $pagination = document.querySelectorAll('#pagination li a');

    configurePaginationData($pagination, currentOffset, currentPage);
    highlightCurrentPageButton(currentPage);
}

function configurePaginationData (pagination, currentOffset, currentPage) {
    if (currentPage <= 3 || currentPage === 'first') {
        setNumeration(pagination, 1);
        setPageOffset(pagination, 0);
        currentPage === 'first' || currentPage === 1 ? pagination[0].classList.add('disabled') : pagination[6].classList.remove('disabled');
    } else if (currentPage >= totalPages - 3 || currentPage === 'last') {
        setNumeration(pagination, totalPages - 4);
        setPageOffset(pagination, totalPages * POKEMON_LIMIT_PER_PAGE - 40);
        currentPage === 'last' || currentPage === totalPages ? pagination[6].classList.add('disabled') : pagination[0].classList.remove('disabled');
    } else {
        setNumeration(pagination, currentPage - 2);
        setPageOffset(pagination, currentOffset - 20);
        pagination[0].classList.remove('disabled');
        pagination[6].classList.remove('disabled');
    }
}

function setNumeration (pagination, firstNumber) {
    for (let i = 0; i < 5; i++) {
        pagination[i + 1].textContent = firstNumber + i;
        pagination[i + 1].dataset.page = firstNumber + i; 
    }
};

function setPageOffset (pagination, initialOffset) {
    pagination[0].dataset.offset = 0;
    pagination[6].dataset.offset = totalPages * POKEMON_LIMIT_PER_PAGE;

    for (let i = 0; i < pagination.length - 2; i++) {
        pagination[i + 1].dataset.offset = initialOffset + POKEMON_LIMIT_PER_PAGE * i;
    }
}

function highlightCurrentPageButton (currentPage) {
    if (currentPage === 'first') currentPage = 1;
    if (currentPage === 'last') currentPage = totalPages;

    const $currentPage = document.querySelector(`[data-page="${currentPage}"]`);

    $currentPage.classList.add('active');
}

setInitialParameters();

const $pages = document.querySelectorAll('[data-page]');

$pages.forEach(page => {
    page.addEventListener('click', handlePagination)
});

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

function hideSelectedPage () {
    $pages.forEach(page => page.classList.remove('active'));
}

function clearList () {
    const $list = document.querySelectorAll('[data-list]');

    $list.forEach(pokemon => pokemon.remove());
}

function hideSelectedPokemon() {
    const $pokemonList = document.querySelectorAll('[data-list]');

    $pokemonList.forEach(pokemon => pokemon.classList.remove('active'));
}

const $list = document.querySelector('#list');

$list.addEventListener('click', async e => {
    const pokemon = e.target;

    if (!validateClick(pokemon)) return;

    hideSelectedPokemon();
    highlightSelectedPokemon(pokemon);
    const pokemonData = await getData(getPokemonUrl(pokemon.dataset.id));
    handlePokemonData(pokemonData);
});

function validateClick(element) {
    if (element.hasAttribute('data-list')) return true;
    return false;
}

function highlightSelectedPokemon(pokemon) {
    pokemon.classList.add('active');
}

function getPokemonUrl(id) {
    return `${URL_API + id}`;
}

function handlePokemonData(data) {
    setImage(data.sprites.other['official-artwork']['front_default']);
    setName(data.name);
    setStats(data)
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
    $type.textContent = data.types[1] ? `${data.types[0].type.name}, ${data.types[1].type.name}` : `${data.types[0].type.name}`;
    $abilities.textContent = data.abilities[2] ? `${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}, ${data.abilities[2].ability.name}` : data.abilities[1] ? `${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}` : `${data.abilities[0].ability.name}`;
}