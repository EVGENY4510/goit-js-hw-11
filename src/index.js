import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './news-service';
import cardMarkup from './cardMarkup';
import btnUp from './buttonScroll'

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const titleEl = document.querySelector('.title')

const newApiService = new NewsApiService();
let totalMessage = 40;

formEl.addEventListener('submit', onSubmit);
loadMoreBtnEl.addEventListener('click', onClick);

btnDisabled();

function onSubmit(e) {
    e.preventDefault();
    
   

totalMessage = 40;
  clearGalleryEl();
  newApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    if (newApiService.query === '') {
      btnDisabled();
     Notiflix.Notify.failure(
      'Oops input field is empty, please enter your request ;)'
        );
        titleEl.hidden = false;
        titleEl.textContent = 'Oops input field is empty';
        return;
  }

  newApiService.resetPage();
    newApiService.getPictures().then(searchBtn);
}



function searchBtn(response) {
  const { totalHits, hits } = response.data;
    
    if (newApiService.perPage >= totalHits) {
        btnDisabled();
    
    }
  if (hits.length === 0) {
     Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
      );
      titleEl.hidden = false;
      titleEl.textContent = "We don't have those pictures."
      return;
    }
    titleEl.hidden = true;
  totalHitsMessage(totalHits);
  loadMoreBtnEl.hidden = false;
  loadMoreBtnEl.textContent = 'load more';
  appendMarkup(hits);
    lightboxFoo();
    if (newApiService.perPage >= totalHits) {
      btnDisabled();
    }
}
function lightboxFoo() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });

}

function clearGalleryEl() {
  galleryEl.innerHTML = '';
}

function onClick() {
    
    newApiService.getPictures().then(toLoadMoreBtn);
    
}
function totalHitsMessage(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}
function btnDisabled() {
    loadMoreBtnEl.hidden = true;
    
}
function toLoadMoreBtn(response) {
    const { totalHits, hits } = response.data;    
  totalMessage += 40;
 Notiflix.Notify.info(`Viewed-${totalMessage},from-${totalHits}`);
    appendMarkup(hits);
   
    lightboxFoo();
    if (totalMessage >= totalHits) {
      loadMoreBtnEl.hidden = true;
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
}

function appendMarkup(hits) {
  hits.forEach(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      const params = {};
      params.href = largeImageURL;
      params.src = webformatURL;
      params.alt = tags;
      params.likes = likes;
      params.views = views;
      params.comments = comments;
      params.downloads = downloads;

      galleryEl.insertAdjacentHTML('beforeend', cardMarkup(params));
    }
  );
}