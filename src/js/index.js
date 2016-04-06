import $ from 'jquery';
import { EventEmitter } from 'events';

const LABEL = 'modal';
const $html = $('html');
const $body = $('body');
const modalHTML = '<div class="e2015mc-modal-wrapper js-modal-wrapper"><div class="e2015mc-modal-bg js-modal-bg"></div><div class="e2015mc-modal js-modal"><div class="e2015mc-modal-inner js-modal-inner"><div class="e2015mc-modal-close"><a href="#" class="js-close-modal">CLOSE</a></div><div class="e2015mc-modal-body js-modal-body"></div></div></div></div>';

let anyOpend = false;

export default class Modal extends EventEmitter {
  constructor(el, opts) {
    super();
    this.el = el;
    this.$el = $(el);
    this.modalHTML = modalHTML;
    this.opts = {
      width: 640,
      height: 'auto',
      isStylingModal: true,
      bodySelector: '.js-modal-body',
      isDisabledScroll: false,
      modalBgSelector: '.js-modal-bg',
      modalScrollSelector: '.js-modal-inner',
      isResizeModalHeight: false,
      modalHeightRatio: 0.8,
      ...opts
    };
    this.addOpenEvent();
  }

  setBaseElement(el) {
    return this.modalHTML = el;
  }

  isAnyOpened() {
    return anyOpend;
  }

  render(el) {
    $(this.opts.bodySelector).append(el);
    return this;
  }

  _stylingModalAtOpen() {
    return $('.js-modal').css({
      width: this.opts.width,
      height: this.opts.height,
      marginTop: -this.opts.height / 2,
      marginLeft: -this.opts.width / 2,
      top: this.opts.top
    });
  }

  _getScrollbarWidth() {
    let div;
    let scrollbarWidth;

    div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    document.body.appendChild(div);
    scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
  }

  _stylingBodyAtOpen() {
    const scrollBarWidth = this._getScrollbarWidth();
    $body.css({
      'margin-right': scrollBarWidth,
      overflow: 'hidden'
    });
    $html.css({
      overflow: 'hidden'
    });
    return $(this.modalHTML).appendTo($body).hide().fadeIn(200);
  }

  _stylingBodyDefault() {
    $body.css({
      marginRight: 0,
      overflow: 'visible'
    });
    $html.css({
      overflow: 'visible'
    });
    return this;
  }

  _resizeModal() {
    const winH = $(window).outerHeight();
    const modalTop = $('.js-modal').position().top;
    const modalBodyTop = $(this.opts.bodySelector).position().top;
    const beforeModalH = $(this.opts.modalScrollSelector).height();
    const modalViewArea = modalTop + modalBodyTop + beforeModalH;

    if (modalViewArea > winH * this.modalHeightRatio) {
      const winH = $(window).outerHeight();
      const modalH = winH * this.modalHeightRatio;
      $(this.opts.modalScrollSelector).css({
        height: modalH,
        'overflow-y': 'scroll'
      });
    }
  }

  _removeModalWrapper() {
    $('.js-modal-wrapper').remove();
    return this._stylingBodyDefault();
  }

  open() {
    if (anyOpend) {
      return this;
    }
    this._opened = anyOpend = true;
    this._stylingBodyAtOpen();
    if (this.opts.isStylingModal) {
      this._stylingModalAtOpen();
    }
    if (this.opts.isDisabledScroll === true) {
      $(window).on('touchmove.noScroll', e => {
        e.stopPropagation();
        e.preventDefault();
        return false;
      });
      $(this.opts.modalBgSelector).on('touchmove.noScroll', e => {
        e.preventDefault();
        return false;
      });
      $(this.opts.modalScrollSelector).on('touchmove.enableScroll', e => {
        e.stopPropagation();
        return true;
      });
    }
    this.addCloseEvent();
    this.emit('open', this.el, this);
    if(this.opts.isResizeModalHeight === true) {
      this._resizeModal();
    }
    return this;
  }

  close() {
    this._opened = anyOpend = false;
    $('.js-modal').hide();
    $('.js-modal-wrapper').fadeOut().promise().done((function(_this) {
      return () => {
        return _this._removeModalWrapper();
      };
    })(this));
    if (this.opts.isDisabledScroll === true) {
      $(window).off('.noScroll');
      $(this.opts.modalBgSelector).off('.noScroll');
    }
    this.emit('close', this.el, this);
    return this;
  }

  addCloseEvent() {
    $('.js-close-modal, .js-modal-bg').on("click." + LABEL + ":close", (function(_this) {
      return ev => {
        if (ev != null) {
          if (typeof ev.preventDefault === "function") {
            ev.preventDefault();
          }
        }
        return _this.close();
      };
    })(this));
    return this;
  }

  addOpenEvent() {
    this.$el.on("click." + LABEL + ":open", (function(_this) {
      return ev => {
        if (ev != null) {
          if (typeof ev.preventDefault === "function") {
            ev.preventDefault();
          }
        }
        return _this.open();
      };
    })(this));
    return this;
  }

  removeOpenEvent() {
    this.$el.off("click." + LABEL + ":open");
    return this;
  }
}
