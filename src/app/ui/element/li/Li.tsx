import { AllHTMLAttributes, ReactNode } from "react";

interface ILi extends AllHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

function Li({ children, ...rest }: ILi) {
  return <li {...rest}>{children}</li>;
}

export { Li };
