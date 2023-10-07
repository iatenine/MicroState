// create MicroState (renders automatically)
const stateHandler = new MicroState({
  rootComponent: ListContainer,
  state: {
    list: [],
  },
});

// use separate MicroStates for inputs and displays
// to prevent rerenders causing user to lose focus
new MicroState({
  rootComponent: Input,
  mountPoint: document.querySelector("#input-root"),
  // stateless configuration, should never rerender
});
