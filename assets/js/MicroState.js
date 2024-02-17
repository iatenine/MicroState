/**
 * MicroState
 * A state container to render HTML strings returned by components,
 * injected into a DOM element provided upon instantiation.
 */

/**
 * Palau
 * Optional class to act as a state container for MicroState
 */

class Palau {
  constructor() {}

  getPageState(key = null) {}

  setPageState(state = null) {}

  putPageState(newState = {}) {}

  // permit users to subscribe callbacks outside of Palau to fire
  subscribeToPageState(callback, keys = []) {}
}

/**
 * Nauru
 * Helper class for MicroState to manage event listeners between renders
 */
class Nauru {
  static count = 0;
  static events = [];

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
  static useListener(newEvents) {
    Nauru.events.push(newEvents);
    return `data-nauru=${Nauru.count++}`;
  }
}

class MicroState {
  /**
   * inject mountpoint with result of root function
   * root function, and its children, should follow
   * the structure of (state: object, prevState: object) => string.
   * Expects mountPointID to be "root" if not specified
   * @param {{
   * rootComponent: (contextObject: {
   *  state: object,
   *  prevState: object,
   *  props: object
   * }) => string,
   * state?: object,
   * mountPoint?: HTMLElement}} Config
   */
  constructor({ rootComponent, state = {}, mountPoint = null }) {
    if (!mountPoint && !document.querySelector("#root"))
      throw new Error(
        "DOM must contain element with id of root or mountPoint must be provided"
      );
    if (!rootComponent) throw new Error("rootComponent is required");
    this.setState(state);
    this.root = rootComponent;
    this.onAfterRender = () => {};
    this.onBeforeRender = () => {};
    this.mountPoint = mountPoint || document.querySelector("#root");
    this._render();
  }
  /**
   * Return state object if no key is provided or
   * state[key] if it is
   * @param {string} key
   * @returns {object}
   */
  getState(key = null) {
    return key !== null ? this.state[key] : this.state;
  }
  /**
   * overwrites state with provided object.
   * If only looking to update one key, consider putState()
   * @param {object} state
   */
  setState(state) {
    const prevState = { ...this.state };
    this.state = MicroState.escapeHTML(state);
    this._render(prevState);
  }
  /**
   * Updates keys specified in provided newState object with new values
   * @param {object} newState
   */
  putState(newState = {}) {
    try {
      this.setState({
        ...this.state,
        ...newState,
      });
    } catch (error) {
      const errorObject = {
        message: error.message,
        stack: error.stack,
        state: this.state,
        newState,
      };
      throw new Error("Failed to update state: ", errorObject);
    }
  }
  /**
   * Set callback to occur before updating mount point's innerHTML
   * @param {Function} callback
   */
  setOnBeforeRender(callback) {
    this.onBeforeRender = callback;
    this._render(this.state);
  }
  /**
   * Set callback to occur after updating mount point's innerHTML
   * @param {Function} callback
   */
  setOnAfterRender(callback) {
    this.onAfterRender = callback;
    this._render(this.state);
  }

  /**
   * private function, do not invoke directly
   * @param {string} mountPointId
   */
  _mount(mountPointId) {
    this.mountPoint = document.getElementById(mountPointId);
    this._render();
  }
  /**
   * private function, do not invoke directly
   * @param {object} prevState
   * @returns {void}
   */
  _render(prevState) {
    if (!this.root || !this.mountPoint) return;
    this.onBeforeRender(this.state, prevState);
    const rootString = this.root({ state: this.state, prevState, props: {} });
    const str = this._evaluateString(rootString, this.state, prevState);
    this.mountPoint.innerHTML = str;
    // use Nauru to add listeners
    MicroState._attachListeners();
    this.onAfterRender(this.state, prevState);
  }

  /**
   * private function, do not invoke directly
   * @param {string} string
   * @param {object} state
   * @param {object} prevState
   * @returns {string} HTML string
   */
  _evaluateString(string, state, prevState) {
    const regex = /<[A-Z]\w*.*?\/>/;
    // base case, return string if regex doesn't match anything
    if (!string.match(regex)) return string;
    // otherwise, get the first match and evaluate it
    const match = string.match(regex)[0];
    const componentName = match.match(/\w+/g)[0];
    const props = match.match(/\w+={[^}]*}+/)
      ? this._buildObjectFromAttributes(match)
      : {};
    const executionString = `${componentName}({
      state: ${JSON.stringify(state)}, 
      prevState: ${JSON.stringify(prevState)},
      ...${JSON.stringify(props)}
      })`;
    const replacementString = eval(executionString);
    const trimOuter = /<([A-z]*)[^>]*>(\s|.)*?<\/(\1)>/g;
    return this._evaluateString(
      string.replace(regex, replacementString),
      state,
      prevState
    )
      .match(trimOuter)
      .join("");
  }

  /**
   * private function, do not invoke directly
   * @param {string} string
   * @returns
   */
  _buildObjectFromAttributes(string) {
    // expect component to have the following form <ComponentName key1={value1} key2={value2} />
    const regex = /\w+={[^}]*}/g;
    const attributes = string.match(regex);
    const result = {};
    if (!attributes) return result;
    attributes.forEach((attr) => {
      const [key, value] = attr.split(/\s*=\s*/);
      result[key] = value.slice(1, -1); // remove curly braces
    });
    return result;
  }

  /**
   * Accepts state object and recursively escapes all values
   * with type of string of HTML characters.
   * @param {string} state
   * @returns {object}
   */
  static escapeHTML(state) {
    // recursively escapeHTML of all strings in state
    const keys = Object.keys(state);
    for (const key of keys) {
      const value = state[key];
      if (typeof value === "object" || typeof value === "array") {
        state[key] = MicroState.escapeHTML(value);
      }
      if (typeof value === "string") {
        state[key] = MicroState.sanitizeHTML(value);
      }
    }
    return state;
  }

  /**
   * Accepts a string and escapes all HTML characters
   * @param {string} unsafe
   * @returns {string}
   */
  static sanitizeHTML(unsafe) {
    return unsafe
      .replace(/&(?!(amp;|lt;|gt;|#39;|quot;))/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/'/g, "&#39;")
      .replace(/"/g, "&quot;");
  }

  /**
   * @param {{name: string, callback: () => any}[]} newEvents
   * @returns {string} tag
   * @deprecated
   * Kept for reverse-compatibility.
   * Use Nauru.useListener instead
   */
  static useListener(newEvents) {
    Nauru.events.push(newEvents);
    return `data-nauru=${Nauru.count++}`;
  }

  /**
   * private function, do not invoke directly
   * @returns {void}
   */
  static _attachListeners() {
    const elements = document.querySelectorAll(`[data-nauru]`);
    elements.forEach((element) => {
      const id = element.dataset.nauru;
      const events = Nauru.events[id];
      events.forEach((event) => {
        element.addEventListener(event.name, event.callback);
      });
    });
  }
}
