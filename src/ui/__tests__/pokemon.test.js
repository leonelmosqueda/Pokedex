/**
 * @jest-environment jsdom
 */

import { showPokemonInfo } from '../pokemon';
import fixturePokemonInfo from '../../../cypress/fixtures/pokemon-info-bulbasaur.json'
import { formatPokemonInfo } from '../../utilities/utilities';

const testHtml = `
  <div class="card text-white border" style="background-color: var(--bs-red)">
    <img src="./img/pokeball.png" class="card-img-top img-fluid mx-auto rotate" style="width: 200px" alt="No photo" data-result="image">
    <p id="text-loading" class="ocult">Loading...</p>
    <div class="card-body">
      <h5 class="card-title">Name: <span data-result="name" class="text-capitalize"></span></h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-start">Height: <span data-result="height" class="italic"></span></li>
      <li class="list-group-item text-start">Weight: <span data-result="weight" class="italic"></span></li>
      <li class="list-group-item text-start">Type: <span data-result="types" class="italic text-capitalize"></span></li>
      <li class="list-group-item text-start">Abilities: <span data-result="abilities" class="italic text-capitalize"></span></li>
    </ul>
  </div>`;

  const pokemonInfo = formatPokemonInfo(fixturePokemonInfo);

describe('showPokemonInfo', () => {
  beforeEach(() => {
    document.body.innerHTML = testHtml;

    showPokemonInfo(pokemonInfo)
  });

  test('Pokemon image is displayed correctly in the DOM', () => {
    const $image = document.querySelector('[data-result="image"]');

    expect($image.src).toBe(pokemonInfo.image);
  });

  test('DOM elements are updated correctly with pokemonInfo', () => {
    Object.entries(pokemonInfo).forEach(([key, value]) => {
      if (key !== 'image') {
        const $elementInfo = document.querySelector(`[data-result="${key}"]`);
        expect($elementInfo.textContent).toBe(value);
      }
    });
  });

  test('showPokemonInfo handles case where the image field is missing from the pokemonInfo object', () => {
    const pokemonInfo = {
      name: 'Pikachu',
      weight: '7,9 kg',
      height: '21,4 cm',
      types: 'Electric',
      abilities: 'Lightning'
    };

    showPokemonInfo(pokemonInfo);

    const $imageElement = document.querySelector('[data-result="image"]');
    expect($imageElement.src).toBe(new URL('../../img/pokeball.png', document.baseURI).href);
  });
});