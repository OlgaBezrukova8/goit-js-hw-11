import './css/styles.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCards } from './fetchCards';

// const API_KEY = '28090612-053d38b519fb99dbfe43ba7b5';
// const BASE_URL = 'https://pixabay.com/api/';

const $refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
};

$refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const searchImageName = $refs.form.searchQuery.value;
  const searchImageNameTrim = searchImageName.trim();

  fetchCards(searchImageNameTrim).then(renderCardOfList);
}

function renderCardOfList(images) {
  if (images.total === 0) {
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
    <a href="${webformatURL}">
      <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">${likes}
        <b>Likes</b>
      </p>
      <p class="info-item">${views}
        <b>Views</b>
      </p>
      <p class="info-item">${comments}
        <b>Comments</b>
      </p>
      <p class="info-item">${downloads}
        <b>Downloads</b>
      </p>
    </div>
  </div>`;
        }
      )
      .join('');

    $refs.container.insertAdjacentHTML('beforeend', markup);
  }

  const card = new SimpleLightbox('.gallery a');
  card.refresh();
}
