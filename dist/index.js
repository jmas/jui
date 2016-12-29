(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.SpinnerDialog = exports.MessageDialog = exports.Emitter = exports.Component = undefined;

var _Component = require('./src/Component');

var _Component2 = _interopRequireDefault(_Component);

var _Emitter = require('./src/Emitter');

var _Emitter2 = _interopRequireDefault(_Emitter);

var _MessageDialog = require('./src/MessageDialog');

var _MessageDialog2 = _interopRequireDefault(_MessageDialog);

var _SpinnerDialog = require('./src/SpinnerDialog');

var _SpinnerDialog2 = _interopRequireDefault(_SpinnerDialog);

var _Tabs = require('./src/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Component = _Component2.default;
exports.Emitter = _Emitter2.default;
exports.MessageDialog = _MessageDialog2.default;
exports.SpinnerDialog = _SpinnerDialog2.default;
exports.Tabs = _Tabs2.default;

},{"./src/Component":2,"./src/Emitter":4,"./src/MessageDialog":5,"./src/SpinnerDialog":6,"./src/Tabs":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class Component
 * @extends Emitter
 */
var Component = function (_Emitter) {
    _inherits(Component, _Emitter);

    _createClass(Component, [{
        key: 'defaultProps',

        /**
         * @returns {Object}
         */
        get: function get() {
            return {};
        }

        /**
         * @returns {Object}
         */

    }, {
        key: 'props',
        get: function get() {
            return this._props;
        }

        /**
         * @returns {Object}
         */

    }, {
        key: 'refs',
        get: function get() {
            return this._refs;
        }

        /**
         * @returns {Object}
         */

    }, {
        key: 'binds',
        get: function get() {
            return {};
        }

        /**
         * @returns {Element}
         */

    }, {
        key: 'mountEl',
        get: function get() {
            return this._mountEl;
        }

        /**
         * @returns {null|String}
         */

    }, {
        key: 'content',
        get: function get() {
            return null;
        }

        /**
         * @param {Object} props
         */

    }]);

    function Component() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props.handlers));

        var mountProps = {};
        _this._mountEl = props.mountEl;
        if (!_this._mountEl) {
            _this._mountEl = document.createElement('div');
            document.body.appendChild(_this._mountEl);
        } else {
            mountProps = JSON.parse(_this._mountEl.getAttribute('data-props'));
        }
        _this._props = _extends({}, _this.defaultProps, mountProps, props);
        _this._refs = _this._getRefs();
        _this._binds = _this.binds;
        _this.render();
        return _this;
    }

    /**
     * @param {Object} props
     */


    _createClass(Component, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var content = this.content;
            if (content) {
                this._mountEl.innerHTML = content;
            }
            this._refs = this._getRefs();
            Object.keys(this._binds).forEach(function (bindName) {
                var result = _this2._binds[bindName].call(_this2, _this2._refs[bindName]);
                if (result instanceof Element) {
                    _this2._refs[bindName].innerHTML = '';
                    _this2._refs[bindName].appendChild(result);
                } else if (typeof result === 'string') {
                    _this2._refs[bindName].innerHTML = result ? result : '';
                } else if (result instanceof Array) {
                    _this2._refs[bindName].innerHTML = '';
                    for (var i = 0; i < result.length; i++) {
                        if (result[i] instanceof Element) {
                            _this2._refs[bindName].appendChild(result[i]);
                        } else if (result[i] instanceof Component) {
                            _this2._refs[bindName].appendChild(result[i].mountEl);
                        }
                    }
                }
                _this2._refs = _this2._getRefs();
            });
        }

        /**
         * @param {Object|Function} props
         */

    }, {
        key: 'setProps',
        value: function setProps(props) {
            if (typeof props === 'function') {
                props = props(this._props);
            }
            this._props = _extends({}, this._props, props);
            this.render(props);
        }

        /**
         * @param {String} name
         * @param {*} value
         */

    }, {
        key: 'setProp',
        value: function setProp(name, value) {
            this.setProps(_defineProperty({}, name, value));
        }

        /**
         * @returns {Object}
         * @private
         */

    }, {
        key: '_getRefs',
        value: function _getRefs() {
            var refsEls = this._mountEl.querySelectorAll('[data-ref]');
            var refs = {};
            for (var i = 0; i < refsEls.length; i++) {
                var refName = refsEls[i].getAttribute('data-ref');
                var refEl = refsEls[i];
                if (refName.substr(-2) === '[]') {
                    refName = refName.substr(0, refName.length - 2);
                    if (!refs[refName]) {
                        refs[refName] = [refEl];
                    } else {
                        refs[refName].push(refEl);
                    }
                } else {
                    if (!refs[refName]) {
                        refs[refName] = refEl;
                    }
                }
            }
            return refs;
        }
    }]);

    return Component;
}(_emitter2.default);

exports.default = Component;

},{"./emitter":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_Component) {
    _inherits(Dialog, _Component);

    function Dialog() {
        _classCallCheck(this, Dialog);

        return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
    }

    _createClass(Dialog, [{
        key: 'close',
        value: function close() {
            this.setProps({
                dialog: {
                    isOpen: false
                }
            });
            if (this.props.destroyOnClose) {
                this.destroy();
            }
        }
    }, {
        key: 'open',
        value: function open() {
            this.setProps({
                dialog: {
                    isOpen: true
                }
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (document.body.contains(this.mountEl)) {
                document.body.removeChild(this.mountEl);
            } else {
                while (this.mountEl.firstChild) {
                    this.mountEl.removeChild(this.mountEl.firstChild);
                }
            }
        }
    }, {
        key: '_renderDialog',
        value: function _renderDialog(el) {
            if (this.props.dialog.isOpen) {
                el.classList.remove('is-hidden');
            } else {
                el.classList.add('is-hidden');
            }
        }
    }, {
        key: '_handleCloseButtonClick',
        value: function _handleCloseButtonClick(event) {
            event.preventDefault();
            this.close();
            this.emit('close');
        }
    }, {
        key: 'defaultProps',
        get: function get() {
            return _extends({}, _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'defaultProps', this), {
                isClosable: true,
                className: 'is-medium',
                dialog: {
                    isOpen: false
                },
                destroyOnClose: false
            });
        }
    }, {
        key: 'binds',
        get: function get() {
            var _this2 = this;

            return _extends({}, _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'binds', this), {
                dialog: this._renderDialog.bind(this),
                closeButton: function closeButton(el) {
                    return el.addEventListener('click', _this2._handleCloseButtonClick.bind(_this2));
                }
            });
        }
    }, {
        key: 'content',
        get: function get() {
            return '\n            <div data-ref="dialog" class="dialog ' + (this.props.className || '') + '">\n                <div class="dialog-box" role="dialog">\n                    <div class="dialog-content" data-ref="content">\n                        ' + (this.innerContent || '') + '\n                    </div>\n                    ' + (this.props.isClosable ? '<button class="dialog-close" data-ref="closeButton">&times;</button>' : '') + '\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'innerContent',
        get: function get() {
            return null;
        }
    }, {
        key: 'isOpen',
        get: function get() {
            return this.props.dialog.isOpen;
        }
    }]);

    return Dialog;
}(_Component3.default);

exports.default = Dialog;

},{"./Component":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Emitter
 */
var Emitter = function () {
    /**
     * @param {Object} handlers
     */
    function Emitter() {
        var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Emitter);

        this._handlers = handlers || {};
    }

    /**
     * @param {String} handlerName
     * @param {Function} handlerFn
     */


    _createClass(Emitter, [{
        key: 'on',
        value: function on(handlerName, handlerFn) {
            if (!(handlerFn instanceof Function)) {
                throw new Error('`handlerFn` should be an function.');
            }
            if (!this._handlers[handlerName]) {
                this._handlers[handlerName] = [];
            } else if (this._handlers[handlerName] instanceof Function) {
                this._handlers[handlerName] = [this._handlers[handlerName]];
            }
            this._handlers[handlerName].push(handlerFn);
        }

        /**
         * @param {String} handlerName
         * @param {Object} payload
         */

    }, {
        key: 'emit',
        value: function emit(handlerName) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var handler = this._handlers[handlerName];
            if (handler) {
                if (handler instanceof Array) {
                    for (var i = 0; i < handler.length; i++) {
                        handler[i](payload);
                    }
                } else if (handler instanceof Function) {
                    handler(payload);
                } else {
                    throw new Error('`handler` should be an instance of Array or Function.');
                }
            }
        }
    }]);

    return Emitter;
}();

exports.default = Emitter;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Dialog2 = require('./Dialog');

var _Dialog3 = _interopRequireDefault(_Dialog2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageDialog = function (_Dialog) {
    _inherits(MessageDialog, _Dialog);

    function MessageDialog() {
        _classCallCheck(this, MessageDialog);

        return _possibleConstructorReturn(this, (MessageDialog.__proto__ || Object.getPrototypeOf(MessageDialog)).apply(this, arguments));
    }

    _createClass(MessageDialog, [{
        key: 'defaultProps',
        get: function get() {
            return _extends({}, _get(MessageDialog.prototype.__proto__ || Object.getPrototypeOf(MessageDialog.prototype), 'defaultProps', this), {
                className: 'is-small is-text-centered',
                isClosable: true,
                message: null
            });
        }
    }, {
        key: 'innerContent',
        get: function get() {
            return this.props.message;
        }
    }]);

    return MessageDialog;
}(_Dialog3.default);

exports.default = MessageDialog;

},{"./Dialog":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Dialog2 = require('./Dialog');

var _Dialog3 = _interopRequireDefault(_Dialog2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpinnerDialog = function (_Dialog) {
    _inherits(SpinnerDialog, _Dialog);

    function SpinnerDialog() {
        _classCallCheck(this, SpinnerDialog);

        return _possibleConstructorReturn(this, (SpinnerDialog.__proto__ || Object.getPrototypeOf(SpinnerDialog)).apply(this, arguments));
    }

    _createClass(SpinnerDialog, [{
        key: 'open',
        value: function open() {
            var _this2 = this;

            _get(SpinnerDialog.prototype.__proto__ || Object.getPrototypeOf(SpinnerDialog.prototype), 'open', this).call(this);
            if (this.props.closeTimeout) {
                if (typeof this.props.closeTimeout !== 'number') {
                    throw new Error('`closeTimeout` should be an Number.');
                }
                setTimeout(function () {
                    return _this2.close();
                }, this.props.closeTimeout);
            }
        }
    }, {
        key: '_renderMessage',
        value: function _renderMessage(el) {
            if (this.props.message) {
                el.classList.remove('is-hidden');
                el.innerHTML = this.props.message;
            } else {
                el.classList.add('is-hidden');
            }
        }
    }, {
        key: 'defaultProps',
        get: function get() {
            return _extends({}, _get(SpinnerDialog.prototype.__proto__ || Object.getPrototypeOf(SpinnerDialog.prototype), 'defaultProps', this), {
                className: 'spinner-dialog is-small',
                isClosable: false
            });
        }
    }, {
        key: 'innerContent',
        get: function get() {
            return '\n            <div class="spinner">\n                <div class="spinner-animation">\n                    <div class="spinner-animation-item spinner-animation-r1"></div>\n                    <div class="spinner-animation-item spinner-animation-r2"></div>\n                    <div class="spinner-animation-item spinner-animation-r3"></div>\n                    <div class="spinner-animation-item spinner-animation-r4"></div>\n                    <div class="spinner-animation-item spinner-animation-r5"></div>\n                </div>\n                <div data-ref="message" class="spinner-message"></div>\n            </div>\n        ';
        }
    }, {
        key: 'binds',
        get: function get() {
            return {
                message: this._renderMessage.bind(this)
            };
        }
    }]);

    return SpinnerDialog;
}(_Dialog3.default);

exports.default = SpinnerDialog;

},{"./Dialog":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
        _classCallCheck(this, Tabs);

        return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
    }

    _createClass(Tabs, [{
        key: '_renderButtons',
        value: function _renderButtons(els) {
            var _this2 = this;

            els.forEach(function (el) {
                return el.addEventListener('click', _this2._handleButtonClick.bind(_this2));
            });
        }
    }, {
        key: '_handleButtonClick',
        value: function _handleButtonClick(event) {
            event.preventDefault();
            this.setProps({
                activeTab: event.target.getAttribute('data-tab-id')
            });
        }
    }, {
        key: 'defaultProps',
        get: function get() {
            return _extends({}, _get(Tabs.prototype.__proto__ || Object.getPrototypeOf(Tabs.prototype), 'defaultProps', this), {
                activeTab: null
            });
        }
    }, {
        key: 'tabs',
        get: function get() {
            return [];
        }
    }, {
        key: 'content',
        get: function get() {
            var _this3 = this;

            return '\n            <div class="tabs-buttons">\n                ' + this.tabs.map(function (tab) {
                return '\n                    <button\n                        data-ref="buttons[]"\n                        data-tab-id="' + tab.id + '"\n                        class="' + (_this3.props.activeTab === tab.id ? 'is-active' : '') + '"\n                    >' + tab.name + '</button>\n                ';
            }).join('') + '\n            </div>\n            ' + this.tabs.map(function (tab) {
                return '\n                <div class="tabs-content ' + (_this3.props.activeTab === tab.id ? 'is-active' : '') + '">\n                    ' + tab.content + '\n                </div>\n            ';
            }).join('') + '\n        ';
        }
    }, {
        key: 'binds',
        get: function get() {
            return {
                buttons: this._renderButtons.bind(this)
            };
        }
    }]);

    return Tabs;
}(_Component3.default);

exports.default = Tabs;

},{"./Component":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Emitter
 */
var Emitter = function () {
    /**
     * @param {Object} handlers
     */
    function Emitter() {
        var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Emitter);

        this._handlers = handlers || {};
    }

    /**
     * @param {String} handlerName
     * @param {Function} handlerFn
     */


    _createClass(Emitter, [{
        key: 'on',
        value: function on(handlerName, handlerFn) {
            if (!(handlerFn instanceof Function)) {
                throw new Error('`handlerFn` should be an function.');
            }
            if (!this._handlers[handlerName]) {
                this._handlers[handlerName] = [];
            } else if (this._handlers[handlerName] instanceof Function) {
                this._handlers[handlerName] = [this._handlers[handlerName]];
            }
            this._handlers[handlerName].push(handlerFn);
        }

        /**
         * @param {String} handlerName
         * @param {Object} payload
         */

    }, {
        key: 'emit',
        value: function emit(handlerName) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var handler = this._handlers[handlerName];
            if (handler) {
                if (handler instanceof Array) {
                    for (var i = 0; i < handler.length; i++) {
                        handler[i](payload);
                    }
                } else if (handler instanceof Function) {
                    handler(payload);
                } else {
                    throw new Error('`handler` should be an instance of Array or Function.');
                }
            }
        }
    }]);

    return Emitter;
}();

exports.default = Emitter;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qbWFzL1Byb2plY3RzL2p1aS9pbmRleC5qcyIsIi9Vc2Vycy9qbWFzL1Byb2plY3RzL2p1aS9zcmMvQ29tcG9uZW50LmpzIiwiL1VzZXJzL2ptYXMvUHJvamVjdHMvanVpL3NyYy9EaWFsb2cuanMiLCIvVXNlcnMvam1hcy9Qcm9qZWN0cy9qdWkvc3JjL0VtaXR0ZXIuanMiLCIvVXNlcnMvam1hcy9Qcm9qZWN0cy9qdWkvc3JjL01lc3NhZ2VEaWFsb2cuanMiLCIvVXNlcnMvam1hcy9Qcm9qZWN0cy9qdWkvc3JjL1NwaW5uZXJEaWFsb2cuanMiLCIvVXNlcnMvam1hcy9Qcm9qZWN0cy9qdWkvc3JjL1RhYnMuanMiLCIvVXNlcnMvam1hcy9Qcm9qZWN0cy9qdWkvc3JjL2VtaXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O1FBR0UsUztRQUNBLE87UUFDQSxhO1FBQ0EsYTtRQUNBLEk7Ozs7Ozs7Ozs7Ozs7QUNYRjs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlxQixTOzs7Ozs7QUFDakI7Ozs0QkFHb0I7QUFDaEIsbUJBQU8sRUFBUDtBQUNIOztBQUVEOzs7Ozs7NEJBR2E7QUFDVCxtQkFBTyxLQUFLLE1BQVo7QUFDSDs7QUFFRDs7Ozs7OzRCQUdZO0FBQ1IsbUJBQU8sS0FBSyxLQUFaO0FBQ0g7O0FBRUQ7Ozs7Ozs0QkFHYTtBQUNULG1CQUFPLEVBQVA7QUFDSDs7QUFFRDs7Ozs7OzRCQUdlO0FBQ1gsbUJBQU8sS0FBSyxRQUFaO0FBQ0g7O0FBRUQ7Ozs7Ozs0QkFHZTtBQUNYLG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7O0FBR0EseUJBQXVCO0FBQUEsWUFBVixLQUFVLHVF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UyxFQUFXO0FBQ3hCLGdCQUFJLEVBQUUscUJBQXFCLFFBQXZCLENBQUosRUFBc0M7QUFDbEMsc0JBQU0sSUFBSSxLQUFKLENBQVUsb0NBQVYsQ0FBTjtBQUNIO0FBQ0QsZ0JBQUksQ0FBQyxLQUFLLFNBQUwsQ0FBZSxXQUFmLENBQUwsRUFBa0M7QUFDOUIscUJBQUssU0FBTCxDQUFlLFdBQWYsSUFBOEIsRUFBOUI7QUFDSCxhQUZELE1BRU8sSUFBSSxLQUFLLFNBQUwsQ0FBZSxXQUFmLGFBQXVDLFFBQTNDLEVBQXFEO0FBQ3hELHFCQUFLLFNBQUwsQ0FBZSxXQUFmLElBQThCLENBQUMsS0FBSyxTQUFMLENBQWUsV0FBZixDQUFELENBQTlCO0FBQ0g7QUFDRCxpQkFBSyxTQUFMLENBQWUsV0FBZixFQUE0QixJQUE1QixDQUFpQyxTQUFqQztBQUNIOztBQUVEOzs7Ozs7OzZCQUlNLFcsRUFBeUI7QUFBQSxnQkFBWixPQUFZLHVFQUFKLEVBQUk7O0FBQzNCLGdCQUFNLFVBQVUsS0FBSyxTQUFMLENBQWUsV0FBZixDQUFoQjtBQUNBLGdCQUFJLE9BQUosRUFBYTtBQUNULG9CQUFJLG1CQUFtQixLQUF2QixFQUE4QjtBQUMxQix5QkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFFBQVEsTUFBNUIsRUFBb0MsR0FBcEMsRUFBeUM7QUFDckMsZ0NBQVEsQ0FBUixFQUFXLE9BQVg7QUFDSDtBQUNKLGlCQUpELE1BSU8sSUFBSSxtQkFBbUIsUUFBdkIsRUFBaUM7QUFDcEMsNEJBQVEsT0FBUjtBQUNILGlCQUZNLE1BRUE7QUFDSCwwQkFBTSxJQUFJLEtBQUosQ0FBVSx1REFBVixDQUFOO0FBQ0g7QUFDSjtBQUNKOzs7Ozs7a0JBekNnQixPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9zcmMvQ29tcG9uZW50JztcbmltcG9ydCBFbWl0dGVyIGZyb20gJy4vc3JjL0VtaXR0ZXInO1xuaW1wb3J0IE1lc3NhZ2VEaWFsb2cgZnJvbSAnLi9zcmMvTWVzc2FnZURpYWxvZyc7XG5pbXBvcnQgU3Bpbm5lckRpYWxvZyBmcm9tICcuL3NyYy9TcGlubmVyRGlhbG9nJztcbmltcG9ydCBUYWJzIGZyb20gJy4vc3JjL1RhYnMnO1xuXG5leHBvcnQge1xuICBDb21wb25lbnQsXG4gIEVtaXR0ZXIsXG4gIE1lc3NhZ2VEaWFsb2csXG4gIFNwaW5uZXJEaWFsb2csXG4gIFRhYnNcbn07XG4iLCJpbXBvcnQgRW1pdHRlciBmcm9tICcuL2VtaXR0ZXInO1xuXG4vKipcbiAqIEBjbGFzcyBDb21wb25lbnRcbiAqIEBleHRlbmRzIEVtaXR0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdFByb3BzICgpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0IHByb3BzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0IHJlZnMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVmcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCBiaW5kcyAoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXQgbW91bnRFbCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb3VudEVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtudWxsfFN0cmluZ31cbiAgICAgKi9cbiAgICBnZXQgY29udGVudCAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChwcm9wcz17fSkge1xuICAgICAgICBzdXBlcihwcm9wcy5oYW5kbGVycyk7XG4gICAgICAgIGxldCBtb3VudFByb3BzID0ge307XG4gICAgICAgIHRoaXMuX21vdW50RWwgPSBwcm9wcy5tb3VudEVsO1xuICAgICAgICBpZiAoIXRoaXMuX21vdW50RWwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdW50RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fbW91bnRFbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb3VudFByb3BzID0gSlNPTi5wYXJzZSh0aGlzLl9tb3VudEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9wcycpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcm9wcyA9IHsgLi4udGhpcy5kZWZhdWx0UHJvcHMsIC4uLm1vdW50UHJvcHMsIC4uLnByb3BzIH07XG4gICAgICAgIHRoaXMuX3JlZnMgPSB0aGlzLl9nZXRSZWZzKCk7XG4gICAgICAgIHRoaXMuX2JpbmRzID0gdGhpcy5iaW5kcztcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAgICAgKi9cbiAgICByZW5kZXIgKHByb3BzPW51bGwpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdW50RWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZWZzID0gdGhpcy5fZ2V0UmVmcygpO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9iaW5kcykuZm9yRWFjaCgoYmluZE5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2JpbmRzW2JpbmROYW1lXS5jYWxsKHRoaXMsIHRoaXMuX3JlZnNbYmluZE5hbWVdKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmc1tiaW5kTmFtZV0uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmc1tiaW5kTmFtZV0uYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3VsdD09PSdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmc1tiaW5kTmFtZV0uaW5uZXJIVE1MID0gcmVzdWx0ID8gcmVzdWx0OiAnJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZzW2JpbmROYW1lXS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8cmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0gaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWZzW2JpbmROYW1lXS5hcHBlbmRDaGlsZChyZXN1bHRbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdFtpXSBpbnN0YW5jZW9mIENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVmc1tiaW5kTmFtZV0uYXBwZW5kQ2hpbGQocmVzdWx0W2ldLm1vdW50RWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVmcyA9IHRoaXMuX2dldFJlZnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHByb3BzXG4gICAgICovXG4gICAgc2V0UHJvcHMgKHByb3BzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvcHM9PT0nZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBwcm9wcyA9IHByb3BzKHRoaXMuX3Byb3BzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcm9wcyA9IHsgLi4udGhpcy5fcHJvcHMsIC4uLnByb3BzIH07XG4gICAgICAgIHRoaXMucmVuZGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRQcm9wIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFByb3BzKHtcbiAgICAgICAgICAgIFtuYW1lXTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXRSZWZzICgpIHtcbiAgICAgICAgY29uc3QgcmVmc0VscyA9IHRoaXMuX21vdW50RWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmVmXScpO1xuICAgICAgICBjb25zdCByZWZzID0ge307XG4gICAgICAgIGZvciAobGV0IGk9MDsgaTxyZWZzRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmVmTmFtZSA9IHJlZnNFbHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuICAgICAgICAgICAgY29uc3QgcmVmRWwgPSByZWZzRWxzW2ldO1xuICAgICAgICAgICAgaWYgKHJlZk5hbWUuc3Vic3RyKC0yKT09PSdbXScpIHtcbiAgICAgICAgICAgICAgICByZWZOYW1lID0gcmVmTmFtZS5zdWJzdHIoMCwgcmVmTmFtZS5sZW5ndGgtMik7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWZzW3JlZk5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZnNbcmVmTmFtZV0gPSBbcmVmRWxdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZnNbcmVmTmFtZV0ucHVzaChyZWZFbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlZnNbcmVmTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmc1tyZWZOYW1lXSA9IHJlZkVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVmcztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vQ29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlhbG9nIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBnZXQgZGVmYXVsdFByb3BzICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN1cGVyLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgICAgIGlzQ2xvc2FibGU6IHRydWUsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdpcy1tZWRpdW0nLFxuICAgICAgICAgICAgZGlhbG9nOiB7XG4gICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3lPbkNsb3NlOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldCBiaW5kcyAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdXBlci5iaW5kcyxcbiAgICAgICAgICAgIGRpYWxvZzogdGhpcy5fcmVuZGVyRGlhbG9nLmJpbmQodGhpcyksXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbjogKGVsKSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNsb3NlQnV0dG9uQ2xpY2suYmluZCh0aGlzKSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgY29udGVudCAoKSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2IGRhdGEtcmVmPVwiZGlhbG9nXCIgY2xhc3M9XCJkaWFsb2cgJHsgdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJycgfVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctYm94XCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRlbnRcIiBkYXRhLXJlZj1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7IHRoaXMuaW5uZXJDb250ZW50IHx8ICcnIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICR7IHRoaXMucHJvcHMuaXNDbG9zYWJsZSA/IGA8YnV0dG9uIGNsYXNzPVwiZGlhbG9nLWNsb3NlXCIgZGF0YS1yZWY9XCJjbG9zZUJ1dHRvblwiPiZ0aW1lczs8L2J1dHRvbj5gOiAnJyB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBnZXQgaW5uZXJDb250ZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGlzT3BlbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRpYWxvZy5pc09wZW47XG4gICAgfVxuXG4gICAgY2xvc2UgKCkge1xuICAgICAgICB0aGlzLnNldFByb3BzKHtcbiAgICAgICAgICAgIGRpYWxvZzoge1xuICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRlc3Ryb3lPbkNsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4gKCkge1xuICAgICAgICB0aGlzLnNldFByb3BzKHtcbiAgICAgICAgICAgIGRpYWxvZzoge1xuICAgICAgICAgICAgICAgIGlzT3BlbjogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY29udGFpbnModGhpcy5tb3VudEVsKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1vdW50RWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMubW91bnRFbC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VudEVsLnJlbW92ZUNoaWxkKHRoaXMubW91bnRFbC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9yZW5kZXJEaWFsb2cgKGVsKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpYWxvZy5pc09wZW4pIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlQ2xvc2VCdXR0b25DbGljayAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgRW1pdHRlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoaGFuZGxlcnM9e30pIHtcbiAgICAgICAgdGhpcy5faGFuZGxlcnMgPSBoYW5kbGVycyB8fCB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGFuZGxlck5hbWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyRm5cbiAgICAgKi9cbiAgICBvbiAoaGFuZGxlck5hbWUsIGhhbmRsZXJGbikge1xuICAgICAgICBpZiAoIShoYW5kbGVyRm4gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYGhhbmRsZXJGbmAgc2hvdWxkIGJlIGFuIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5faGFuZGxlcnNbaGFuZGxlck5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVyc1toYW5kbGVyTmFtZV0gPSBbXTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9oYW5kbGVyc1toYW5kbGVyTmFtZV0gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlcnNbaGFuZGxlck5hbWVdID0gW3RoaXMuX2hhbmRsZXJzW2hhbmRsZXJOYW1lXV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGFuZGxlcnNbaGFuZGxlck5hbWVdLnB1c2goaGFuZGxlckZuKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGFuZGxlck5hbWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgICAqL1xuICAgIGVtaXQgKGhhbmRsZXJOYW1lLCBwYXlsb2FkPXt9KSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLl9oYW5kbGVyc1toYW5kbGVyTmFtZV07XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlciBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoYW5kbGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJbaV0ocGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKHBheWxvYWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BoYW5kbGVyYCBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2YgQXJyYXkgb3IgRnVuY3Rpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgRGlhbG9nIGZyb20gJy4vRGlhbG9nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZURpYWxvZyBleHRlbmRzIERpYWxvZyB7XG4gICAgZ2V0IGRlZmF1bHRQcm9wcyAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdXBlci5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdpcy1zbWFsbCBpcy10ZXh0LWNlbnRlcmVkJyxcbiAgICAgICAgICAgIGlzQ2xvc2FibGU6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBudWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IGlubmVyQ29udGVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1lc3NhZ2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IERpYWxvZyBmcm9tICcuL0RpYWxvZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaW5uZXJEaWFsb2cgZXh0ZW5kcyBEaWFsb2cge1xuICAgIGdldCBkZWZhdWx0UHJvcHMgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3VwZXIuZGVmYXVsdFByb3BzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnc3Bpbm5lci1kaWFsb2cgaXMtc21hbGwnLFxuICAgICAgICAgICAgaXNDbG9zYWJsZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgaW5uZXJDb250ZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItYW5pbWF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWFuaW1hdGlvbi1pdGVtIHNwaW5uZXItYW5pbWF0aW9uLXIxXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWFuaW1hdGlvbi1pdGVtIHNwaW5uZXItYW5pbWF0aW9uLXIyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWFuaW1hdGlvbi1pdGVtIHNwaW5uZXItYW5pbWF0aW9uLXIzXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWFuaW1hdGlvbi1pdGVtIHNwaW5uZXItYW5pbWF0aW9uLXI0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWFuaW1hdGlvbi1pdGVtIHNwaW5uZXItYW5pbWF0aW9uLXI1XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXJlZj1cIm1lc3NhZ2VcIiBjbGFzcz1cInNwaW5uZXItbWVzc2FnZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgZ2V0IGJpbmRzICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMuX3JlbmRlck1lc3NhZ2UuYmluZCh0aGlzKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9wZW4gKCkge1xuICAgICAgICBzdXBlci5vcGVuKCk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlVGltZW91dCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlVGltZW91dCE9PSdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgY2xvc2VUaW1lb3V0YCBzaG91bGQgYmUgYW4gTnVtYmVyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNsb3NlKCksIHRoaXMucHJvcHMuY2xvc2VUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9yZW5kZXJNZXNzYWdlIChlbCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5tZXNzYWdlKSB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IHRoaXMucHJvcHMubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYnMgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGdldCBkZWZhdWx0UHJvcHMgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3VwZXIuZGVmYXVsdFByb3BzLFxuICAgICAgICAgICAgYWN0aXZlVGFiOiBudWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IHRhYnMgKCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRlbnQgKCkge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYnMtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICR7IHRoaXMudGFicy5tYXAoKHRhYikgPT4gYFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj1cImJ1dHRvbnNbXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRhYi1pZD1cIiR7IHRhYi5pZCB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiJHsgdGhpcy5wcm9wcy5hY3RpdmVUYWI9PT10YWIuaWQgPyAnaXMtYWN0aXZlJzogJycgfVwiXG4gICAgICAgICAgICAgICAgICAgID4keyB0YWIubmFtZSB9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgYCkuam9pbignJykgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAkeyB0aGlzLnRhYnMubWFwKCh0YWIpID0+IGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFicy1jb250ZW50ICR7IHRoaXMucHJvcHMuYWN0aXZlVGFiPT09dGFiLmlkID8gJ2lzLWFjdGl2ZSc6ICcnIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgJHsgdGFiLmNvbnRlbnQgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYCkuam9pbignJykgfVxuICAgICAgICBgO1xuICAgIH1cblxuICAgIGdldCBiaW5kcyAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBidXR0b25zOiB0aGlzLl9yZW5kZXJCdXR0b25zLmJpbmQodGhpcylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBfcmVuZGVyQnV0dG9ucyAoZWxzKSB7XG4gICAgICAgIGVscy5mb3JFYWNoKChlbCkgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVCdXR0b25DbGljay5iaW5kKHRoaXMpKSk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUJ1dHRvbkNsaWNrIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNldFByb3BzKHtcbiAgICAgICAgICAgIGFjdGl2ZVRhYjogZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWItaWQnKVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyBFbWl0dGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kbGVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChoYW5kbGVycz17fSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVycyA9IGhhbmRsZXJzIHx8IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoYW5kbGVyTmFtZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJGblxuICAgICAqL1xuICAgIG9uIChoYW5kbGVyTmFtZSwgaGFuZGxlckZuKSB7XG4gICAgICAgIGlmICghKGhhbmRsZXJGbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgaGFuZGxlckZuYCBzaG91bGQgYmUgYW4gZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9oYW5kbGVyc1toYW5kbGVyTmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZXJzW2hhbmRsZXJOYW1lXSA9IFtdO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhbmRsZXJzW2hhbmRsZXJOYW1lXSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVyc1toYW5kbGVyTmFtZV0gPSBbdGhpcy5faGFuZGxlcnNbaGFuZGxlck5hbWVdXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9oYW5kbGVyc1toYW5kbGVyTmFtZV0ucHVzaChoYW5kbGVyRm4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoYW5kbGVyTmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gICAgICovXG4gICAgZW1pdCAoaGFuZGxlck5hbWUsIHBheWxvYWQ9e30pIHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuX2hhbmRsZXJzW2hhbmRsZXJOYW1lXTtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhhbmRsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcltpXShwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIocGF5bG9hZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYGhhbmRsZXJgIHNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiBBcnJheSBvciBGdW5jdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
