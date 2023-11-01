/***
 * @enums
 * @constants
 */

/*** @ui Button */
export enum EButtonType {
  Button = 'button',
  Reset = 'reset',
  Submit = 'submit',
}

export enum ESize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
  Xxl = '2xl',
}

export enum EVariant {
  Error = 'bg-red-900 text-white',
  Info = 'bg-cyan-900 text-white',
  Normal = 'bg-[#000000] text-white',
  Primary = 'bg-blue-900 text-white',
  Secondary = 'bg-purple-900 text-white',
  Success = 'bg-green-900 text-white',
  Warning = 'bg-orange-900 text-white',
}

export const SPACING = {
  [ESize.Sm]: 6,
  [ESize.Md]: 10,
  [ESize.Lg]: 12,
  [ESize.Xl]: 16,
  [ESize.Xxl]: 20,
};
