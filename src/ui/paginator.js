const $paginator = document.querySelector('#paginator');

let paginatorEventListener = null;

function createButton (page, text, test) {
  const $listItem = document.createElement('li');
  $listItem.classList.add('page-item');
  $listItem.dataset.test = test || `page-${text}`;

  const $link = document.createElement('a');
  $link.classList.add('page-link');
  $link.dataset.page = page;
  $link.textContent = text;

  $listItem.appendChild($link);
  return $listItem;
}

function disableFirstAndPrevButtonsIfNeeded (firstButton, prevButton, currentPage) {
  const isCurrentPageFirst = currentPage === 1;
  firstButton.classList.toggle('disabled', isCurrentPageFirst);
  prevButton.classList.toggle('disabled', isCurrentPageFirst);
}

function createFirstAndPrevButtons (currentPage) {
  const $firstButton = createButton(1, '«', 'first-page-button');
  const $prevButton = createButton(currentPage - 1, '‹', 'previous-page-button');

  disableFirstAndPrevButtonsIfNeeded($firstButton, $prevButton, currentPage);

  renderPageButton($firstButton);
  renderPageButton($prevButton);
}

function createPageButtons (currentPage, numPages) {
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

    renderPageButton($pageButton);
  }
}

function disableLastAndNextButtonsIfNeeded (nextButton, lastButton, currentPage, numPages) {
  const isLastPage = currentPage === numPages;
  nextButton.classList.toggle('disabled', isLastPage);
  lastButton.classList.toggle('disabled', isLastPage);
}

function createLastAndNextButtons (currentPage, numPages) {
  const $nextButton = createButton(currentPage + 1, '›', 'next-page-button');
  const $lastButton = createButton(numPages, '»', 'last-page-button');

  disableLastAndNextButtonsIfNeeded($nextButton, $lastButton, currentPage, numPages);

  renderPageButton($nextButton);
  renderPageButton($lastButton);
}

function renderPageButton (button) {
  $paginator.appendChild(button);
}

export function showPaginator (currentPage, numPages, callbackUpdateList) {
  $paginator.innerHTML = '';

  if (numPages <= 1) {
    return;
  }

  createFirstAndPrevButtons(currentPage);
  createPageButtons(currentPage, numPages);
  createLastAndNextButtons(currentPage, numPages);

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
