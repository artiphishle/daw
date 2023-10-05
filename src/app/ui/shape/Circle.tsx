import classNames from "classnames";
import { ReactNode } from "react";

export enum EColor {
  Danger = "#f00",
  Neutral = "#ccc",
  Primary = "#00f",
  Secondary = "#0ff",
  Success = "#0f0",
  Warning = "#ff0",
}

export enum ESize {
  Xl = "24rem",
  Lg = "18rem",
  Md = "12rem",
  Sm = "6rem",
  Xs = "3rem",
}

export interface ICircle {
  children?: ReactNode;
  className?: string;
  color?: EColor;
  size?: ESize;
}

export default function Circle({
  children,
  className = "",
  color = EColor.Neutral,
  size = ESize.Lg,
}: ICircle) {
  return (
    <div
      className={classNames(
        `p-1 rounded-full h-[${size}] w-[${size}]`,
        `bg-[${color}]`,
        className
      )}
    >
      {children && children}
    </div>
  );
}
