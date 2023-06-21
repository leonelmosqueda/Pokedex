/**
 * @jest-environment jsdom
 */

import { showPaginator } from '../paginator';

function verifyButton (selector, textContent, hasPageItemClass, isDisabled) {
  const $button = document.querySelector(selector);

  expect($button.textContent).toEqual(textContent);
  expect($button.classList.contains('page-item')).toBe(hasPageItemClass);
  expect($button.classList.contains('disabled')).toBe(isDisabled);
}

describe('showPaginator', () => {
  const testHtml = '<ul id="paginator"></ul>';

  beforeEach(() => {
    document.body.innerHTML = testHtml;
  });

  test('showPaginator clears the content of the paginator', () => {
    const $paginator = document.querySelector('#paginator');
    $paginator.innerHTML = 'test content';

    showPaginator(1, 0, () => {});

    expect($paginator.innerHTML).toBe('');
  });

  test('showPaginator returns early when numPages is less than or equal to 1', () => {
    const $paginator = document.querySelector('#paginator');
    $paginator.innerHTML = 'test content';

    showPaginator(1, -2, () => {});

    expect($paginator.innerHTML).toBe('');
  });

  test('showPaginator creates all buttons correctly', () => {
    const currentPage = 1;
    const numPages = 10;
    const callbackUpdateList = jest.fn();

    showPaginator(currentPage, numPages, callbackUpdateList);

    verifyButton('[data-test="first-page-button"]', '«', true, true);
    verifyButton('[data-test="previous-page-button"]', '‹', true, true);

    for (let i = currentPage; i < currentPage + 5; i += 1) {
      verifyButton(`[data-test="page-${i}"]`, `${i}`, true, false);
      if (i === currentPage) {
        const $pageButton = document.querySelector(`[data-test="page-${i}"]`);
        expect($pageButton.classList.contains('active')).toBe(true);
      };
    };

    verifyButton('[data-test="next-page-button"]', '›', true, false);
    verifyButton('[data-test="last-page-button"]', '»', true, false);
  });

  test('showPaginator calls callbackUpdateList with correct page number when a button is clicked', () => {
    const currentPage = 5;
    const numPages = 20;
    const callbackUpdateList = jest.fn();

    showPaginator(currentPage, numPages, callbackUpdateList);

    const $firstPageButton = document.querySelector('[data-test="first-page-button"]');
    $firstPageButton.click();
    expect(callbackUpdateList).toBeCalled();

    callbackUpdateList.mockClear();
  });
});

// Verificar que la función no produce errores cuando se llama con diferentes combinaciones de parámetros válidos.

// Verificar que el contenido del elemento #paginator se actualiza correctamente en función de los parámetros currentPage y numPages.

// Verificar que la función maneja correctamente casos en los que numPages es menor o igual a 1.

// Verificar que las funciones createFirstAndPrevButtons, createPageButtons y createLastAndNextButtons son llamadas con los parámetros correctos.

// Verificar que el evento click se agrega y se elimina correctamente del elemento #paginator.

// Verificar que cuando se hace clic en un elemento con la clase .page-link, la función callbackUpdateList es llamada con el número de página correcto.
