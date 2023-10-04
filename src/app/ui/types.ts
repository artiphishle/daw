/**
 * TODO more accurate type descriptions
 * (e.g. ReactNode is not good enough for Ul children (only Li))
 */
import { AllHTMLAttributes, ReactNode } from "react";

/**
 * ELEMENTS
 */

// A
interface IA extends Readonly<AllHTMLAttributes<HTMLAnchorElement>> {
  readonly id: string;
  readonly order: number;
  readonly isActive?: boolean;
  readonly classNameActive?: string;
}
// Ol
interface IOl extends Readonly<AllHTMLAttributes<HTMLOListElement>> {
  readonly children: ReactNode;
}
// Ul
interface IUl extends Readonly<AllHTMLAttributes<HTMLUListElement>> {
  readonly children: ReactNode;
}

/**
 * COMPOUNDS
 */

// Avatar
interface IAvatar extends AllHTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  rounded?: boolean;
}
interface IButtonGroup extends AllHTMLAttributes<HTMLDivElement> {}

/**
 * LAYOUTS
 */

// Flex
interface IFlex extends AllHTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
}
// Grid
interface IGrid extends AllHTMLAttributes<HTMLDivElement> {}

export type { IA, IOl, IUl };
export type { IAvatar, IButtonGroup };
export type { IFlex, IGrid };
