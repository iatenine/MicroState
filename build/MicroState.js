"use strict";

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Tuvalu
 * A state container to render HTML strings returned by components,
 * injected into a DOM element provided upon instantiation. Manual instantiation
 * is not required, consider using Palau instead
 */
var Tuvalu = /*#__PURE__*/function () {
  /**
   * @param {{
   * rootComponent: (contextObject: {
   *  state: object,
   *  prevState: object | null,
   *  useListener: (event: Event) => any,
   *  props: object,
   * }) => string,
   * state?: object,
   * mountPoint?: HTMLElement
   * definitions?: object
   * }} Config
   */
  function Tuvalu(_ref) {
    var rootComponent = _ref.rootComponent,
      _ref$state = _ref.state,
      state = _ref$state === void 0 ? {} : _ref$state,
      _ref$mountPoint = _ref.mountPoint,
      mountPoint = _ref$mountPoint === void 0 ? null : _ref$mountPoint,
      _ref$definitions = _ref.definitions,
      definitions = _ref$definitions === void 0 ? {} : _ref$definitions;
    _classCallCheck(this, Tuvalu);
    if (!mountPoint) throw new Error("mountPoint must be provided");
    if (!rootComponent) throw new Error("rootComponent is required");
    if (typeof rootComponent !== "string" && typeof rootComponent !== "function" && !definitions[rootComponent]) {
      throw new Error("rootComponent must be a function or name of a component in definitions");
    }
    this.definitions = definitions;
    this._setState(state);
    this.root = typeof rootComponent === "string" ? definitions[rootComponent] : rootComponent;
    this.onAfterRender = function () {};
    this.onBeforeRender = function () {};
    this.mountPoint = mountPoint;
    this._render();
  }
  /**
   * Return state object if no key is provided or
   * state[key] if it is
   * @param {string} key
   * @returns {object}
   */
  _createClass(Tuvalu, [{
    key: "_getState",
    value: function _getState() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return key !== null ? this.state[key] : this.state;
    }
    /**
     * overwrites state with provided object.
     * If only looking to update one key, consider putState()
     * @param {object} state
     */
  }, {
    key: "_setState",
    value: function _setState(state) {
      var prevState = _objectSpread({}, this.state);
      this.state = Tuvalu.escapeHTML(state);
      this._render(prevState);
    }
    /**
     * Updates keys specified in provided newState object with new values
     * @param {object} newState
     */
  }, {
    key: "putState",
    value: function putState() {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      try {
        this._setState(_objectSpread(_objectSpread({}, this.state), newState));
      } catch (error) {
        var errorObject = {
          message: error.message,
          stack: error.stack,
          state: this.state,
          newState: newState
        };
        throw new Error("Failed to update state: ", errorObject);
      }
    }
    /**
     * private function, do not invoke directly
     * Set callback to occur before updating mount point's innerHTML
     * @param {Function} callback
     */
  }, {
    key: "_setOnBeforeRender",
    value: function _setOnBeforeRender(callback) {
      this.onBeforeRender = callback;
      this._render(this.state);
    }
    /**
     * private function, do not invoke directly
     * Set callback to occur after updating mount point's innerHTML
     * @param {Function} callback
     */
  }, {
    key: "_setOnAfterRender",
    value: function _setOnAfterRender(callback) {
      this.onAfterRender = callback;
      this._render(this.state);
    }

    /**
     * private function, do not invoke directly
     * @param {string} mountPointId
     */
  }, {
    key: "_mount",
    value: function _mount(mountPointId) {
      this.mountPoint = document.getElementById(mountPointId);
      this._render();
    }
    /**
     * private function, do not invoke directly
     * @param {object} prevState
     * @returns {void}
     */
  }, {
    key: "_render",
    value: function _render(prevState) {
      if (!this.root || !this.mountPoint) return;
      this.onBeforeRender(this.state, prevState);
      var rootString = this.root({
        state: this.state,
        prevState: prevState,
        props: {}
      });
      var str = this._evaluateString(rootString, this.state, prevState);
      this.mountPoint.innerHTML = str;
      // use Nauru to add listeners
      Nauru._attachListeners();
      this.onAfterRender(this.state, prevState);
    }

    /**
     * private function, do not invoke directly
     * @param {string} string
     * @param {object} state
     * @param {object} prevState
     * @returns {string} HTML string
     */
  }, {
    key: "_evaluateString",
    value: function _evaluateString(string, state, prevState) {
      var regex = /<[A-Z]\w*[\s\S]*?\/>/;
      // base case, return string if regex doesn't match anything
      if (!string.match(regex)) return string;
      // otherwise, get the first match and evaluate it
      var match = string.match(regex)[0];
      var componentName = match.match(/\w+/gm)[0];
      var props = match.match(/\w+={[^}]*}+/) ? this._buildObjectFromAttributes(match) : {};
      var replacementString = this !== null && this !== void 0 && this.definitions[componentName] ? this.definitions[componentName](props) : eval(componentName)(_objectSpread({
        state: state,
        prevState: prevState
      }, props));
      var trimOuter = /<([A-z]*)[^>]*>(\s|.)*?<\/(\1)>/g;
      return this._evaluateString(string.replace(regex, replacementString), state, prevState).match(trimOuter).join("");
    }

    /**
     * private function, do not invoke directly
     * @param {string} string
     * @returns
     */
  }, {
    key: "_buildObjectFromAttributes",
    value: function _buildObjectFromAttributes(string) {
      // expect component to have the following form <ComponentName key1={value1} key2={value2} />
      var regex = /\w+={.*?}(?=[^}])/g;
      var attributes = string.match(regex);
      var result = {};
      if (!attributes) return result;
      attributes.forEach(function (attr) {
        var _attr$split = attr.split(/\s*=\s*/),
          _attr$split2 = _slicedToArray(_attr$split, 2),
          key = _attr$split2[0],
          value = _attr$split2[1];
        var v = value.slice(1, -1);
        try {
          var nonString = JSON.parse(v);
          result[key] = nonString;
        } catch (error) {
          result[key] = v;
        }
      });
      return result;
    }

    /**
     * Accepts state object and recursively escapes all values
     * with type of string of HTML characters.
     * @param {string} state
     * @returns {object}
     */
  }], [{
    key: "escapeHTML",
    value: function escapeHTML(state) {
      // recursively escapeHTML of all strings in state
      var keys = Object.keys(state);
      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        var value = state[key];
        if (!value) continue;
        if (_typeof(value) === "object" || typeof value === "array") {
          state[key] = Tuvalu.escapeHTML(value);
        }
        if (typeof value === "string") {
          state[key] = Tuvalu.sanitizeHTML(value);
        }
      }
      return state;
    }

    /**
     * Accepts a string and escapes all HTML characters
     * @param {string} unsafe
     * @returns {string}
     */
  }, {
    key: "sanitizeHTML",
    value: function sanitizeHTML(unsafe) {
      return unsafe.replace(/&(?!(amp;|lt;|gt;|#39;|quot;))/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    }
  }]);
  return Tuvalu;
}();
/**
 * Palau
 * Singleton class to manage page state and Tuvalu component injection
 * Components passed in Constructor will be rendered automatically
 * and only updated when pageState keys found in their listen array
 * are updated
 * @dependency Tuvalu
 */
var Palau = /*#__PURE__*/function () {
  function Palau() {
    _classCallCheck(this, Palau);
  }
  _createClass(Palau, null, [{
    key: "init",
    value:
    /**
     * initialize page state and mount/subscribe components.
     * Component states will be derived from the pageState object
     * and only include keys found in their listen array
     * @param {{
     * pageState: object,
     * components: {
     * rootComponent: TuvaluComponent,
     * mountPoint: HTMLElement,
     * listens?: string[],
     * definitions?: object
     * }[]
     * }} pageState
     */
    function init(_ref2) {
      var _ref2$pageState = _ref2.pageState,
        pageState = _ref2$pageState === void 0 ? {} : _ref2$pageState,
        _ref2$components = _ref2.components,
        components = _ref2$components === void 0 ? [] : _ref2$components;
      if (Palau.instantiated) {
        throw new Error("Palau has already been instantiated. Use Palau.putPageState() to manage state");
      }
      if (pageState !== Object(pageState)) {
        throw new Error("pageState must be an object if specified");
      }
      if (!Array.isArray(components)) {
        throw new Error("components must be an array");
      }
      components.forEach(function (component) {
        if (!component.rootComponent || !component.mountPoint) {
          throw new Error("Invalid component configuration: mountPoint and root are required in each component");
        }
      });
      Palau.pageState = pageState;
      components.forEach(function (component, index) {
        if (!component.listens) component.listens = [];
        if (component.listens.includes('*')) component.listens = Object.keys(pageState);
        component.listens.forEach(function (listen) {
          if (!Palau.subcribedEvents[listen]) {
            Palau.subcribedEvents[listen] = [];
          }
          Palau.subcribedEvents[listen].push(index);
        });
        var newState = Palau.__listenerStringsToObject(component.listens);
        component.state = _objectSpread({}, newState);
        Palau.components.push({
          component: new Tuvalu(component),
          listens: component.listens
        });
      });
      Palau.instantiated = true;
    }

    /**
     * Return pageState object, or specific key if provided
     * keys can specify nested values such as "list[0].name"
     * @param {string} key?
     * @returns
     */
  }, {
    key: "getPageState",
    value: function getPageState() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (key === null || typeof key !== "string") return Palau.pageState;
      var executionString = Palau.__convertKeyToExecutionString(key);
      return eval(executionString);
    }

    /**
     * update state of keys present in newState object
     * and re-render subscribed components. Unlisted keys
     * will not be updated
     * @param {object} newState
     * @returns
     */
  }, {
    key: "putPageState",
    value: function putPageState() {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (newState === null) {
        console.warn("putPageState called with null value. Ignoring.");
        return;
      }
      var impactedKeys = Object.keys(newState);
      // Prevent unnecessary re-renders
      impactedKeys.forEach(function (key) {
        if (Palau.pageState[key] === newState[key]) {
          impactedKeys.splice(impactedKeys.indexOf(key), 1);
          delete newState[key];
        }
      });
      try {
        Palau.__setPageState(_objectSpread(_objectSpread({}, Palau.pageState), newState));
        var subscribedIndices = [];
        impactedKeys.forEach(function (key) {
          var indices = Palau.subcribedEvents[key] || [];
          indices.forEach(function (index) {
            if (subscribedIndices.includes(index)) return;
            subscribedIndices.push(index);
          });
        });
        subscribedIndices.forEach(function (index) {
          var newState = Palau.__listenerStringsToObject(Palau.components[index].listens);
          Palau.components[index].component._setState(newState);
        });
      } catch (error) {
        var errorObject = {
          message: error.message,
          stack: error.stack,
          pageState: Palau.pageState,
          newState: newState
        };
        console.error(errorObject);
        throw new Error("Failed to update pageState: " + errorObject.message);
      }
    }

    /**
     * alias of putPageState
     * @param {object} newState
     * @returns
     */
  }, {
    key: "update",
    value: function update() {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return Palau.putPageState(newState);
    }

    /**
     * private function, do not invoke directly
     * update pageState with new state object. This is a destructive operation
     * that will not trigger a re-render of the component. Use putPageState()
     * instead when possible.
     * @param {object} state
     * @returns
     */
  }, {
    key: "__setPageState",
    value: function __setPageState() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (state === null) {
        console.warn("setPageState called with null value. Ignoring.");
        return;
      }
      if (_typeof(state) !== "object") {
        throw new Error("setPageState requires an object");
      }
      dispatchEvent(new Event("updatePalauState:", {
        prevState: Palau.pageState,
        state: state
      }));
      Palau.pageState = state;
    }

    /**
     * private function, do not invoke directly
     * Provided a string, returns a string that can be evaluated to access the
     * value of the key in the pageState object. If excludePageState is true,
     * the string will be returned without the pageState prefix. Example:
     * "list[0].name" => "Palau.pageState['list'][0]['name']"
     * @param {string} key
     * @param {boolean} excludePageState
     * @returns {string}
     */
  }, {
    key: "__convertKeyToExecutionString",
    value: function __convertKeyToExecutionString(key) {
      var excludePageState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var indices = key.match(/[\d+]/g);
      var keys = key.split(".").map(function (item) {
        return item.split(/[\d+]/);
      }).flat();
      var combine = keys.map(function (item) {
        if (item === "]") return parseInt(indices.pop());
        if (item.endsWith("[")) return item.slice(0, -1);
        return item;
      });
      var joined = combine.map(function (item) {
        return typeof item === "string" ? '["' + item + '"]' : "[" + item + "]";
      }).join("");
      return excludePageState ? "".concat(joined) : "Palau.pageState".concat(joined);
    }

    /**
     * private function, do not invoke directly
     * Provided an array of strings, returns an object with matching keys,
     * populating the values with the current state of the page. Until nested
     * listeners are supported, only Object.keys() is needed for the inverse
     * @param {string[]} strings
     * @returns {object}
     */
  }, {
    key: "__listenerStringsToObject",
    value: function __listenerStringsToObject(strings) {
      var result = {};
      var uniqueStrings = _toConsumableArray(new Set(strings));
      uniqueStrings.forEach(function (string) {
        var executionString = Palau.__convertKeyToExecutionString(string, true);
        var key = executionString.replace("]", "").replace("[", "").replace(/"/g, "");
        result[key] = eval("Palau.pageState".concat(executionString));
      });
      return result;
    }
  }]);
  return Palau;
}();
/**
 * Nauru
 * Helper class to manage event listeners between renders
 */
_defineProperty(Palau, "pageState", {});
_defineProperty(Palau, "components", []);
_defineProperty(Palau, "subcribedEvents", {});
_defineProperty(Palau, "instantiated", false);
var Nauru = /*#__PURE__*/function () {
  function Nauru() {
    _classCallCheck(this, Nauru);
  }
  _createClass(Nauru, null, [{
    key: "useListener",
    value:
    /**
     * Accepts an array of objects with the following structure:
     * {
     *  callback: (e) => any,
     * name: string,
     * }
     * and returns a string to be used as a tag in the component's HTML
     * example: <button ${tag}>Click Me!</button>
     * @param {{name: string, callback: () => any}[]} newEvents
     * @returns {string} tag
     */
    function useListener(newEvents) {
      Nauru.events.push(newEvents);
      return "data-nauru=".concat(Nauru.count++);
    }
  }, {
    key: "_attachListeners",
    value: function _attachListeners() {
      var elements = document.querySelectorAll("[data-nauru]");
      elements.forEach(function (element) {
        var id = element.dataset.nauru;
        var events = Nauru.events[id];
        events.forEach(function (event) {
          element.addEventListener(event.name, event.callback);
        });
      });
    }
  }]);
  return Nauru;
}();
/**
 * MicroState
 * A subclass of Tuvalu created to ensure backwards compatibility
 * Not recommended to use in new projects. Refer to documentation for
 * current best practices
 */
_defineProperty(Nauru, "count", 0);
_defineProperty(Nauru, "events", []);
var MicroState = /*#__PURE__*/function (_Tuvalu) {
  _inherits(MicroState, _Tuvalu);
  function MicroState(_ref3) {
    var rootComponent = _ref3.rootComponent,
      _ref3$state = _ref3.state,
      state = _ref3$state === void 0 ? {} : _ref3$state,
      _ref3$mountPoint = _ref3.mountPoint,
      mountPoint = _ref3$mountPoint === void 0 ? null : _ref3$mountPoint;
    _classCallCheck(this, MicroState);
    if (!mountPoint) mountPoint = document.querySelector("#root");
    return _callSuper(this, MicroState, [{
      rootComponent: rootComponent,
      state: state,
      mountPoint: mountPoint
    }]);
  }
  _createClass(MicroState, [{
    key: "getState",
    value: function getState() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return this._getState(key);
    }
  }, {
    key: "setState",
    value: function setState(state) {
      this._setState(state);
    }
  }]);
  return MicroState;
}(Tuvalu);