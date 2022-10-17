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

setInitialParameters();