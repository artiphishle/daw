import classNames from "classnames";

import type { IA } from "@/ui";

function A({
  children,
  className: _className,
  classNameActive = "",
  order,
  ...rest
}: IA) {
  const className = classNames("relative p-4", _className, `order-${order}`, {
    [classNameActive]: order === 1,
  });
  const tabIndex = order;
  const props = { ...rest, className, tabIndex };

  return <a {...props}>{children}</a>;
}

export { A };
