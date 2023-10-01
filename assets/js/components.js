//components
const Button = (state) => {
  const id = state.el.replace(/[^\w]/g, "_");
  return `<div id=${id}>${state.el} <button id='remove-${state.el}'>X</button></div>`;
};

const ListItem = (state) => {
  return `${
    state.list.length === 0
      ? `No items`
      : state.list.map((el) => `<Button el={${el}} />`).join("") // you can be selective on what state to be passed to children
  }`;
};

const componentRegex = /(?<=<)[A-Z]\w*(?=\s?\/>)/g;

const ListContainer = (state) => `
<div>
  <ListItem />
</div>
`;

const Input = (state) =>
  `<input id='input' style="${state.style}" placeholder='Enter a new value and press enter' />`;
