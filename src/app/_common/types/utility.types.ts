/**
 * Enums
 */
export enum EUnit {
  Em = 'em',
  Percent = '%',
  Pt = 'pt',
  Px = 'px',
  Rem = 'rem',
}

/**
 * Types
 */
export type UniqueIdentifier = string | number;
export type TEmptyFunction = () => void;
export type TOptional<T> = T | null;

/**
 * Interfaces
 */
export interface IAbsolutePosition {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
