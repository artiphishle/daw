import type { IButtonGroup } from "@/ui";

function ButtonGroup({ children, ...rest }: IButtonGroup) {
  return <div {...rest}>{children}</div>;
}

export { ButtonGroup };
