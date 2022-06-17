import './css/styles.css';
import CardsApiService from './fetchCards';
import Axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const API_KEY = '28090612-053d38b519fb99dbfe43ba7b5';
// const BASE_URL = 'https://pixabay.com/api/';

const $refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
};

$refs.form.addEventListener('submit', onSubmitForm);
$refs.loadButton.addEventListener('click', onLoadMore);

const cardsApiService = new CardsApiService();
$refs.loadButton.classList.add('is-hidden');
// $refs.loadButton.style.display = 'none';

function onSubmitForm(event) {
  event.preventDefault();

  cardsApiService.searchBar = $refs.form.searchQuery.value;
  if (cardsApiService.searchBar === '') {
    Notify.failure('Enter the search value!');
    return;
  }

  cardsApiService.resetPage();
  cardsApiService.fetchCards().then(hits => {
    clearCardsContainer();
    renderCardOfList(hits);
    $refs.loadButton.classList.remove('is-hidden');
  });
}

function onLoadMore() {
  cardsApiService.fetchCards().then(renderCardOfList);
}

function renderCardOfList(images) {
  // console.log(images.totalHits);
  // console.log(images.hits.length);

  if (images.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    const markup = images.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `
  <div class="photo-card">
    <a class="photo-card__link" href="${webformatURL}">
      <img class="photo-card__img" src="${largeImageURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`;
        }
      )
      .join('');

    $refs.container.insertAdjacentHTML('beforeend', markup);

    // if (images.hits.length >= images.totalHits) {
    //   console.log(images.totalHits);
    //   console.log(images.hits.length);
    //   // $refs.loadButton.style.display = 'none';
    //   Notify.warning(
    //     "We're sorry, but you've reached the end of search results."
    //   );
    // }

    if (images.totalHits < cardsApiService.per_page) {
      $refs.loadButton.style.display = 'none';
    }
  }

  const card = new SimpleLightbox('.gallery a');
  card.refresh();
}

function clearCardsContainer() {
  $refs.container.innerHTML = '';
}

// function allLoadCards
