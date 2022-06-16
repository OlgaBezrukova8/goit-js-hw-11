import './css/styles.css';
import Axios from 'axios';
import { fetchCards } from './fetchCards';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
    <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes${likes}</b>
      </p>
      <p class="info-item">
        <b>Views${views}</b>
      </p>
      <p class="info-item">
        <b>Comments${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads${downloads}</b>
      </p>
    </div>
  </div>`;
        }
      )
      .join('');

    $refs.container.insertAdjacentHTML('beforeend', markup);
  }
}
