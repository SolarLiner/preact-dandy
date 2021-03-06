import { createElement, RenderableProps, JSX, FunctionalComponent } from "preact";
import classNames from "classnames";
import { style } from "typestyle";
import { NestedCSSProperties } from "typestyle/lib/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterNullUndefined(obj: any) {
  return Object.keys(obj)
    .filter(k => typeof obj[k] !== "undefined")
    .reduce((o, key) => Object.assign(o, { [key]: obj[key] }), {});
}

export interface MinimalProps {
  class?: string;
  className?: string;
}
export default function styled<P = {}>(
  el: keyof JSX.IntrinsicElements,
  css: NestedCSSProperties,
  cssGenerator?: (
    props: RenderableProps<P & MinimalProps & JSX.IntrinsicElements[typeof el] & JSX.DOMAttributes>
  ) => NestedCSSProperties
) {
  const component: FunctionalComponent<
    P & MinimalProps & JSX.IntrinsicElements[typeof el] & JSX.DOMAttributes
  > = props => {
    const cssFinal = !!cssGenerator ? Object.assign({}, css, filterNullUndefined(cssGenerator(props))) : css;
    const classNameFinal = classNames(style(cssFinal), props.class, props.className);
    const { children, ...attr } = props;
    return createElement(el, { ...attr, class: classNameFinal }, children);
  };
  component.displayName = `Styled ${el}`;
}
