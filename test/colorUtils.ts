import colorName from "colornames";

export function textColor(color: Color) {
  if (typeof color === "string") {
    color = makeRGB(color);
  }
  if (contrast(color.red, color.green, color.blue) > 125)
    return "black";
  return "white";
}
function contrast(red: number, green: number, blue: number) {
  const r = makeByte(red);
  const g = makeByte(green);
  const b = makeByte(blue);
  return Math.round((r * 299 + g * 587 + b * 114) / 1000);
}
function makeRGB(color: string): RGBColor {
  if (color.startsWith("rgba")) {
    const values = color
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map(v => Number.parseFloat(v.trim()));
    return {
      red: values[0],
      green: values[1],
      blue: values[2],
      alpha: values[3]
    };
  }
  else if (color.startsWith("rgb")) {
    const values = color
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map(v => Number.parseFloat(v.trim()));
    return {
      red: values[0],
      green: values[1],
      blue: values[2]
    };
  }
  else if (color.startsWith("#")) {
    return hexToRGB(color);
  }
  else {
    const colHex = colorName(color);
    return hexToRGB(colHex);
  }
}
function hexToRGB(color: string): RGBColor {
  color = color.substr(1);
  if (color.length === 3) {
    return {
      red: Number.parseInt(color[0], 16) * 0xf,
      green: Number.parseInt(color[1], 16) * 0xf,
      blue: Number.parseInt(color[2], 16) * 0xf
    };
  }
  else if (color.length === 4) {
    return {
      red: Number.parseInt(color[0], 16) * 0xf,
      green: Number.parseInt(color[1], 16) * 0xf,
      blue: Number.parseInt(color[2], 16) * 0xf,
      alpha: Number.parseInt(color[3], 16) * 0xf
    };
  }
  else if (color.length === 6) {
    return {
      red: Number.parseInt(color.substr(0, 2), 16),
      green: Number.parseInt(color.substr(2, 2), 16),
      blue: Number.parseInt(color.substr(4, 2), 16)
    };
  }
  else if (color.length === 8) {
    return {
      red: Number.parseInt(color.substr(0, 2), 16),
      green: Number.parseInt(color.substr(2, 2), 16),
      blue: Number.parseInt(color.substr(4, 2), 16),
      alpha: Number.parseInt(color.substr(6, 2), 16)
    };
  }
  throw new Error("Malformed HEX value " + color);
}
function makeByte(x: number) {
  if (Math.abs(x) < 1)
    return Math.round(x * 255);
  else
    return Math.round(x);
}
type Color = string | RGBColor;
interface RGBColor {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}
