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