## MicroState

A UI component library with JSX-like syntax designed to be self-contained and injectable into existing webpages. This enables modern client-side features like reusable components, prop passing and state updates without requiring a full SPA migration.

- [MicroState](#microstate)
- [Installation](#installation)
- [Rules](#rules)
  - [Rules for Creating Components](#rules-for-creating-components)
  - [Rules for Passing Props](#rules-for-passing-props)
- [Components](#components)
  - [Basic (Stateless) Components](#basic-stateless-components)
  - [Stateful Components](#stateful-components)
- [Injecting Components](#injecting-components)
  - [Palau](#palau)
  - [Manual Injection](#manual-injection)
- [State and Lifecycle](#state-and-lifecycle)
- [Event Listeners](#event-listeners)

## Installation

Add a copy of [MicroState.js](https://github.com/iatenine/MicroState/blob/main/assets/js/MicroState.js) to your project to enable it.

## Rules

This section is provided as a reference for later and may not yet make sense, if you're looking to get started, skip to the [Components](#components) section

### Rules for Creating Components

- Component should be callbacks returning strings saved to a variable in PascalCase
- HTML elements in the returned string are lowercase
- All nested components are wrapped in **self-closing** tags and share the name of the variable they're saved to (i.e. `<Foo />` for a component saved to `Foo`).
- All HTML tags opened in a string are closed

### Rules for Passing Props

- must be handled by the receiving component, even if they share a name with an HTML attribute
- should be passed similar to how they are in React functional components (`<Component propName={value} />`)
- have a structure of `propName={<value>}`
- cannot be named `state` or `prevState`
- component will receive the key-value pair of `propName: <value>` added to the object of its first parameter
- values will be stringified
- values will have HTML special characters escaped to prevent XSS attacks

## Components

All MicroState components are callbacks returning strings with a structure designed to be familiar to React developers.

### Basic (Stateless) Components

To create our first component named `Foo` simply add:

```javascript
const Foo = () => `<div>Hello, I'm an example component</div>`;
```

By abiding by the first 2 [rules of creating components](#rules-for-creating-components), we enable other components to nest `<Foo />`:

```javascript
const Bar = () => `<body>
  <Foo />
</body>`;
```

`<Bar />` is now also a component and was able to utilize `<Foo />` by following [the third rule](#rules-for-creating-components) (MicroState components do not accept child nodes as props). When rendered, `Bar()` will return

```javascript
`<body>
  <div>Hello, I'm an example component</div>
</body>`
```

While the final rule (close all tags that are opened) simplifies tracking down errors. However, it's worth mentioning an opening tag does not need to be the parent of the entire component:

```javascript
// Acceptable
const SiblingExample = () => `
  <div>Hello!</div>
  <div>Goodbye!</div>`;

// Will not render text node
const OrphanedComponent = () => `<div />All alone`;
```

Great! But not particularly useful.

Let's add some state to our component to add reusability and separate concerns:

### Stateful Components

All components managed by a MicroState object (or [Palau](#palau)) should adhere to the following structure:

```javascript
({
  state: object,
  prevState: object | undefined,
  ...props: object
}) => string
```

Since our components so far have been stateless and utilize no props, parameters were ignored but consider these components:

```javascript
const Button = ({ el }) => {
  const id = el.replace(/[^\w]/g, "_"); // protects against generating invalid IDs
  return `<div id=${id}>${el} <button id='remove-${el}'>X</button></div>`;
};

const ListItem = ({ state }) => {
  return `${
    state.list.length === 0
      ? `No items`
      : state.list.map((el) => `<Button el={${el}} />`)
  }`;
};
```

We'll assume `<ListItem />` has been injected to the DOM with an initial state of `{list: ['eggs', 'milk']}` (details on how to do that [below](#injecting-components)).

Note how `<ListItem />` destructures the object for `state` and is able to map through its values, passing each one as a prop to `<Button />`. It can also read `prevState` on each render:

```javascript
const ListItem = ({ state, prevState }) => {
  // prevState will be undefined first render and therefore not an update
  if (prevState) console.log("updating list!");
  return `${
    state.list.length === 0
      ? `No items`
      : state.list.map((el) => `<Button el={${el}} />`)
  }`;
};
```

Careful not to confuse the curly braces `el={<some-value>}` used to wrap prop values with the string interpolation braces `${<variable-name>}`.

The state and prevState objects are identical between the root and its nested components (details in the next section) so every `<Button />` would render identically without the `el` prop.

```javascript
const Button = ({ el }) => {
  const id = el.replace(/[^\w]/g, "_"); // protects against generating invalid IDs
  return `<div id=${id}>${el} <button id='remove-${el}'>X</button></div>`;
};
```

For more details, review the [Rules for Passing Props](#rules-for-passing-props) section

## Injecting Components

Once your components are defined, there are 2 methods for component injection: [Palau](#palau) or [manual injection](#manual-injection). Generally, the Palau state management tool is recommended but manual injection can be used by those who need more granular control.

### Palau

Palau is a state management tool included with MicroState that centralizes state, automatically injecting and updating components using a pub/sub pattern. This should eliminate the need to call `new MicroState()` directly and is constructed with the following structure:

```javascript
new Palau({
  pageState: object,
  components: [
    {
      rootComponent: ({ state, prevState }) => string,
      mountPoint: HTMLElement,
      listens: string[]
    }
  ]
});
```

**_Note:_** Palau should only be constructed once, then interacted exclusively with via the `Palau.getPageState()` and `Palau.putPageState()` methods.

Given an application with components of `<Input />` and `<ListContainer />` which needs to update and display a `list` array respecitvely, we can inject them as follows:

```javascript
new Palau({
  pageState: {
    title: "Palau Example"
    list: []
  },
  components: [{
    rootComponent: ListContainer,
    mountPoint: document.querySelector("#list-container"),
    listens: ['list']
  },
  {
    rootComponent: Input,
    mountPoint: document.querySelector("#input-container")
  }]
})
```

Note the `listens` array on `<ListContainer />`, this tells Palau to provide a copy of that key from the pageState to the component's state and rerender it only when it changes.

Since nothing listens to `title`, it can be updated without triggering a rerender of any component.

Despite not having list passed to its state, `<Input />` can read and update pageState by calling `Palau.getPageState()` and `Palau.putPageState()` as follows:

```javascript
const PalauInput = () => {
  const currentListState = Palau.getPageState("list");
  // More on Nauru and adding listeners within components later
  const tag = Nauru.useListener([
    {
      name: "keypress",
      callback: (event) => {
        if (!/enter/i.test(event.key)) return;
        Palau.putPageState({
          list: [...currentListState, event.target.value],
        });
        event.target.value = "";
      },
    },
  ]);
  return `<input ${tag} placeholder='Enter a new value and press enter' />`;
};
```

Note that all Palau and Nauru methods are static and therefore do not need to be instantiated or passed as props.

### Manual Injection

**_Note:_** Manual injection also means manually coordinating state changes between components. Please read the section on [state and lifecycle](#state-and-lifecycle) for more information or consider using [Palau](#palau) instead

Components can be manually injected by calling the MicroState constructor as follows:

```javascript
new MicroState({
  rootComponent: Foo
  mountPoint: document.querySelector("#root")
});
```

This will use the mountPoint provided and render the `Foo` callback from earlier. By default, it receives an empty state object. To instantiate the state as `{ready: false}` instead run

```javascript
const microState = new MicroState({
  rootComponent: Foo,
  state: { ready: false },
  mountPoint: document.querySelector("#root"),
});
```

saving the resulting object to the variable is important if you later need to invoke the `getState()`, `setState()` or `putState()` methods. Updating an object passed to the constructor (even by reference), will not trigger a rerender

## State and Lifecycle

This section may be skipped if using [Palau](#palau) and [Nauru](#event-listeners) as they handle state and lifecycle automatically

_A distinction will be made in this section between the MicroState object instantiated and returned by `new MicroState()` and the components it injects/rerenders to the DOM. Though the terms are largely interchangeable, it's important to understand the difference here._

When working with state it's important to understand state belongs to the instantiated object, not its components, therefore every state change will rerender the root and all of its children, causing focus and event listeners to be lost.

Losing focus is overcome by separating components listening to state from those that update it (further details in [Injecting Components](#injecting-components)). Details on adding event listeners properly found [here](#event-listeners)

For this reason, it's not recommended to build SPAs with a single object as an entrypoint as one would with tools like React but rather inject multiple objects as needed in areas that share the smallest amount of state possible (hence the name "MicroState").

Coordinating state between components can be handled automatically by [Palau](#palau).

**_Note:_** MicroState objects created manually without state or via Palau with empty/no `listens` array will never rerender

## Event Listeners

If you would like to add an event listener directly inside a component, use the static method `Nauru.useListener()` as follows to prevent them from being removed by state updates:

```javascript
const Button = ({ el, index }) => {
  const id = el.replace(/[^\w]/g, "_");

  // the tag returned will have a unique identifier in the form of "data-nauru=<number>"
  // add the tag directly to the attribute lists of any element you'd like targeted
  const tag = Nauru.useListener([
    {
      name: "click",
      callback: (event) => {
        const id = parseInt(event.target.dataset.listId);
        const list = Palau.getPageState("list");
        const filteredList = list.filter((_, index) => index !== id);
        Palau.putPageState({ list: filteredList });
      },
    },
    {
      name: "mouseover",
      callback: (event) => {
        event.target.style.cursor = "crosshair"; // multiple events can be attached to the same element
      },
    },
  ]);

  return `
    <div>
      ${el}
      <button data-list-id=${index} ${tag}>
        X
      </button>
    </div>`;
};
```

`Nauru.useListener()` expects its first argument to be an array of objects structured as `{name: string, callback: event => void}` with each name representing an event and the event callback structured as it would be in `addEventListener()`.

The method will return a "tag" that must be added to the HTML attributes of the element(s) to receive the event listener(s). as seen here:

```javascript
`<button data-list-id=${index} ${tag}>`;
```

**_Note:_** The tag is an HTML attribute, not a prop and therefore cannot be passed to a nested component except as the value of a prop

`setOnAfterRender()` and `setOnBeforeRender()` will be converted to private methods in a future version
~~It's also possible to use `setOnAfterRender()` to manually attach listeners to elements once rendered but `Nauru.useListener()` frees developers to be less concerned with the MicroState lifecycle~~

~~`setOnBeforeRender()` is also provided for convenience but would not be useful for adding event listeners~~
