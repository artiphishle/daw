import type { IButtonGroup } from "packages/pfui";

function ButtonGroup({ children, ...rest }: IButtonGroup) {
  return <div {...rest}>{children}</div>;
}

export { ButtonGroup };
