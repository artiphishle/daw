import classNames from "classnames";

import { type AllHTMLAttributes } from "react";

interface INav extends AllHTMLAttributes<HTMLElement> {}

const css = { nav: "flex items-center" };

function Nav({ children, className, ...rest }: INav) {
  return (
    <nav className={classNames(css.nav, className)} {...rest}>
      {children}
    </nav>
  );
}

export { Nav };
