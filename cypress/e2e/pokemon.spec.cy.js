/// <reference types="Cypress" />

const FIRST_PAGE_URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';
const BULBASAUR_INFO_URL = 'https://pokeapi.co/api/v2/pokemon/1';

const bulbasaurInfo = {
  name: 'bulbasaur',
  types: ['grass', 'poison'],
  abilities: ['overgrow', 'chlorophyll'],
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  height: '70 cm',
  weight: '6.9 kg'
};

describe('Pokemon info', () => {
  beforeEach(() => {
    cy.intercept('GET', FIRST_PAGE_URL, { fixture: 'pokemon-list-page-1' }).as('getFirstPage');
    cy.intercept('GET', BULBASAUR_INFO_URL, { fixture: 'pokemon-info-bulbasaur' }).as('getBulbasaurInfo');
    cy.visit('/');
    cy.wait('@getFirstPage');
    cy.get('[data-id="1"]').should('have.text', bulbasaurInfo.name).click();
    cy.wait('@getBulbasaurInfo');
  });

  it('Display the correct pokemon image', () => {
    cy.get('[data-result="image"]').should('have.attr', 'src', bulbasaurInfo.image);
  });

  it('Display the correct pokemon name', () => {
    cy.get('[data-result="name"]').should('have.text', bulbasaurInfo.name);
  });

  it('Display the correct pokemon height', () => {
    cy.get('[data-result="height"]').should('have.text', bulbasaurInfo.height);
  });

  it('Display the correct pokemon weight', () => {
    cy.get('[data-result="weight"]').should('have.text', bulbasaurInfo.weight);
  });

  it('Display the correct pokemon types', () => {
    cy.get('[data-result="types"]').should('have.text', bulbasaurInfo.types.join(', '));
  });

  it('Display the correct pokemon abilities', () => {
    cy.get('[data-result="abilities"]').should('have.text', bulbasaurInfo.abilities.join(', '));
  });
});
