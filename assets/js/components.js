//example components

// Button is only concerned with props, not state
const Button = ({ el, index }) => {
  const tag = Nauru.useListener([
    {
      name: "click",
      callback: (event) => {
        const id = parseInt(event.target.dataset.listId);
        const list = stateHandler.getState("list");
        const filteredList = list.filter((_, index) => index !== id);
        stateHandler.putState({ list: filteredList });
      },
    },
    {
      name: "mouseover",
      callback: (event) => {
        event.target.style.cursor = "crosshair"; // multiple events can be attached to the same element
      },
    },
  ]);
  return `<div>${el}<button data-list-id=${index} ${tag}>X</button></div> `;
};

// ListItem is only concerned with state, not props
// but it provides props dynamically to Button
const ListItem = ({ state }) => {
  // you can be selective on what state to be passed to children
  // concluding a map returning component strings with .join("") is no longer necessary
  return `${
    state.list.length === 0
      ? `No items`
      : state.list.map((el, index) => {
          return `<Button el={${el}} index={${index}} />`;
        })
  }`;
};

// You do not need to accpet state or props as arguments, even if the child components need them
// <ListItem /> could have also been expressed as:
// ${ListItem({ state })} but you will be the component would need to accept the state as an argument
const ListContainer = () => `
<div>
  <ListItem />  
</div>
`;

// If a component returns a string with no components, it will be evaluated as HTML
// strings in state object should be sanitized before being passed to components
const PalauInput = ({ palau }) => {
  const tag = Nauru.useListener([
    {
      name: "keypress",
      callback: (event) => {
        if (!/enter/i.test(event.key)) return;
        palau.putState({
          list: [...palau.getState("list"), event.target.value],
        });
        event.target.value = "";
      },
    },
  ]);
  return `<input ${tag} id="palau-input" style="width:18rem" placeholder='Enter a new value and press enter' />`;
};

const PalauButton = ({ el, index, palau }) => {
  const tag = Nauru.useListener([
    {
      name: "click",
      callback: (event) => {
        const id = parseInt(event.target.dataset.listId);
        const list = palau.getPageState("list");
        const filteredList = list.filter((_, index) => index !== id);
        palau.putPageState({ list: filteredList });
      },
    },
    {
      name: "mouseover",
      callback: (event) => {
        event.target.style.cursor = "crosshair"; // multiple events can be attached to the same element
      },
    },
  ]);
  return `<div>${el}<button data-list-id=${index} ${tag}>X</button></div> `;
};

// ListItem is only concerned with state, not props
// but it provides props dynamically to Button
const PalauListItem = ({ state }) => {
  // you can be selective on what state to be passed to children
  // concluding a map returning component strings with .join("") is no longer necessary
  return `${
    state.list.length === 0
      ? `No items`
      : state.list.map((el, index) => {
          return `<PalauButton el={${el}} index={${index}} />`;
        })
  }`;
};

// You do not need to accpet state or props as arguments, even if the child components need them
// <ListItem /> could have also been expressed as:
// ${ListItem({ state })} but you will be the component would need to accept the state as an argument
const PalauListContainer = () => `
<div id="palau-list-container">
  <PalauListItem />  
</div>
`;

// If a component returns a string with no components, it will be evaluated as HTML
// strings in state object should be sanitized before being passed to components
const Input = () => {
  const tag = Nauru.useListener([
    {
      name: "keypress",
      callback: (event) => {
        if (!/enter/i.test(event.key)) return;
        stateHandler.putState({
          list: [...stateHandler.getState("list"), event.target.value],
        });
        event.target.value = "";
      },
    },
  ]);
  return `<input ${tag} style="width:18rem" placeholder='Enter a new value and press enter' />`;
};
