import classNames from 'classnames';
import { ReactNode } from 'react';
import { ESize, EVariant } from '../constants';

export interface ICircle {
  children?: ReactNode;
  className?: string;
  color?: EVariant;
  size?: ESize;
}

export default function Circle({
  children,
  className = '',
  color = EVariant.Normal,
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
