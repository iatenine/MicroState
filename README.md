# MicroState
An injectable, lightweight, DOM-friendly state manager allowing developers to implement reusable components in pre-existing static HTML or PHP websites without a build step. This repo and its page serve to provide an example of its implementation but MicroState.js is the only file required to use it in any project

## Implementation
A microstate with the root component `foo` can be instantiated easily as:

`const microState = new MicroState(foo)`

By default, this will be injected in a DOM element with the id of `root` and have an initial empty state object
To select an element with id `bar` and instantiate the state as `{ready: false}` instead run

`const microState = new MicroState(foo, { ready: false }, 'bar');`

## Components
Components should be functions with the following signature: 

```(state: object) => string```

The MicroState object only accepts a root-level component with components responsible for structuring child components

## Adding event listeners
Adding event listeners directly to the components isn't recommended, instead ensure each component includes an id you can query (avoid spaces, punctuations, etc) based on state and add a callback to dynamically attach them in the `setOnAfterRender()` method
