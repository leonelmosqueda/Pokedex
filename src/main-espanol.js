const URL_API = "https://pokeapi.co/api/v2/pokemon";
const LIMITE_POKEMON_POR_PAGINA = 10;

let paginaActual;
let offsetActual;
let totalPaginas;
let numeroDePokemones;

async function establecerParametrosIniciales() {
  offsetActual = 0;
  paginaActual = 1;
  const url = obtenerUrlDeLista(offsetActual);
  const data = await obtenerDatos(url);
  numeroDePokemones = data.count;
  totalPaginas = Math.round(numeroDePokemones / LIMITE_POKEMON_POR_PAGINA);
  crearLista(data.results.length);
  configurarListaDePokemon(data.results);
  configurarPaginacion(offsetActual, paginaActual);
}

function obtenerUrlDeLista(offset) {
  return `${URL_API}?offset=${offset}&limit=${LIMITE_POKEMON_POR_PAGINA}`;
}

function obtenerDatos(url) {
  try {
    const respuesta = fetch(url).then((respuesta) => respuesta.json());
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}

function crearLista(contador) {
  const $lista = document.querySelector("#list-group");

  for (let i = 0; i < contador; i++) {
    const nuevoPokemon = document.createElement("a");
    nuevoPokemon.classList.add(
      "list-group-item",
      "list-group-item-action",
      "p-2",
      "text-start",
      "text-capitalize",
      "fs-6"
    );
    nuevoPokemon.dataset.list = "";

    $lista.appendChild(nuevoPokemon);
  }
}

function configurarListaDePokemon(listaDePokemones) {
  const $elementosDeLista = document.querySelectorAll("[data-list]");

  $elementosDeLista.forEach((elemento, index) => {
    elemento.textContent = listaDePokemones[index].name;
    elemento.dataset.id = obtenerId(listaDePokemones[index].url);
  });
}

function obtenerId(url) {
  return url.slice(url.search("pokemon") + 7);
}

function configurarPaginacion(offsetActual, paginaActual) {
  const $paginacion = document.querySelectorAll("#pagination li a");

  configurarDatosDePaginacion($paginacion, paginaActual, offsetActual);
  destacarBotonPaginaActual(paginaActual);
}

function configurarDatosDePaginacion(paginacion, paginaActual, offsetActual) {
  if (paginaActual <= 3 || paginaActual === "first") {
    establecerNumeracion(paginacion, 1);
    establecerOffsetDePaginas(paginacion, 0);
    paginaActual === "first" || paginaActual === 1
      ? paginacion[0].classList.add("disabled")
      : paginacion[0].classList.remove("disabled");
  } else if (paginaActual >= totalPaginas - 3 || paginaActual === "last") {
    establecerNumeracion(paginacion, totalPaginas - 4);
    establecerOffsetDePaginas(paginacion, totalPaginas * LIMITE_POKEMON_POR_PAGINA - 40);
    paginaActual === "last" || paginaActual === totalPaginas
      ? paginacion[6].classList.add("disabled")
      : paginacion[6].classList.remove("disabled");
  } else {
    establecerNumeracion(paginacion, paginaActual - 2);
    establecerOffsetDePaginas(paginacion, offsetActual - 20);
    paginacion[0].classList.remove("disabled");
    paginacion[6].classList.remove("disabled");
  }
}

function establecerNumeracion(paginacion, paginaInicial) {
  for (let i = 0; i < 5; i++) {
    paginacion[i + 1].textContent = paginaInicial + i;
    paginacion[i + 1].dataset.page = paginaInicial + i;
  }
}

function establecerOffsetDePaginas(paginacion, offsetInicial) {
  paginacion[0].dataset.offset = 0;
  paginacion[6].dataset.offset = totalPaginas * LIMITE_POKEMON_POR_PAGINA;

  for (let i = 0; i < paginacion.length - 2; i++) {
    paginacion[i + 1].dataset.offset = offsetInicial + LIMITE_POKEMON_POR_PAGINA * i;
  }
}

function destacarBotonPaginaActual(paginaActual) {
  if (paginaActual === "first") paginaActual = 1;
  if (paginaActual === "last") paginaActual = totalPaginas;

  const $paginaActual = document.querySelector(`[data-page='${paginaActual}']`);

  $paginaActual.classList.add("active");
}

establecerParametrosIniciales();

const $paginacion = document.querySelectorAll("#pagination li a");

$paginacion.forEach((pagina) =>
  pagina.addEventListener("click", manejarPaginacion)
);

async function manejarPaginacion() {
  ocultarBotonPaginaActual();
  offsetActual = this.dataset.offset;
  paginaActual = this.dataset.page;
  const url = obtenerUrlDeLista(offsetActual);
  const data = await obtenerDatos(url);
  limpiarLista();
  configurarPaginacion(offsetActual, paginaActual);
  crearLista(data.results.length);
  configurarListaDePokemon(data.results);
  ocultarPokemonResaltado();
}

function ocultarBotonPaginaActual() {
  const $paginas = document.querySelectorAll("[data-page]");

  $paginas.forEach((pagina) => pagina.classList.remove("active"));
}

function limpiarLista() {
  const $lista = document.querySelectorAll("[data-list]");

  $lista.forEach((pokemon) => pokemon.remove());
}

const $lista = document.querySelector("#list-group");

$lista.addEventListener("click", async (e) => {
  const pokemon = e.target;

  if (!validarClick(pokemon)) return;

  ocultarPokemonResaltado();
  resaltarPokemon(pokemon);
  const dataDePokemon = await obtenerDatos(
    obtenerUrlDePokemon(pokemon.dataset.id)
  );
  manejarDataDePokemon(dataDePokemon);
});

function validarClick(elemento) {
  if (elemento.hasAttribute("data-list")) return true;
  return false;
}

function ocultarPokemonResaltado() {
  const $listaDePokemones = document.querySelectorAll("[data-list]");

  $listaDePokemones.forEach((pokemon) => pokemon.classList.remove("active"));
}

function resaltarPokemon(pokemon) {
  pokemon.classList.add("active");
}

function obtenerUrlDePokemon(id) {
  return `${URL_API + id}`;
}

function manejarDataDePokemon(data) {
  establecerImagen(data.sprites.other["official-artwork"]["front_default"]);
  establecerNombre(data.name);
  establecerEstadisticas(data);
}

function establecerImagen(imagen) {
  const $image = document.querySelector('[data-result="image"]');

  $image.classList.remove("rotate");
  $image.src = imagen;
}

function establecerNombre(nombre) {
  const $name = document.querySelector('[data-result="name"]');

  $name.textContent = nombre;
}

function establecerEstadisticas(data) {
  const $height = document.querySelector('[data-result="height"]');
  const $weight = document.querySelector('[data-result="weight"]');
  const $type = document.querySelector('[data-result="type"]');
  const $abilities = document.querySelector('[data-result="abilities"]');

  $height.textContent = `${data.height * 10} cm`;
  $weight.textContent = `${data.weight / 10} kg`;
  $type.textContent = data.types[1]
    ? `${data.types[0].type.name}, ${data.types[1].type.name}`
    : `${data.types[0].type.name}`;
  $abilities.textContent = data.abilities[2]
    ? `${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}, ${data.abilities[2].ability.name}`
    : data.abilities[1]
    ? `${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}`
    : `${data.abilities[0].ability.name}`;
}
