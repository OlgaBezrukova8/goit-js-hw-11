import Axios from 'axios';

const API_KEY = '28090612-053d38b519fb99dbfe43ba7b5';
const BASE_URL = 'https://pixabay.com/api/';

export default class CardsApiService {
  constructor() {
    this.searchBar = '';
    this.page = 1;
    this.per_page = 40;
    this.is_search = false;
  }

  async fetchCards() {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchBar}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
    );
    const card = await response.json();
    this.incrementPage();
    return card;
    //   return fetch(
    //     `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
    //   ).then(res => res.json());
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get isSearch() {
    return this.is_search;
  }

  set isSearch(search) {
    this.is_search = search;
  }
}
