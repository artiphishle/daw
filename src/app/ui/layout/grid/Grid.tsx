import classNames from "classnames";

import type { IGrid } from "@/ui";

function Grid({ children, className, cols }: IGrid) {
  const props = {
    className: classNames(`grid grid-cols-${cols}`, className),
  };

  return <div {...props}>{children}</div>;
}

export { Grid };
