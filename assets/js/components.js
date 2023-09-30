//components
const button = (state) => {
  return `<div id=${state.el}>${state.el} <button id='remove-${state.el}'>X</button></div>`;
};

const listItem = (state) => {
  return `${
    state.list.length === 0
      ? `No items`
      : state.list.map((el) => `${button({ el })}`).join("") // you can be selective on what state to be passed to children
  }`;
};

const listContainer = (state) => `
<div>
    ${listItem(state)}
</div>
`;

const input = (state) =>
  `<input id='input' style="${state.style}" placeholder='Enter a new value and press enter' />`;
