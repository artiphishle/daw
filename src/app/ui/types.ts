/**
 * TODO more accurate type descriptions
 * (e.g. ReactNode is not good enough for Ul children (only Li))
 */
import { AllHTMLAttributes, ReactNode } from "react";

/**
 * ELEMENTS
 */

// a
interface IA extends Readonly<AllHTMLAttributes<HTMLAnchorElement>> {
  readonly id: string;
  readonly order: number;
  readonly classNameActive?: string;
}
// ol
interface IOl extends Readonly<AllHTMLAttributes<HTMLOListElement>> {
  readonly children: ReactNode;
}
// ul
interface IUl extends Readonly<AllHTMLAttributes<HTMLUListElement>> {
  readonly children: ReactNode;
}

/**
 * COMPOUNDS
 */

// avatar
interface IAvatar {
  bordered?: boolean;
  rounded?: boolean;
}
interface IButtonGroup extends AllHTMLAttributes<HTMLDivElement> {}

/**
 * LAYOUTS
 */

// flex
interface IFlex extends AllHTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
}
// grid
interface IGrid extends AllHTMLAttributes<HTMLDivElement> {}

export type { IA, IOl, IUl };
export type { IAvatar, IButtonGroup };
export type { IFlex, IGrid };
