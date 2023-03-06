/// <reference types='Cypress' />

const PAGE_SIZE = 10;
const PAGE_URL_FORMAT = 'https://pokeapi.co/api/v2/pokemon?offset=%d&limit=%d';

const FIRST_PAGE_URL = PAGE_URL_FORMAT.replace('%d', 0).replace('%d', PAGE_SIZE);
const SECOND_PAGE_URL = PAGE_URL_FORMAT.replace('%d', 10).replace('%d', PAGE_SIZE);
const LAST_PAGE_URL = PAGE_URL_FORMAT.replace('%d', 1270).replace('%d', PAGE_SIZE);

function verifyActivePageButton (pageNumber) {
  cy.get(`[data-test="page-${pageNumber}"]`).as(`page-${pageNumber}`);
  cy.get(`@page-${pageNumber}`).should('have.class', 'active');
}

function verifyPageButtonState (button, state) {
  const buttonSelector = `[data-test="${button}"]`;

  cy.get(buttonSelector).should(`${state}.class`, 'disabled');
}

function verifyPageButtons (initialCount, expectedButtons) {
  for (let i = 0; i < expectedButtons.length; i += 1) {
    cy.get(`[data-test="page-${initialCount + i}"]`).should('have.text', `${expectedButtons[i]}`);
  }
}

describe('Pagination tests', () => {
  context('First page', () => {
    beforeEach(() => {
      cy.intercept('GET', FIRST_PAGE_URL, { fixture: 'pokemon-list-page-1' }).as('getFirstPage');
      cy.visit('/');
      cy.wait('@getFirstPage');
    });

    it('Verifies that the current page button is active', () => {
      verifyActivePageButton(1);
    });

    it('First and previous button should be disabled on first page', () => {
      verifyPageButtonState('first-page-button', 'have');
      verifyPageButtonState('previous-page-button', 'have');
    });

    it('Next and last button should be enabled on first page', () => {
      verifyPageButtonState('next-page-button', 'not.have');
      verifyPageButtonState('last-page-button', 'not.have');
    });

    it('Displays the correct pagination buttons', () => {
      verifyPageButtons(1, [1, 2, 3, 4, 5]);
    });
  });

  context('Second page', () => {
    beforeEach(() => {
      cy.intercept('GET', FIRST_PAGE_URL, { fixture: 'pokemon-list-page-1' }).as('getFirstPage');
      cy.intercept('GET', SECOND_PAGE_URL, { fixture: 'pokemon-list-page-2' }).as('getSecondPage');
      cy.visit('/');
      cy.wait('@getFirstPage');
      cy.get('#paginator > :nth-child(8)').as('nextPageButton');
      cy.get('@nextPageButton').click();
      cy.wait('@getSecondPage');
    });

    it('Verifies that the current page button is active', () => {
      verifyActivePageButton(2);
    });

    it('First and previous button should be enabled on second page', () => {
      verifyPageButtonState('first-page-button', 'not.have');
      verifyPageButtonState('previous-page-button', 'not.have');
    });

    it('Next and last button should be enabled on second page', () => {
      verifyPageButtonState('next-page-button', 'not.have');
      verifyPageButtonState('last-page-button', 'not.have');
    });

    it('Displays the correct pagination buttons', () => {
      verifyPageButtons(1, [1, 2, 3, 4, 5]);
    });
  });

  context('Last page', () => {
    beforeEach(() => {
      cy.intercept('GET', FIRST_PAGE_URL, { fixture: 'pokemon-list-page-1' }).as('getFirstPage');
      cy.intercept('GET', LAST_PAGE_URL, { fixture: 'pokemon-list-page-128' }).as('getLastPage');
      cy.visit('/');
      cy.wait('@getFirstPage');
      cy.get('#paginator > :nth-child(9)').as('lastPageButton');
      cy.get('@lastPageButton').click();
      cy.wait('@getLastPage');
    });

    it('Verifies that the current page button is active', () => {
      verifyActivePageButton(128);
    });

    it('First and previous button should be enabled on second page', () => {
      verifyPageButtonState('first-page-button', 'not.have');
      verifyPageButtonState('previous-page-button', 'not.have');
    });

    it('Next and last button should be disabled on second page', () => {
      verifyPageButtonState('next-page-button', 'have');
      verifyPageButtonState('last-page-button', 'have');
    });

    it('Displays the correct pagination buttons', () => {
      verifyPageButtons(124, [124, 125, 126, 127, 128]);
    });
  });
});
