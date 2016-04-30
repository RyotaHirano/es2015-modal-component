import $ from 'jquery';
import Modal from 'es2015-modal-component';

const initModal = () => {
  // Modal
  $('.js-modal-open').each((i, el) => {
    return new Modal(el, {}).on('open', function(el, modal) {
      // Create Modal Contents
      const modalContents = document.createElement('div');
      modalContents.classList.add('c-modal');
      const modalContentsParagraph = document.createElement('p');
      modalContentsParagraph.classList.add('c-text', 'c-text--l', 'c-text-w--b');
      modalContentsParagraph.textContent = 'This is Modal Contents.';
      modalContents.appendChild(modalContentsParagraph);
      // Modal render
      modal.render(modalContents);
    });
  });

  // Modal Image
  $('.js-modal-open--img').each((i, el) => {
    return new Modal(el, {}).on('open', function(el, modal) {
      // Create Modal Contents
      const targetImg = $(el).find('img');
      const imgPath = targetImg.attr('src');
      const img = document.createElement('img');
      img.setAttribute('src', imgPath);
      img.classList.add('c-modal-img');
      // Modal render
      modal.render($(img));
    });
  });

  // Modal Resized
  $('.js-modal-open--resize').each((i, el) => {
    return new Modal(el, {
      modalScrollSelector: '.js-modal-resize-inner',
      isResizeModalHeight: true,
      modalHeightRatio: 0.6
    }).on('open', function(el, modal) {
      // Create Modal Contents
      const modalContents = document.createElement('div');
      modalContents.classList.add('c-modal', 'js-modal-resize-inner');
      const modalContentsParagraph = document.createElement('p');
      modalContentsParagraph.classList.add('c-text', 'c-text--l', 'c-text-w--b');
      modalContentsParagraph.textContent =
        'This is Modal Contents.This is Modal Contents.This is Modal Contents.' +
        'This is Modal Contents.This is Modal Contents.This is Modal Contents.' +
        'This is Modal Contents.This is Modal Contents.This is Modal Contents.' +
        'This is Modal Contents.This is Modal Contents.This is Modal Contents.' +
        'This is Modal Contents.This is Modal Contents.This is Modal Contents.' +
        'This is Modal Contents.This is Modal Contents.This is Modal Contents.' +
        'This is Modal Contents.This is Modal Contents.This is Modal Contents.' +
        'This is Modal Contents.This is Modal Contents.This is Modal Contents.' +
        'This is Modal Contents.This is Modal Contents.This is Modal Contents.';
      modalContents.appendChild(modalContentsParagraph);
      // Modal render
      modal.render(modalContents);
    });
  });
}
initModal();
