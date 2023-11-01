/***
 * @types
 * @description all types (not yet, move them here) of 'PFUI' library
 * @todo more accurate type descriptions
 ***/
import { AllHTMLAttributes, Attributes, StyleHTMLAttributes } from 'react';

/***
 * @interfaces
 */

/*** @ui Anchor */
export interface IA extends Readonly<AllHTMLAttributes<HTMLAnchorElement>> {
  readonly id: string;
  readonly order: number;
  readonly isActive?: boolean;
  readonly classNameActive?: string;
}
/*** @ui Avatar */
export interface IAvatar extends AllHTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  rounded?: boolean;
}
/*** @ui ButtonGroup */
export interface IButtonGroup extends AllHTMLAttributes<HTMLDivElement> {}

/*** @ui Flex */
export interface IFlex extends AllHTMLAttributes<HTMLDivElement> {
  grow?: boolean;
  vertical?: boolean;
}
/*** @ui Grid */
export interface IGrid extends AllHTMLAttributes<HTMLDivElement> {
  style: any;
  classNameItem?: string;
}
