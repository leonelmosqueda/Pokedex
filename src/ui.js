import { obtenerId } from './utilities.js';

const $paginacion = document.querySelectorAll('[data-page]');

function crearElementoLista () {
  return document.createElement('a');
}

function configurarElementoLista (elementoLista) {
  elementoLista.dataset.list = '';

  elementoLista.classList.add(
    'list-group-item',
    'list-group-item-action',
    'p-2',
    'text-start',
    'text-capitalize',
    'fs-6',
    'user-select-none'
  );

  return elementoLista;
}

function crearLista (contador) {
  const $lista = document.querySelector('#list');

  for (let i = 0; i < contador; i++) {
    $lista.appendChild(configurarElementoLista(crearElementoLista()));
  }
}

function establecerNombrePokemon (elemento, listado, indice) {
  elemento.textContent = listado[indice].name;
}

function establecerIdPokemon (elemento, url) {
  elemento.dataset.id = obtenerId(url);
}

function configurarLista (listado, callbackSeleccionPokemon) {
  const $elementosDeLista = document.querySelectorAll('[data-list]');

  $elementosDeLista.forEach((elemento, indice) => {
    establecerNombrePokemon(elemento, listado, indice);
    establecerIdPokemon(elemento, listado[indice].url);

    elemento.addEventListener('click', (e) => {
      const $pokemonActivo = document.querySelector('[data-list].active');

      if ($pokemonActivo) {
        $pokemonActivo.classList.remove('active');
      }
      elemento.classList.add('active');

      callbackSeleccionPokemon(e.target.dataset.id);
    });
  });
}

export function mostrarListadoPokemon (listado, callbackSeleccionPokemon) {
  crearLista(listado.length);
  configurarLista(listado, callbackSeleccionPokemon);
}

function manejarBotonesDeshabilitado (anterior, siguiente) {
  (anterior === null) ? $paginacion[0].classList.add('disabled') : $paginacion[0].classList.remove('disabled');
  (siguiente === null) ? $paginacion[2].classList.add('disabled') : $paginacion[2].classList.remove('disabled');
}

function establecerUrlBotones (anterior, siguiente) {
  $paginacion[0].href = anterior;
  $paginacion[2].href = siguiente;
}

function establecerPaginaActual (paginaActual) {
  $paginacion[1].textContent = paginaActual;
}

export function mostrarPaginacion (paginaAnterior, paginaActual, paginaSiguiente, callbackActualizacionLista) {
  manejarBotonesDeshabilitado(paginaAnterior, paginaSiguiente);
  establecerUrlBotones(paginaAnterior, paginaSiguiente);
  establecerPaginaActual(paginaActual);

  $paginacion.forEach(($pagina) => {
    if ($pagina.classList.contains('active')) return;

    $pagina.onclick = (event) => {
      event.preventDefault();

      const urlPagina = $pagina.href;
      callbackActualizacionLista(urlPagina);
    };
  });
}

function mostrarImagen (urlImagen) {
  const $imagen = document.querySelector('[data-result="image"]');

  $imagen.classList.remove('rotate');
  $imagen.src = urlImagen;
}

function mostrarNombre (nombre) {
  const $nombre = document.querySelector('[data-result="name"]');

  $nombre.textContent = nombre;
}

function mostrarEstadisticas (altura, peso) {
  const $altura = document.querySelector('[data-result="height"]');
  const $peso = document.querySelector('[data-result="weight"]');

  $altura.textContent = altura;

  $peso.textContent = peso;
}

function mostrarTipos (tipos) {
  const $tipo = document.querySelector('[data-result="type"]');

  $tipo.textContent = tipos;
}

function mostrarHabilidades (habilidades) {
  const $habilidades = document.querySelector('[data-result="abilities"]');

  $habilidades.textContent = habilidades;
}

export function mostrarInformacionPokemon (informacionPokemon) {
  mostrarImagen(informacionPokemon.imagen);
  mostrarNombre(informacionPokemon.nombre);
  mostrarEstadisticas(informacionPokemon.altura, informacionPokemon.peso);
  mostrarTipos(informacionPokemon.tipos);
  mostrarHabilidades(informacionPokemon.habilidades);
}

export function limpiarLista () {
  const $lista = document.querySelectorAll('[data-list]');

  $lista.forEach((elemento) => elemento.remove());
}
