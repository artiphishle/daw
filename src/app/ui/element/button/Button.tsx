import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

export enum EButtonType {
  Button = "button",
  Reset = "reset",
  Submit = "submit",
}

export enum ESize {
  Sm = "xs",
  Md = "md",
  Lg = "lg",
  Xl = "xl",
  Xxl = "2xl",
}

const SPACING = {
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
interface IButton
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  readonly type: EButtonType;
  readonly value: string;
  readonly className?: string;
  readonly rounded?: ESize;
  readonly size?: ESize;
  readonly variant?: EVariant;
}

const Button = ({
  className: _className,
  value,
  rounded,
  size = ESize.Md,
  type = EButtonType.Button,
  variant = EVariant.Normal,
  ...rest
}: IButton) => {
  const className = classNames(_className, variant);
  const style = {
    style: {
      padding: `${SPACING[size] / 2}px ${SPACING[size] * 3}px`,
      // eslint-disable-next-line no-undefined
      borderRadius: rounded ? `${SPACING[rounded]}px` : undefined,
    },
  };
  const props = { ...rest, className, ...style };

  return <button {...props}>{value}</button>;
};

export { Button };
