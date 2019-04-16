import { createElement, RenderableProps, JSX } from "preact";
import classNames from "classnames";
import { style } from "typestyle";
import { NestedCSSProperties } from "typestyle/lib/types";

interface MinimalProps {
  class?: string;
  className?: string;
}
export default function styled<P extends MinimalProps = {}>(
  el: keyof JSX.IntrinsicElements,
  css: NestedCSSProperties,
  cssGenerator?: (props: RenderableProps<P>) => NestedCSSProperties
) {
  return (props: RenderableProps<P>) => {
    const cssFinal = !!cssGenerator
      ? Object.assign({}, css, filterNullUndefined(cssGenerator(props)))
      : css;
    const classNameFinal = classNames(
      props.class,
      props.className,
      style(cssFinal)
    );
    const { children, ...attr } = props;
    return createElement(el, { ...attr, class: classNameFinal }, children);
  };
}

function filterNullUndefined(obj: any) {
  return Object.keys(obj)
    .filter(k => typeof obj[k] !== "undefined")
    .reduce((o, key) => Object.assign(o, { [key]: obj[key] }), {});
}
