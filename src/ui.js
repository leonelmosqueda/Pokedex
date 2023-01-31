import { obtenerId } from './utilities.js';

function crearLista (contador) {
  const $lista = document.querySelector('#list');

  for (let i = 0; i < contador; i++) {
    const nuevoElemento = document.createElement('a');
    nuevoElemento.dataset.list = '';
    nuevoElemento.classList.add(
      'list-group-item',
      'list-group-item-action',
      'p-2',
      'text-start',
      'text-capitalize',
      'fs-6'
    );
    $lista.appendChild(nuevoElemento);
  }
}

function configurarLista (listado, callbackSeleccionarPokemon) {
  const $elementosDeLista = document.querySelectorAll('[data-list]');

  $elementosDeLista.forEach((elemento, indice) => {
    elemento.textContent = listado[indice].name;
    elemento.dataset.id = obtenerId(listado[indice].url);
    elemento.addEventListener('click', (e) => {
      const $pokemonActivo = document.querySelector('[data-list].active');

      if ($pokemonActivo) {
        $pokemonActivo.classList.remove('active');
      }
      elemento.classList.add('active');

      callbackSeleccionarPokemon(e.target.dataset.id);
    });
  });
}

export function mostrarListadoPokemon (listado, callbackSeleccionarPokemon) {
  crearLista(listado.length);
  configurarLista(listado, callbackSeleccionarPokemon);
}

const $paginacion = document.querySelectorAll('[data-page]');

export function mostrarPaginacion (paginaAnterior, paginaActual, paginaSiguiente, callbackActualizacionLista) {
  if (paginaAnterior === null) $paginacion[0].classList.add('disabled');
  else $paginacion[0].classList.remove('disabled');
  if (paginaSiguiente === null) $paginacion[2].classList.add('disabled');
  else $paginacion[2].classList.remove('disabled');

  $paginacion[0].dataset.page = paginaAnterior;
  $paginacion[2].dataset.page = paginaSiguiente;

  $paginacion[1].classList.add('active');
  $paginacion[1].textContent = paginaActual;

  $paginacion.forEach(($pagina) => {
    if ($pagina.classList.contains('active')) return;

    $pagina.onclick = manejarCambioPagina;

    function manejarCambioPagina () {
      const urlPagina = this.dataset.page;
      callbackActualizacionLista(urlPagina);
    }
  });
}

export function mostrarInformacionPokemon (informacionPokemon) {
  const $imagen = document.querySelector('[data-result="image"]');
  const $nombre = document.querySelector('[data-result="name"]');
  const $altura = document.querySelector('[data-result="height"]');
  const $peso = document.querySelector('[data-result="weight"]');
  const $tipo = document.querySelector('[data-result="type"]');
  const $habilidades = document.querySelector('[data-result="abilities"]');

  $imagen.classList.remove('rotate');
  $imagen.src = informacionPokemon.imagen;

  $nombre.textContent = informacionPokemon.nombre;

  $altura.textContent = informacionPokemon.altura;

  $peso.textContent = informacionPokemon.peso;

  $tipo.textContent = informacionPokemon.tipos;

  $habilidades.textContent = informacionPokemon.habilidades;
}

export function limpiarLista () {
  const $lista = document.querySelectorAll('[data-list]');

  $lista.forEach((elemento) => elemento.remove());
}
