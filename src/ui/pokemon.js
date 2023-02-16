const pokeball = '../../img/pokeball.png';

function showPokemonImage (urlImage) {
  const $image = document.querySelector('[data-result="image"]');

  if (urlImage === null) {
    $image.setAttribute('src', pokeball);
    $image.classList.add('rotate');
  } else {
    $image.setAttribute('src', urlImage);
    $image.classList.remove('rotate');
  }
}

export function showPokemonInfo (pokemonInfo) {
  showPokemonImage(pokemonInfo.image);

  Object.entries(pokemonInfo).forEach(([key, value]) => {
    if (key !== 'image') {
      const $elementInfo = document.querySelector(`[data-result="${key}"]`);

      $elementInfo.textContent = value;
    }
  });
}
