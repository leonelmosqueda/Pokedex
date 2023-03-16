let paginatorEventListener = null;

function createButton (page, text, test) {
  const $item = document.createElement('li');
  $item.classList.add('page-item');
  $item.dataset.test = test || `page-${text}`;

  const $link = document.createElement('a');
  $link.classList.add('page-link');
  $link.dataset.page = page;
  $link.textContent = text;

  $item.appendChild($link);
  return $item;
}

function disableFirstAndPrevButtonsIfNeeded (firstButton, prevButton, currentPage) {
  if (currentPage === 1) {
    firstButton.classList.add('disabled');
    prevButton.classList.add('disabled');
  } else {
    firstButton.classList.remove('disabled');
    prevButton.classList.remove('disabled');
  }
}

function createFirstAndPrevButtons ($paginator, currentPage) {
  const $firstButton = createButton(1, '«', 'first-page-button');
  const $prevButton = createButton(currentPage - 1, '‹', 'previous-page-button');

  disableFirstAndPrevButtonsIfNeeded($firstButton, $prevButton, currentPage);

  renderPageButton($paginator, $firstButton);
  renderPageButton($paginator, $prevButton);
}

function createPageButtons ($paginator, currentPage, numPages) {
  const $pageButtons = [];
  let startPage, endPage;

  if (numPages <= 5 || currentPage < 4) {
    startPage = 1;
    endPage = Math.min(numPages, 5);
  } else if (currentPage > numPages - 3) {
    startPage = numPages - 4;
    endPage = numPages;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  for (let i = startPage; i <= endPage; i += 1) {
    const $pageButton = createButton(i, i.toString());
    $pageButtons.push($pageButton);

    if (i === currentPage) {
      $pageButton.classList.add('active');
    } else {
      $pageButton.classList.remove('active');
    }

    renderPageButton($paginator, $pageButton);
  }
}

function disableLastAndNextButtonsIfNeeded (nextButton, lastButton, currentPage, numPages) {
  if (currentPage === numPages) {
    nextButton.classList.add('disabled');
    lastButton.classList.add('disabled');
  } else {
    nextButton.classList.remove('disabled');
    lastButton.classList.remove('disabled');
  }
}

function createLastAndNextButtons ($paginator, currentPage, numPages) {
  const $nextButton = createButton(currentPage + 1, '›', 'next-page-button');
  const $lastButton = createButton(numPages, '»', 'last-page-button');

  disableLastAndNextButtonsIfNeeded($nextButton, $lastButton, currentPage, numPages);

  renderPageButton($paginator, $nextButton);
  renderPageButton($paginator, $lastButton);
}

function renderPageButton ($paginator, button) {
  $paginator.appendChild(button);
}

export function showPaginator (currentPage, numPages, callbackUpdateList) {
  const $paginator = document.querySelector('#paginator');

  $paginator.innerHTML = '';

  if (numPages <= 1) {
    return;
  }

  createFirstAndPrevButtons($paginator, currentPage);
  createPageButtons($paginator, currentPage, numPages);
  createLastAndNextButtons($paginator, currentPage, numPages);

  if (paginatorEventListener) {
    $paginator.removeEventListener('click', paginatorEventListener);
  }

  paginatorEventListener = (event) => {
    const { target } = event;

    if (target.classList.contains('page-link')) {
      const pageNumber = parseInt(target.dataset.page);
      callbackUpdateList(pageNumber);
    }
  };

  $paginator.addEventListener('click', paginatorEventListener);
}
