import './css/styles.css';
import Axios from 'axios';

const API_KEY = '28090612-053d38b519fb99dbfe43ba7b5';
const BASE_URL = 'https://pixabay.com/api/';

const $refs = {
  form: document.querySelector('#search-form'),
};

$refs.form.addEventListener('submit', onClickButton);

function onClickButton(event) {
  event.preventDefault();
}
