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
  Error = "bg-[#ff0000] text-white",
  Info = "bg-[#00ffff] text-black",
  Normal = "bg-[#000000] text-white",
  Primary = "bg-[#0000ff] text-white",
  Secondary = "bg-[#00000f] text-white",
  Success = "bg-[#00ff00] text-white",
  Warning = "bg-[#ffff00] text-white",
}
