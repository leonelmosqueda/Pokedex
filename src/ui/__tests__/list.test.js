/**
 * @jest-environment jsdom
 */

import { showPokemonList } from '../list';
import fixturePokemonList from '../../../cypress/fixtures/pokemon-list-page-1.json';
import { getId } from '../../utilities/utilities';

const pokemonList = fixturePokemonList.results;


describe('showPokemonList', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="list">
      <a href="#" class="list-group-item list-group-item-action disabled p-3 pokefont text-warning bg-primary">Choose a Pokémon</a>
    </div>`;

    showPokemonList(pokemonList, () => {});
  });

  test('showPokemonList removes all child elements from the $list element except the first one', () => {

    const $list = document.querySelector('#list')
    
    showPokemonList([], () => {});
    
    expect($list.innerHTML).toContain('<a href="#" class="list-group-item list-group-item-action disabled p-3 pokefont text-warning bg-primary">Choose a Pokémon</a>');
  });

  test('showPokemonList adds one list item for each Pokémon in the pokemonList', () => {
    const $list = document.querySelector('#list');

    expect($list.children).toHaveLength(11);

    for (let i = 1; i < $list.children.length; i++) {
      expect($list.children[i].textContent).toBe(pokemonList[i - 1].name);
    }
  });

  test('showPokemonList configures elements correctly', () => {
    const $list = document.querySelector('#list');

    for(let i = 1; i <$list.children.length; i += 1) {
      expect($list.children[i].textContent).toBe(pokemonList[i - 1].name);
      expect($list.children[i].dataset.id).toBe(getId(pokemonList[i - 1].url));
    }
  });

  test('Clicking on a list item added by showPokemonList adds the active class to the clicked item', () => {
    const firstListItem = document.querySelectorAll('[data-item]')[0];
    firstListItem.click();

    expect(firstListItem.classList.contains('active')).toBe(true);
  });

  test('Clicking on a list item added by showPokemonList removes the active class from any other active item in the list', () => {
    const firstListItem = document.querySelectorAll('[data-item]')[0];
    const secondListItem = document.querySelectorAll('[data-item]')[1];

    firstListItem.click();

    expect(firstListItem.classList.contains('active')).toBe(true);

    secondListItem.click();

    expect(firstListItem.classList.contains('active')).toBe(false);
    expect(secondListItem.classList.contains('active')).toBe(true);
  });
});
