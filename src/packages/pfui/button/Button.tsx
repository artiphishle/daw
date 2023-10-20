import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import { ESize, EVariant, SPACING } from "../constants";

export enum EButtonType {
  Button = "button",
  Reset = "reset",
  Submit = "submit",
}

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
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
