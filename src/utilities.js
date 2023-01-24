import { POKEMON_POR_PAGINA } from './index.js';

export function obtenerId (url) {
  return url.slice(url.search('pokemon') + 8, url.length - 1);
}

export function tratarInformacion (informacion) {
  let habilidades;
  let tipos;

  if (informacion.abilities.length > 1) {
    if (informacion.abilities.length > 2) {
      habilidades = `${informacion.abilities[0].ability.name}, ${informacion.abilities[1].ability.name} and ${informacion.abilities[2].ability.name}`;
    } else {
      habilidades = `${informacion.abilities[0].ability.name} and ${informacion.abilities[1].ability.name}`;
    }
  } else {
    habilidades = `${informacion.abilities[0].ability.name}`;
  }

  if (informacion.types > 1) {
    tipos = `${informacion.types[0].type.name} and ${informacion.types[1].type.name}`;
  } else {
    tipos = `${informacion.types[0].type.name}`;
  }

  return {
    altura: `${informacion.height * 10} cm`,
    habilidades,
    imagen: informacion.sprites.other['official-artwork'].front_default,
    nombre: informacion.name,
    peso: `${informacion.weight / 10} kg`,
    tipos
  };
}

export function obtenerPaginaActual (url) {
  const offset = url.slice(url.search('offset=') + 7, url.search('&limit'));
  return (offset / POKEMON_POR_PAGINA) + 1;
}
