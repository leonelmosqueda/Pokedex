/// <reference types="Cypress" />

const POKEMON_LIMIT_PER_PAGE = 10;
const finalOffset = 1150;


describe('Pagina principal', () => {
  it('successfully loads', () => {
    cy.visit('/')
  });

  describe('initial setup', () => {
    it('load pokemon list', () => {
      cy.get('[data-list]').should('have.length', POKEMON_LIMIT_PER_PAGE);
    });
    it('load pagination', () => {
      cy.get('[data-page]').should('have.length', 7);
      cy.get('[data-page="first"]').should('have.class', 'disabled');
      cy.get('[data-page="1"]').should('have.class', 'active');
    });
  });

  describe('pagination', () => {
    it('turn pages', () => {
      cy.get('[data-page="2"]').should('have.data', 'offset', 10);
      cy.get('[data-page="2"]').click();
      cy.get('[data-page="2"]').should('have.class', 'active');
    });
    it('first page', () => {
      cy.get('[data-page="5"]').click();
      cy.get('[data-page="first"]').click();
      cy.get('[data-page="first"]').should('have.data', 'offset', 0);
      cy.get('[data-page="first"]').should('have.class', 'disabled');
    });
    it('last page', () => {
      cy.get('[data-page="last"]').should('have.data', 'offset', finalOffset);
      cy.get('[data-page="last"]').click();
      cy.get('[data-page="last"]').should('have.class', 'disabled');
      cy.get(`[data-page='${finalOffset / 10}']`).should('have.class', 'active');
    });
  });
  describe('Pokemon info', () => {
    it('show pokemon info', () => {
      const infoPokemon = {
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10246.png',
        name: 'palkia-origin',
        height: '630 cm',
        weight: '659 kg',
        type: 'water, dragon',
        abilities: 'pressure, telepathy'
      }

      cy.get('[data-id="/10246/"]').click();
      cy.get('[data-id="/10246/"]').should('have.class', 'active');

      cy.get('[data-result="image"]').should('have.attr', 'src', infoPokemon.image);
      cy.get('[data-result="name"]').should('have.text', infoPokemon.name);
      cy.get('[data-result="height"]').should('have.text', infoPokemon.height);
      cy.get('[data-result="weight"]').should('have.text', infoPokemon.weight);
      cy.get('[data-result="type"]').should('have.text', infoPokemon.type);
      cy.get('[data-result="abilities"]').should('have.text', infoPokemon.abilities);
    })
  })
})
