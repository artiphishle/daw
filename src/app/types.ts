/**
 * @typedef TOptional
 */
type TOptional<T> = T | null;

/**
 * @enum EUnit
 */
enum EUnit {
  Em = "em",
  Percent = "%",
  Pt = "pt",
  Px = "px",
  Rem = "rem",
}
export type { TOptional };
export { EUnit };
