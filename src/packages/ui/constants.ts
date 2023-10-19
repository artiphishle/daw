export enum ESize {
  Sm = "xs",
  Md = "md",
  Lg = "lg",
  Xl = "xl",
  Xxl = "2xl",
}

export const SPACING = {
  [ESize.Sm]: 4,
  [ESize.Md]: 6,
  [ESize.Lg]: 8,
  [ESize.Xl]: 10,
  [ESize.Xxl]: 12,
};

export enum EVariant {
  Error = "bg-red-900 text-white",
  Info = "bg-cyan-900 text-white",
  Normal = "bg-[#000000] text-white",
  Primary = "bg-blue-900 text-white",
  Secondary = "bg-purple-900 text-white",
  Success = "bg-green-900 text-white",
  Warning = "bg-orange-900 text-white",
}
