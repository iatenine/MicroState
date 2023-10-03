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

//optional: Do something before rerenders trigger
// stateHandler.setOnBeforeRender((prevState, state) => {
//   console.log("state is updated but hasn't yet rendered");
// });

// // optional: this is where you'd add event listeners
stateHandler.setOnAfterRender(() => {
  // Enter example
  document.querySelector("#input").onkeypress = function (e) {
    if (!/enter/i.test(e.key)) return;
    stateHandler.putState({
      list: [...stateHandler.getState("list"), e.target.value],
    });
    e.target.value = "";
  };
  // Dynamic event listener example
  const list = stateHandler.getState("list");
  list.forEach((elem) => {
    const removeButton = document.querySelector(
      `#remove-${elem.replace(/[^\w]/g, "_")}`
    );
    removeButton.onclick = () => {
      const filteredList = list.filter((e) => e !== elem);
      stateHandler.putState({ list: filteredList });
    };
  });
});
