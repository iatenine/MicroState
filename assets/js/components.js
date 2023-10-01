//example components

// Button is only concerned with props, not state
const Button = ({ props }) => {
  const id = props.el.replace(/[^\w]/g, "_");
  return `<div id=${id}>${props.el} <button id='remove-${props.el}'>X</button></div>`;
};

// ListItem is only concerned with state, not props
// but it provides props dynamically to Button
const ListItem = ({ state }) => {
  return `${
    state.list.length === 0
      ? `No items`
      : state.list.map((el) => `<Button el={${el}} />`).join("") // you can be selective on what state to be passed to children
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
const Input = ({ state }) =>
  `<input id='input' style="${state.style}" placeholder='Enter a new value and press enter' />`;
