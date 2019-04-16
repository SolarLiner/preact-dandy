# preact-dandy
Small and fancy (like my pet dog) CSS-in-JS solution for preact.

![License](https://img.shields.io/npm/l/preact-dandy.svg)
![npm version](https://img.shields.io/npm/v/preact-dandy.svg)
![preact peer dependency version](https://img.shields.io/npm/dependency-version/preact-dandy/peer/preact.svg)
![npm type definitions](https://img.shields.io/npm/types/preact-dandy.svg)

## Install

```bash
npm i preact-dandy
```

## Usage

```typescript
import styled from "preact-dandy";

interface ButtonProps {
  class?: string;
  color: string;
  flat?: boolean;
  dense?: boolean;
}
const Button = styled<ButtonProps>(
  "button",
  {
    margin: "0.5em",
    padding: "1em",
    border: "unset",
    cursor: "pointer",
    borderRadius: "5px"
  },
  props => ({
    backgroundColor: props.flat ? "transparent" : props.color,
    color: props.flat ? props.color : textColor(props.color),
    padding: props.dense ? "0.5em 1em" : undefined, // Undefined object values are filtered out, use this to not override a property
    boxShadow: props.flat ? "initial" : "0 1.5px 3px rgba(0,0,0,0.3)"
  })
);
```

The main export is a `styled` function which takes 3 arguments:

1. **el** is the element used to render the component. In TypeScript this is restricted to the JSX "Intrinsic elements" to prevent use of HOC as it could lead to undesired behavior. This is however just a soft requirement. `el` is simply passed to `createElement` and does not care about its type.
2. **css** is the CSS object containing the syles to be applied to the component. This object is static, to dynamically style the component, see the `cssGenerator` argument.
3. **cssGenerator** (optional) is a function that takes the props as input and outputs a CSS object. This allows dynamic styling based on component values.

For TypeScript users, the `styled` function contains one optional type argument, which is used to type the props of the resulting component. The props are passed to the `cssGenerator` function but also to the resulting component, allowing you to have typed components.
