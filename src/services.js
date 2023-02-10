const URL_API = 'https://pokeapi.co/api/v2/pokemon';

export async function obtenerInformacionApi (endpoint, url) {
  try {
    if (!url) {
      const respuesta = await fetch(`${URL_API + endpoint}`).then((r) => r.json());
      return {
        cantidadPokemon: respuesta.count,
        paginaSiguiente: respuesta.next,
        paginaAnterior: respuesta.previous,
        listadoPokemon: respuesta.results
      };
    } else {
      const respuesta = await fetch(url).then((r) => r.json());
      return {
        cantidadPokemon: respuesta.count,
        paginaSiguiente: respuesta.next,
        paginaAnterior: respuesta.previous,
        listadoPokemon: respuesta.results
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function obtenerInformacionPokemon (id) {
  try {
    const respuesta = await fetch(`${URL_API}/${id}`).then((r) => r.json());
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}
