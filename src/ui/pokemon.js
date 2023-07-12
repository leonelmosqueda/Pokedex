const pokeball = '../../img/pokeball.png';

function displayPokemonImage (urlImage) {
  const $image = document.querySelector('[data-result="image"]');

  $image.setAttribute('src', urlImage === null ? pokeball : urlImage);
  $image.classList.toggle('rotate', urlImage === null);
}

export function showPokemonInfo (pokemonInfo) {
  displayPokemonImage(pokemonInfo.image);

  for (const [key, value] of Object.entries(pokemonInfo)) {
    if (key !== 'image') {
      const $elementInfo = document.querySelector(`[data-result="${key}"]`);
      $elementInfo.textContent = value;
    }
  }
}
