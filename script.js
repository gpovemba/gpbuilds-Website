// Images, navigation and contact links remain usable without JavaScript.
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const galleryLinks = [...document.querySelectorAll('.image-link')];
const lightbox = document.querySelector('.lightbox');
const fullImage = lightbox.querySelector('.lightbox-image');
const count = document.getElementById('lightbox-count');
const title = document.getElementById('lightbox-title');
const originalLink = lightbox.querySelector('.original-link');
let activeIndex = 0;
let returnFocus;

function showImage(index) {
  activeIndex = (index + galleryLinks.length) % galleryLinks.length;
  const link = galleryLinks[activeIndex];
  const thumbnail = link.querySelector('img');
  // Load the original only when the viewer is opened; the grid uses WebP previews.
  fullImage.src = link.href;
  fullImage.alt = thumbnail.alt;
  originalLink.href = link.href;
  count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(galleryLinks.length).padStart(2, '0')}`;
  title.textContent = link.querySelector('.image-caption > span').firstChild.textContent;
}

if (typeof lightbox.showModal === 'function') {
  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      returnFocus = link;
      showImage(index);
      lightbox.showModal();
      lightbox.querySelector('.lightbox-close').focus();
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(activeIndex - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(activeIndex + 1));
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  // Native dialog supplies focus trapping and Escape-to-close behavior.
  lightbox.addEventListener('close', () => returnFocus?.focus({ preventScroll: true }));
}
