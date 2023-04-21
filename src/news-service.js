import axios from 'axios';
import Notiflix from 'notiflix';
export default class NewsApiService {
  constructor() {
    this.searchQueryValue = '';
      this.page = 1;
      this.per_page = 40;
  }
  async getPictures() {
    const KEY_API = '35544273-b6528e3c4aa6f18d7727a7eb2';
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${KEY_API}&q=${this.searchQueryValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`
      );
      this.page += 1;
        
        return response;
        
    } catch (error) {
      Notiflix.Notify.failure(`${error.message}`);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQueryValue;
  }

  set query(newQuery) {
    this.searchQueryValue = newQuery;
    }

  get perPage() {
        return this.per_page;
    }

  set perPage(newValue) {
        this.per_page = newValue;
    }

}
