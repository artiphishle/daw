import classNames from "classnames";

import type { IFlex } from "@/ui";

export default function Flex({ children, vertical = false }: IFlex) {
  const props = {
    className: classNames("flex", { "flex-col": vertical }),
  };

  return <div {...props}>{children}</div>;
}
