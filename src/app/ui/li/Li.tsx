import { AllHTMLAttributes, ReactNode } from "react";

interface ILi extends AllHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

const Li = ({ children, ...rest }: ILi) => <li {...rest}>{children}</li>;

export { Li };
