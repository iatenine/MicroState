# MicroState

An injectable, lightweight, DOM-friendly state manager enabling the use of reusable components in pre-existing websites without a build step, server dependencies or view layer migration. Its syntax has been designed to be familiar to React developers but rather than implementing a virtual DOM and controlling the entire view layer, each MicroState instance only concerns itself with the DOM element to which it is mounted upon instantiation.

## Implementation

This repo and its page serve to provide an example of MicroState implementation but a copy of [MicroState.js](https://github.com/iatenine/MicroState/blob/main/assets/js/MicroState.js) is the only file required to use it in any project

A MicroState with the root component `Foo` can be instantiated easily as:

```
const Foo = () => `
    <div>
        Hello, I'm an example component
    </div>`;
const microState = new MicroState({
   rootComponent: Foo
  });
```

By default, this will be injected in a DOM element with the id of `root` and have an initial empty state object
To select an element with id `bar` and instantiate the state as `{ready: false}` instead run

```
const selectedMountPoint = document.querySelector("#bar");
const microState = new MicroState({
  rootComponent: Foo,
  state: { ready: false },
  mountPoint: selectedMoutPoint
  });
```

## Lifecycle

A single MicroState object is not intended to run an entire SPA as each state update will rerender the root and all of its children, this is why the example site separates the display and input components into separate objects. One can "talk" to the other by invoking the other's `setState()` or `putState()` methods as needed

## Components

Components should be functions with the following signature:

```
({state: object,
prevState: object,
...props: object}) => string
```

Components are free to ignore all parameters not useful to them. The MicroState object only accepts a root-level component with components responsible for structuring child components

## State

MicroState components do not have internal state but can be passed props by their parents. The code attached includes the following example of `ListItem` rendering `Button` components with an `el` prop generated for each:

```
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

props are destructured and share scope with `state` and `prevState` so naming props as such can result in unexpected behavior. This will likely cause an error in future iterations

## Automatic Component Injection

To automatically inject a component into another with string interpolation, ensure the injected component is named in PascalCase and add it as a self-closed tag with its name. For example

```
<div>
  <ListItem />
</div>
```

will render the ListItem component, passing the state, prevState objects as usual. To provide props to a component, add them as attributes enclosed in curly braces, for example:

```
// props are always passed to the child components as strings
<Button name={"The Best Button"} value={400} />
```

will receive `{name: "The Best Button", value: "400"}` as its props object (state and prevState are not affected). You may provide any value but will be received by the component as a stringified version of itself and the component is responsible for parsing the value if desired.

## Adding Event Listeners

Adding event listeners directly to the components isn't recommended, instead ensure each component includes an id you can query (avoid spaces, punctuations, etc) based on state and add a callback to dynamically attach them in the `setOnAfterRender()` method. onAfterRender and onBeforeRender callbacks should have the following signature:

```
(newState: object, prevState: object) => any
```

onBeforeRender callbacks are provided for convenience but should not be used to add event listeners to MicroState components

## "Gotchas" for React Developers

Despite the similar syntax there are several key differences in behavior React developers should know:

- JSX-syntax components must be self-closed (Correct: `<Foo />` Incorrect: `<Foo></Foo>`)
- State is identical for all components in a MicroState instance with the `props` object being a separate key
- Components do not add event listeners such as `onClick` or `onChange`, see [Adding Event Listeners](#adding-event-listeners) for more
- Component attributes do not correspond to HTML attributes, they are passed as props; child components are responsible for using them correctly
- Closing each tag in a component is recommended but not enforced
  - Note: "orphaned" text nodes (not wrapped corresponding HTML tags) are no longer rendered, text nodes will not be considered orphaned if wrapped in a parent component's tags
- Multiple MicroState objects can exist on the same page
- MicroState objects rerender all their components with every state change, irrespective of any dependencies
- Props are passed in a similar manner as they are in React functional components but should not be named `state` or `prevState`
