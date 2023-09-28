/**
 * Enums
 */

enum EUnit {
  Em = "em",
  Percent = "%",
  Pt = "pt",
  Px = "px",
  Rem = "rem",
}

/**
 * Types
 */

type TOptional<T> = T | null;

/**
 * Interfaces
 */

// TODO find a native typing for this
interface IAbsolutePosition {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export { EUnit };
export type { TOptional };
export type { IAbsolutePosition };
