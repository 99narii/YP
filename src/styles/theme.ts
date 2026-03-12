import {
  colors,
  spacing,
  breakpoints,
  media,
  typography,
  shadows,
  borderRadius,
  transitions,
  zIndex,
} from "./tokens";

export const theme = {
  colors,
  spacing,
  breakpoints,
  media,
  typography,
  shadows,
  borderRadius,
  transitions,
  zIndex,
} as const;

export type Theme = typeof theme;
