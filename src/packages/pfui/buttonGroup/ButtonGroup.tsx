import type { IButtonGroup } from '@/pfui/types';

function ButtonGroup({ children, ...rest }: IButtonGroup) {
  return <div {...rest}>{children}</div>;
}

export { ButtonGroup };
