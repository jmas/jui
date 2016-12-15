# JUI

Just UI components library and components toolkit.

# Examples

To see `my-app` example:

```
npm install
npm run my-app
```

Then open `examples/my-app/index.html` in browser (Google Chrome recommended).

# Docs

## Component

### Props

Component props is an key-value object.

### Constructor

Component constructor receive one parameter `props`.

### Special prop `mountEl`

It is an root element where component is mounted. This element do not changes by component.
It used just for render component inside.

### Render

This process contains tree steps: 1. clean content from the `mountEl`, 2. insert new component content, 
3. collect `refs`.

You can re-define `render()` method at child class of `Component` and put all element-specific logic 
(add event listeners etc.) there. Note: you should call `super.render()`.

### Access to elements through `refs`

You can give to each element attribute `data-ref="<refName>"`. Then after render you can access `this.refs.<refName>`
to get access to elements. It's very useful when you override `render()` method and wants get quick
access to specific element.

Note: if you give `data-ref` to two or more elements - you will get array of elements in `this.refs.<refName>`.
