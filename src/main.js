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

setInitialParameters();