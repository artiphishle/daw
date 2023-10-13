import { IFlex } from "app/ui/types";
import classNames from "classnames";

export function Flex({ children, vertical = false }: IFlex) {
  const props = {
    className: classNames("flex", { "flex-col": vertical }),
  };
  return <div {...props}>{children}</div>;
}
