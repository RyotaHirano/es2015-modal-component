# es2015-modal-component

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

## DEMO
http://ryotahirano.github.io/es2015-modal-component

---

## Usage

```
npm i es2015-modal-component
```
---

### javascript
```js
import $ from 'jquery';
import Modal from 'es2015-modal-component';

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

// Inner Scroll Modal
$('.js-inner-scroll-modal-open').each((i, el) => {
  return new Modal(el, {
    modalScrollSelector: '.js-modal-scroll-inner',
    isResizeModalHeight: true,
    modalHeightRatio: 0.6
  }).on('open', function(el, modal) {
    // Create Modal Contents
    const modalContents = document.createElement('div');
    modalContents.classList.add('c-modal', 'js-modal-scroll-inner');
    const modalContentsParagraph = document.createElement('p');
    modalContentsParagraph.classList.add('c-text', 'c-text--l', 'c-text-w--b');
    modalContentsParagraph.textContent = 'This is Inner Scroll Modal Contents. This i...';
    // Add More Contents...
    // Add More Contents......
    // Add More Contents.........

    modalContents.appendChild(modalContentsParagraph);
    // Modal render
    modal.render(modalContents);
  });
});

```

### scss
```scss
@import '../../node_modules/es2015-modal-component/css/modal';
```

### html
```html
<a href="" class="js-modal-open">Modal Open</a>

<a href="" class="js-inner-scroll-modal-open">Inner Scroll Modal Open</a>
```

## License

[MIT][license-url]

© RyotaHirano


[travis-image]: https://travis-ci.org/RyotaHirano/es2015-modal-component.svg?branch=master
[travis-url]: https://travis-ci.org/RyotaHirano/es2015-modal-component
[npm-url]: https://badge.fury.io/js/es2015-modal-component
[npm-image]: https://badge.fury.io/js/es2015-modal-component.svg
[license-url]: http://ryotahirano.mit-license.org
[license-image]: http://img.shields.io/:license-mit-blue.svg
