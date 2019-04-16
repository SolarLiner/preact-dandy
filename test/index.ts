import { render, createElement } from "preact";
import Conbinations from "preact-combinations";
import styled from "../src";

import Application from "./app";

render(createElement(Application, null), document.querySelector("#app"));
