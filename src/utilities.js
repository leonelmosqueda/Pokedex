import { POKEMON_POR_PAGINA } from './index.js';

export function obtenerId (url) {
  return url.slice(url.search('pokemon') + 8, url.length - 1);
}

function formatearHabilidadesPokemon (habilidades) {
  let habilidadesManipuladas;

  if (habilidades.length > 1) {
    (habilidades.length > 2)
      ? habilidadesManipuladas = `${habilidades[0].ability.name}, 
        ${habilidades[1].ability.name} and ${habilidades[2].ability.name}`
      : habilidadesManipuladas = `${habilidades[0].ability.name} and ${habilidades[1].ability.name}`;
  } else {
    habilidadesManipuladas = `${habilidades[0].ability.name}`;
  }

  return habilidadesManipuladas;
}

function formatearTiposPokemon (tipos) {
  return (tipos.length > 1)
    ? `${tipos[0].type.name} and ${tipos[1].type.name}`
    : `${tipos[0].type.name}`;
}

export function formatearInformacion (informacion) {
  const habilidades = formatearHabilidadesPokemon(informacion.abilities);
  const tipos = formatearTiposPokemon(informacion.types);

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
