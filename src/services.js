const URL_API = 'https://pokeapi.co/api/v2/pokemon';

export async function obtenerInformacionApi (endpoint, url) {
  try {
    if (url === undefined) {
      const respuesta = await fetch(`${URL_API + endpoint}`).then((resp) => resp.json());
      return {
        cantidadPokemon: respuesta.count,
        paginaSiguiente: respuesta.next,
        paginaAnterior: respuesta.previous,
        listadoPokemon: respuesta.results
      };
    } else {
      const respuesta = await fetch(url).then((resp) => resp.json());
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
    const respuesta = fetch(`${URL_API}/${id}`).then((resp) => resp.json());
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}
