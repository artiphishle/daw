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

export { EUnit };
export type { TOptional };
