'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LABEL = 'modal';
var $html = (0, _jquery2.default)('html');
var $body = (0, _jquery2.default)('body');
var modalHTML = '<div class="e2015mc-modal-wrapper js-modal-wrapper"><div class="e2015mc-modal-bg js-modal-bg"></div><div class="e2015mc-modal js-modal"><div class="e2015mc-modal-inner js-modal-inner"><div class="e2015mc-modal-close"><a href="#" class="js-close-modal">CLOSE</a></div><div class="e2015mc-modal-body js-modal-body"></div></div></div></div>';

var anyOpend = false;

var Modal = function (_EventEmitter) {
  _inherits(Modal, _EventEmitter);

  function Modal(el, opts) {
    _classCallCheck(this, Modal);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).call(this));

    _this2.el = el;
    _this2.$el = (0, _jquery2.default)(el);
    _this2.modalHTML = modalHTML;
    _this2.opts = _extends({
      width: 640,
      height: 'auto',
      isStylingModal: true,
      bodySelector: '.js-modal-body',
      isDisabledScroll: false,
      modalBgSelector: '.js-modal-bg',
      modalScrollSelector: '.js-modal-inner',
      isResizeModalHeight: false,
      modalHeightRatio: 0.8
    }, opts);
    _this2.addOpenEvent();
    return _this2;
  }

  _createClass(Modal, [{
    key: 'setBaseElement',
    value: function setBaseElement(el) {
      return this.modalHTML = el;
    }
  }, {
    key: 'isAnyOpened',
    value: function isAnyOpened() {
      return anyOpend;
    }
  }, {
    key: 'render',
    value: function render(el) {
      (0, _jquery2.default)(this.opts.bodySelector).append(el);
      return this;
    }
  }, {
    key: '_stylingModalAtOpen',
    value: function _stylingModalAtOpen() {
      return (0, _jquery2.default)('.js-modal').css({
        width: this.opts.width,
        height: this.opts.height,
        marginTop: -this.opts.height / 2,
        marginLeft: -this.opts.width / 2,
        top: this.opts.top
      });
    }
  }, {
    key: '_getScrollbarWidth',
    value: function _getScrollbarWidth() {
      var div = void 0;
      var scrollbarWidth = void 0;

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
  }, {
    key: '_stylingBodyAtOpen',
    value: function _stylingBodyAtOpen() {
      var scrollBarWidth = this._getScrollbarWidth();
      $body.css({
        'margin-right': scrollBarWidth,
        overflow: 'hidden'
      });
      $html.css({
        overflow: 'hidden'
      });
      return (0, _jquery2.default)(this.modalHTML).appendTo($body).hide().fadeIn(200);
    }
  }, {
    key: '_stylingBodyDefault',
    value: function _stylingBodyDefault() {
      $body.css({
        marginRight: 0,
        overflow: 'visible'
      });
      $html.css({
        overflow: 'visible'
      });
      return this;
    }
  }, {
    key: '_resizeModal',
    value: function _resizeModal() {
      var winH = (0, _jquery2.default)(window).outerHeight();
      var modalTop = (0, _jquery2.default)('.js-modal').position().top;
      var modalBodyTop = (0, _jquery2.default)(this.opts.bodySelector).position().top;
      var beforeModalH = (0, _jquery2.default)(this.opts.modalScrollSelector).height();
      var modalViewArea = modalTop + modalBodyTop + beforeModalH;

      if (modalViewArea > winH * this.modalHeightRatio) {
        var _winH = (0, _jquery2.default)(window).outerHeight();
        var modalH = _winH * this.modalHeightRatio;
        (0, _jquery2.default)(this.opts.modalScrollSelector).css({
          height: modalH,
          'overflow-y': 'scroll'
        });
      }
    }
  }, {
    key: '_removeModalWrapper',
    value: function _removeModalWrapper() {
      (0, _jquery2.default)('.js-modal-wrapper').remove();
      return this._stylingBodyDefault();
    }
  }, {
    key: 'open',
    value: function open() {
      if (anyOpend) {
        return this;
      }
      this._opened = anyOpend = true;
      this._stylingBodyAtOpen();
      if (this.opts.isStylingModal) {
        this._stylingModalAtOpen();
      }
      if (this.opts.isDisabledScroll === true) {
        (0, _jquery2.default)(window).on('touchmove.noScroll', function (e) {
          e.stopPropagation();
          e.preventDefault();
          return false;
        });
        (0, _jquery2.default)(this.opts.modalBgSelector).on('touchmove.noScroll', function (e) {
          e.preventDefault();
          return false;
        });
        (0, _jquery2.default)(this.opts.modalScrollSelector).on('touchmove.enableScroll', function (e) {
          e.stopPropagation();
          return true;
        });
      }
      this.addCloseEvent();
      this.emit('open', this.el, this);
      if (this.opts.isResizeModalHeight === true) {
        this._resizeModal();
      }
      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      this._opened = anyOpend = false;
      (0, _jquery2.default)('.js-modal').hide();
      (0, _jquery2.default)('.js-modal-wrapper').fadeOut().promise().done(function (_this) {
        return function () {
          return _this._removeModalWrapper();
        };
      }(this));
      if (this.opts.isDisabledScroll === true) {
        (0, _jquery2.default)(window).off('.noScroll');
        (0, _jquery2.default)(this.opts.modalBgSelector).off('.noScroll');
      }
      this.emit('close', this.el, this);
      return this;
    }
  }, {
    key: 'addCloseEvent',
    value: function addCloseEvent() {
      (0, _jquery2.default)('.js-close-modal, .js-modal-bg').on("click." + LABEL + ":close", function (_this) {
        return function (ev) {
          if (ev != null) {
            if (typeof ev.preventDefault === "function") {
              ev.preventDefault();
            }
          }
          return _this.close();
        };
      }(this));
      return this;
    }
  }, {
    key: 'addOpenEvent',
    value: function addOpenEvent() {
      this.$el.on("click." + LABEL + ":open", function (_this) {
        return function (ev) {
          if (ev != null) {
            if (typeof ev.preventDefault === "function") {
              ev.preventDefault();
            }
          }
          return _this.open();
        };
      }(this));
      return this;
    }
  }, {
    key: 'removeOpenEvent',
    value: function removeOpenEvent() {
      this.$el.off("click." + LABEL + ":open");
      return this;
    }
  }]);

  return Modal;
}(_events.EventEmitter);

exports.default = Modal;