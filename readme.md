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

### Lifecycle

1. Creating a new instance of the component
2. Call `render()`
2.1. Create element that can be accessed by `this.el`
2.2. Insert `template` inside `this.el`


### Props

Component props is an key-value object. You can pass props to component constructor in following way:

```js
const myDialog = new MyDialog({
    destroyOnClose: true // <- here is a property `destroyOnClose`
});
myDialog.open();
```

Than you can access the property inside component by `this.props.destroyOnClose`:

```js
close () {
    this.props = { isOpen: false };
    if (this.props.destroyOnClose) { // <- here we using the property
        this.destroy();
    }
}
```

### defaultProps

When you creating the component you can set a list of default properties in following way:

```js
get defaultProps () {
    // Here is a list of props
    return {
        ...super.defaultProps, // <- we also need to grab props from parent
        isClosable: true,
        className: 'is-medium',
        isOpen: false,
        destroyOnClose: false
    };
}
```

Default properties can be override by properties passed to constructor.
So you always can control set of properties outside the component.

### Set props

You can set (change) properties outside and inside the component. For example:

```js
// outside
myDialog.props = { isOpen: false };

// inside
this.props = { isOpen: true };
```

Every time when you set (change) props component will be re-rendered.

