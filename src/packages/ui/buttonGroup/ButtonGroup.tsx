import type { IButtonGroup } from "packages/ui";

function ButtonGroup({ children, ...rest }: IButtonGroup) {
  return <div {...rest}>{children}</div>;
}

export { ButtonGroup };
