## MicroState

A minimal suite of tools designed to have a very low learning curve, no build step and easily inject into existing webpages, enabling modern features like reusable components, prop passing and state updates without requiring a full SPA migration.

MicroState is built on 3 primary tools:

- [Tuvalu Components](#tuvalu): Callback functions returning JSX-like strings
- [Palau](#palau): Centralized page state and component injection tool
- [Nauru](#nauru): Adds event listeners to Tuvalu components without worrying about the lifecycle

## Contents

- [MicroState](#microstate)
- [Contents](#contents)
- [Getting Started](#getting-started)
- [Tuvalu](#tuvalu)
  - [Static Components](#static-components)
  - [Dynamic Components](#dynamic-components)
- [Palau](#palau)
  - [Injecting Components](#injecting-components)
  - [Managing State](#managing-state)
- [Nauru](#nauru)
- [Reference](#reference)
  - [API](#api)
      - [Palau.init](#palauinit)
      - [Palau.getPageState](#palaugetpagestate)
      - [Palau.putPageState](#palauputpagestate)
      - [Nauru.useListener](#nauruuselistener)
  - [Rules for Creating Components](#rules-for-creating-components)
  - [Rules for Passing Props](#rules-for-passing-props)
- [Advanced Usage](#advanced-usage)
  - [State and Lifecycle](#state-and-lifecycle)
  - [Manual Injection](#manual-injection)

## Getting Started

General usage of MicroState is as follows:

1. Copy either [MicroState.min.js](https://github.com/iatenine/MicroState/blob/main/assets/build/MicroState.min.js) or the following line into your project to enable MicroState:
```
<script src="https://cdn.jsdelivr.net/gh/iatenine/MicroState@v2.1.3/build/MicroState.min.js"
integrity="sha512-X8jhYQQ0Hr8wYq08ezbCPAXbbu+0KsLP+xG+xob0A2rjYlS2WURBoCrU7QiOZsuWPH1A5foG3a2J3OPtz2DI9w=="
crossorigin="anonymous"></script>
```

2.  Create Tuvalu components
3.  Initialize Palau to inject components to their mount points and set an initial page state
4.  Use Palau.putState() anytime page state needs to be updated

## Tuvalu

All Tuvalu components are pure, and therefore stateless, functions (state management covered in the [Palau](#palau) section) returning strings with a structure designed to be familiar to JSX developers. They are called with the following structure when injected or updated:

```javascript
({
  state: object,
  prevState: object | undefined,
  ...props: object
}) => string
```

### Static Components

To create our first Tuvalu component named `Foo` simply add:

```javascript
const Foo = () => `<div>Hello, I'm an example component</div>`;
```

By saving the callback to a variable in PascalCase, we enable other components to nest `<Foo />`:

```javascript
const Bar = () => `<body>
  <Foo />
</body>`;
```

`<Bar />` is now also a component and was able to nest `<Foo />` as its name matches that of its variable and is wrapped in self-closing tags (Tuvalu components do not accept child nodes as props). When rendered, `Bar()` will return

```javascript
`<body>
  <div>Hello, I'm an example component</div>
</body>`;
```

Great! Now let's make some dynamic components using props:

### Dynamic Components

Since our components so far have utilized no props, parameters were ignored but consider the following: given a component `<ListItem />` with an initial state of `{list: ['eggs', 'milk']}` (details on how to do that [later](#injecting-components)). `<ListItem />` can destructure `state` to access and map through `list`, passing each value as a prop to `<Button />`.

```javascript
const ListItem = ({ state }) => {
  return `${
    state.list.length === 0
      ? `No items`
      : state.list.map((el) => `<Button el={${el}} />`)
  }`;
};

const Button = ({ el }) => {
  const id = el.replace(/[^\w]/g, "_"); // protects against generating invalid IDs
  return `<div id=${id}>${el} <button id='remove-${el}'>X</button></div>`;
};
```

**_Note:_** Careful not to confuse the curly braces `el={<some-value>}` used to wrap prop values with the string interpolation braces `${<variable-name>}` such as the `<Button el={${el}} />` example above.

Because components are stateless, `state` and `prevState` are identical between root and nested components with each `<Button />` only differentiated by its props:

```javascript
const Button = ({ el }) => {
  const id = el.replace(/[^\w]/g, "_"); // protects against generating invalid IDs
  return `<div id=${id}>${el} <button id='remove-${el}'>X</button></div>`;
};
```

To prevent cluttering your global scope, an optional `definitions` object may be passed to `Palau.init()` as specified in the [Injecting Components](#injecting-components) section.

It's also possible to read `prevState` on each render:

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

For more details, review the [Rules for Creating Components](#rules-for-creating-components) and [Rules for Passing Props](#rules-for-passing-props) sections

## Palau

_Manual injection is still supported but has been moved to the [Advanced Usage](#advanced-usage) section as it requires a deeper understanding of the lifecycle._

Palau is a centralized state management tool for MicroState. It will manage injecting and updating Tuvalu components following a pub/sub pattern.

### Injecting Components

To inject components, initialize Palau with all root components and their mount points by calling Palau.init() with the following structure:

```javascript
Palau.init({
  pageState?: object,
  components: [
    {
      rootComponent: ({ state, prevState }) => string || string,
      mountPoint: HTMLElement,
      listens?: string[],
      definitions?: object  // if provided, components found in the definitions object will be called over those in global scope. Only define rootComponent as a string if its key exists here
    }
  ]
});
```

**_Note:_** This should only be done once and attempts to call `Palau.init()` a 2nd time on a page will throw an error (unless previous calls failed due to an invalid configuration).

To demonstrate, given an application with components of `<Input />` and `<ListContainer />` which need to update and display a `list` array respecitvely, we can inject them as follows:

```javascript
Palau.init({
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

The `listens` array on `<ListContainer />` tells Palau to rerender that component only when values in the specified keys are updated by `Palau.putState()`. Conversely, `<Input />` will never rerender, which would otherwise result in losing focus. You may also add `'*'` to subscribe to all state changes.

Since nothing listens to `title`, it can be updated without triggering a rerender of any component.

### Managing State

Components only receive keys from `pageState` that they listen for, so `<ListContainer />` will only receive `list` and `Input` will receive an empty object. Despite this, `<Input />` can read and update pageState by calling `Palau.getPageState()` and `Palau.putPageState()` as follows:

```javascript
const PalauInput = () => {
  // get the current list state
  const currentListState = Palau.getPageState("list");
  // More on Nauru and adding listeners later
  const tag = Nauru.useListener([
    {
      name: "keypress",
      callback: (event) => {
        if (!/enter/i.test(event.key)) return;
        // append the new value to the list and clear the input
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

## Nauru

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

## Reference

### API

To prevent state fragmentation, all public methods are static and should be called directly on the class

**Palau API**

- [init](#palauinit)
- [getPageState](#getpagestate)
- [putPageState](#putpagestate)

**Nauru API**

- [useListener](#nauruuselistener)

##### Palau.init

Initializes Palau. Only call once per page

```
Palau.init({
  pageState?: object,
  components: {
    rootComponent: ({ state, prevState }) => string,
    mountPoint: HTMLElement,
    listens?: string[]
    }[]
  })
```

##### Palau.getPageState

Returns the current pageState object. An optional key can be provided to return only the value of that key

```
getPageState(key?: string): object
```

##### Palau.putPageState

Updates the pageState object with the key-value pairs provided. Unspecified keys will not be updated

```
putPageState(newState: object)
```

##### Nauru.useListener

generates a unique tag to be added to the HTML attributes of an element to receive the event listener(s) provided

```
Nauru.useListener({ name: string, callback: event => void }[]): string
```

**_Note:_** Tuvalu contains no public methods as it is meant to be managed by Palau

### Rules for Creating Components

- Component should be pure functions returning JSX-like strings saved to a variable in PascalCase
- HTML elements in the returned string are lowercase
- All nested components are wrapped in **self-closing** tags and share the name of the variable they're saved to (i.e. `<Foo />` for a component saved to `Foo`).
- All HTML tags opened in a string are closed

### Rules for Passing Props

- must be handled by the receiving component, even if they share a name with an HTML attribute
- should be passed similar to how they are in React functional components (`<Component propName={value} />`)
- have a structure of `propName={<value>}`
- cannot be named `state` or `prevState`
- component will receive the key-value pair of `propName: <value>` added to the object of its first parameter
- numeric values will be stringified
- values will have HTML special characters escaped to prevent XSS attacks

## Advanced Usage

Topics past this point are provided for further reference but not considered necessary for basic usage

### State and Lifecycle

_A distinction will be made in this section between the Tuvalu object instantiated and returned by `new Tuvalu()` and the components it injects/rerenders to the DOM. Though the terms are largely interchangeable, it's important to understand the difference here._

When working with state it's important to understand state belongs to the instantiated object, not its components, therefore every state change will rerender the root and all of its children, causing focus and event listeners to be lost.

Losing focus is overcome by separating components listening to state from those that update it (further details in [Injecting Components](#injecting-components)). Details on adding event listeners properly found [here](#event-listeners)

For this reason, it's not recommended to build SPAs with a single object as an entrypoint as one would with tools like React but rather inject multiple objects as needed in areas that share the smallest amount of state possible (hence the name "MicroState").

Coordinating state between components can be handled automatically by [Palau](#palau).

**_Note:_** Tuvalu objects created manually without state or via Palau with empty/no `listens` array will never rerender

### Manual Injection

**_Note:_** Manual injection also means manually coordinating state changes between components. Please read the section on [state and lifecycle](#state-and-lifecycle) for more information

Components can be manually injected by calling the Tuvalu constructor as follows:

```javascript
new Tuvalu({
  rootComponent: Foo
  mountPoint: document.querySelector("#root")
});
```

This will use the mountPoint provided and render the `Foo` callback from earlier. By default, it receives an empty state object. To instantiate the state as `{ready: false}` instead run

```javascript
const tuvaluObject = new Tuvalu({
  rootComponent: Foo,
  state: { ready: false },
  mountPoint: document.querySelector("#root"),
});
```

saving the resulting object to the variable is important if you later need to invoke the `_getState()`, `_setState()` or `putState()` methods. Updating an object passed to the constructor (even by reference), will not trigger a rerender.

For legacy reasons, you may also construct an object with `new MicroState()` which extends `Tuvalu()` and exposes `getState()` and `setState()` aliases for `_getState()` and `_setState()` respectively. It also will default mountPoint to `document.querySelector("#root")`.
