/// <reference types='Cypress' />

const PAGE_SIZE = 10;
const PAGE_URL_FORMAT = 'https://pokeapi.co/api/v2/pokemon?offset=%d&limit=%d';

const FIRST_PAGE_URL = PAGE_URL_FORMAT.replace('%d', 0).replace('%d', PAGE_SIZE);
const SECOND_PAGE_URL = PAGE_URL_FORMAT.replace('%d', 10).replace('%d', PAGE_SIZE);
const LAST_PAGE_URL = PAGE_URL_FORMAT.replace('%d', 1270).replace('%d', PAGE_SIZE);

const BULBASAUR_INFO_URL = 'https://pokeapi.co/api/v2/pokemon/1';

function getId (url) {
  return url.slice(url.search('pokemon') + 8, url.length - 1);
}

function verifyPokemonList (pokemonList) {
  const names = pokemonList.results.map((pokemon) => pokemon.name);
  const ids = pokemonList.results.map((pokemon) => getId(pokemon.url));

  for (let i = 0; i < pokemonList.results.length; i += 1) {
    cy.get(`[data-id=${ids[i]}]`)
      .should('have.text', names[i]);
  }
}

describe('List tests', () => {
  context('First page', () => {
    beforeEach(() => {
      cy.intercept('GET', FIRST_PAGE_URL, { fixture: 'pokemon-list-page-1', delay: 3000 }).as('getFirstPage');
      cy.visit('/');
      cy.wait('@getFirstPage');
    });

    it('Should display the first 10 pokemon on initial load', () => {
      cy.intercept('GET', FIRST_PAGE_URL).as('getFirstPage');

      cy.get('[data-item]').should('have.length', PAGE_SIZE);
      cy.fixture('pokemon-list-page-1.json').then((pokemonListPage1) => verifyPokemonList(pokemonListPage1));
    });

    it('Activates item when clicked', () => {
      cy.intercept('GET', FIRST_PAGE_URL).as('getFirstPage');

      cy.get('[data-id=1]').as('firstListItem');
      cy.intercept('GET', BULBASAUR_INFO_URL, { fixture: 'pokemon-info-bulbasaur', delay: 5000 }).as('getInfoBulbasaur');
      cy.get('@firstListItem').click();
      cy.wait('@getInfoBulbasaur');

      cy.get('@firstListItem').should('have.class', 'active');
    });
  });

  context('Second page', () => {
    beforeEach(function () {
      cy.intercept('GET', FIRST_PAGE_URL, { fixture: 'pokemon-list-page-1', delay: 3000 }).as('getFirstPage');
      cy.intercept('GET', SECOND_PAGE_URL, { fixture: 'pokemon-list-page-2', delay: 5000 }).as('getSecondPage');
      cy.visit('/');
      cy.wait('@getFirstPage');
      cy.get('[data-test="next-page-button"]').click();
      cy.wait('@getSecondPage');
    });

    it('Should display the next 10 pokemon', () => {
      cy.get('[data-item]').should('have.length', PAGE_SIZE);
      cy.fixture('pokemon-list-page-2.json').then((pokemonListPage2) => verifyPokemonList(pokemonListPage2));
    });
  });

  context('Last page', () => {
    beforeEach(() => {
      cy.intercept('GET', FIRST_PAGE_URL, { fixture: 'pokemon-list-page-1', delay: 3000 }).as('getFirstPage');
      cy.visit('/');
      cy.wait('@getFirstPage');
      cy.intercept('GET', LAST_PAGE_URL, { fixture: 'pokemon-list-page-128', delay: 3000 }).as('getLastPage');
      cy.get('[data-test="last-page-button"]').click();
      cy.wait('@getLastPage');
    });

    it('Should display the last 9 pokemon', () => {
      cy.get('[data-item]').should('have.length', 9);
      cy.fixture('pokemon-list-page-128.json').then((pokemonListPage128) => verifyPokemonList(pokemonListPage128));
    });
  });
});
