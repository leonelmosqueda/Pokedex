import { obtenerInformacionApi, obtenerInformacionPokemon } from './services.js';
import { limpiarLista, mostrarInformacionPokemon, mostrarListadoPokemon, mostrarPaginacion } from './ui.js';
import { obtenerPaginaActual, formatearInformacion } from './utilities.js';

export const POKEMON_POR_PAGINA = 10;

async function actualizarListado (url) {
  const dataApi = await obtenerInformacionApi('', url);
  limpiarLista();
  mostrarListadoPokemon(dataApi.listadoPokemon, actualizarPokemon);
  mostrarPaginacion(dataApi.paginaAnterior, obtenerPaginaActual(url), dataApi.paginaSiguiente, actualizarListado);
}

async function actualizarPokemon (id) {
  mostrarInformacionPokemon(formatearInformacion(await obtenerInformacionPokemon(id)));
}

async function inicializar () {
  const paginaInicial = 1;
  const dataApi = await obtenerInformacionApi(`?offset=0&limit=${POKEMON_POR_PAGINA}`, '');
  mostrarListadoPokemon(dataApi.listadoPokemon, actualizarPokemon);
  mostrarPaginacion(dataApi.paginaAnterior, paginaInicial, dataApi.paginaSiguiente, actualizarListado);
}

inicializar();
