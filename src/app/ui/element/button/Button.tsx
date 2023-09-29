import classNames from "classnames";
import { AllHTMLAttributes } from "react";

enum EButtonType {
  Button = "button",
  Reset = "reset",
  Submit = "submit",
}

enum ESize {
  Xs,
  Md,
  Lg,
  Xl,
}

enum EVariant {
  Error = "#ff0000",
  Info = "#0000ff",
  Normal = "#000000",
  Primary = "#0000ff",
  Secondary = "#0000ff",
  Success = "#00ff00",
  Warning = "#ffff00",
}

interface IButton extends AllHTMLAttributes<HTMLButtonElement> {
  value: string;
  size?: ESize;
  variant?: EVariant;
}

function Button({
  value,
  className: _className,
  size = ESize.Md,
  type = EButtonType.Button,
  variant = EVariant.Normal,
  ...rest
}: IButton) {
  const className = classNames(_className, `bg-[${variant}]`);
  const props = { ...rest, className };

  return <button {...props}>{value}</button>;
}
