/**
 * MicroState
 * inject mountpoint with result of root function
 * root function, and its children, should follow
 * the structure of (state: object) => string.
 * Expects mountPointID to be "root" if not specified
 */

class MicroState {
  constructor(root, initialState = {}, mountPointId = "root") {
    this.state = initialState;
    this.root = root;
    this.onAfterRender = () => {};
    this.onBeforeRender = () => {};
    this._mount(mountPointId);
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
    this.setState({
      ...this.state,
      ...newState,
    });
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
    const newState = this.state;
    this.onBeforeRender(newState, prevState);
    this.mountPoint.innerHTML = this.root(newState, prevState);
    this.onAfterRender(newState, prevState);
  }

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

  static sanitizeHTML(unsafe) {
    return unsafe
      .replace(/&(?!(amp;|lt;|gt;|#39;|quot;))/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/'/g, "&#39;")
      .replace(/"/g, "&quot;");
  }
}
