import { h } from "preact";
import Combinations from "preact-combinations";

import styled from "../src";
import { textColor } from "./colorUtils";

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

const Application = styled("div", {
  fontFamily: "sans-serif"
});

const combinations = {
  dense: [false, true],
  flat: [false, true],
  color: ["blue", "red", "white", "black"]
};

export default () => (
  <Application>
    <h1>Example styled component with combinations of props</h1>
    <Button color="red" onClick={testClick}>
      Click me!
    </Button>
    <br />
    <Combinations component={Button} combinations={combinations}>
      Hello Internet! 🌍
    </Combinations>
  </Application>
);

function testClick() {
  alert("Clicked!");
}
