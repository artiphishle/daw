import type { IButtonGroup } from '..';

function ButtonGroup({ children, ...rest }: IButtonGroup) {
  return <div {...rest}>{children}</div>;
}

export { ButtonGroup };
