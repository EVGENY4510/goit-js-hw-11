

export default function cardMarkup(params) {
    
  const { src, alt, likes, views, comments, downloads, href } = params;

  return `<a href="${href}" ><div class="photo-card">
  
  <img src="${src}" alt="${alt}" loading="lazy" />
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b class="info-item-downloads" >Downloads</b>${downloads}
    </p>
  </div>
</div></a>`;
  
}
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});