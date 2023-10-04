import classNames from "classnames";

import type { IGrid } from "@/ui";

const Grid = ({ children, className, cols }: IGrid) => {
  const props = {
    className: classNames(`grid grid-cols-${cols}`, className),
  };

  return <div {...props}>{children}</div>;
};

export { Grid };
