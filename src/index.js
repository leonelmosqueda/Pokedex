import { obtenerInformacionApi, obtenerInformacionPokemon } from './services.js';
import { limpiarLista, mostrarInformacionPokemon, mostrarListadoPokemon, mostrarPaginacion } from './ui.js';
import { obtenerPaginaActual, tratarInformacion } from './utilities.js';

export const POKEMON_POR_PAGINA = 10;

async function actualizarListado (url) {
  const data = await obtenerInformacionApi(undefined, url);
  limpiarLista();
  mostrarListadoPokemon(await obtenerInformacionApi(undefined, url).listadoPokemon, actualizarPokemon);
  mostrarPaginacion(data.paginaAnterior, obtenerPaginaActual(url), data.paginaSiguiente, actualizarListado);
}

async function actualizarPokemon (id) {
  mostrarInformacionPokemon(tratarInformacion(await obtenerInformacionPokemon(id)));
}

async function inicializar () {
  const paginaInicial = 1;
  const data = await obtenerInformacionApi(`?offset=0&limit=${POKEMON_POR_PAGINA}`, undefined);
  mostrarListadoPokemon(data.listadoPokemon, actualizarPokemon);
  mostrarPaginacion(data.paginaAnterior, paginaInicial, data.paginaSiguiente, actualizarListado);
}

inicializar();
