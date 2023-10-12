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
type TEmptyFunction = () => void;
type TOptional<T> = T | null;

/**
 * Interfaces
 */
interface IAbsolutePosition {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export { EUnit };
export type { TOptional };
export type { IAbsolutePosition };
