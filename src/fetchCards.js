import Axios from 'axios';

const API_KEY = '28090612-053d38b519fb99dbfe43ba7b5';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchCards(name) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(res => res.json());
}
