import classNames from 'classnames';

import type { IFlex } from '@/pfui/types';

export function Flex({ children, grow = false, vertical = false }: IFlex) {
  const className = classNames('flex', {
    'flex-1': grow,
    'flex-col': vertical,
  });

  return <div className={className}>{children}</div>;
}
