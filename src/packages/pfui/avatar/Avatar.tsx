import classNames from 'classnames';
import { UserIcon } from 'lucide-react';

import type { IAvatar } from '@/pfui/types';

import styles from 'app/_common/styles';
const $ = styles.avatar;

function Avatar({ bordered = true, className, rounded = true }: IAvatar) {
  const props = {
    className: classNames(
      { className },
      $.main,
      { [$.bordered]: bordered },
      { [$.rounded]: rounded },
    ),
  };

  return (
    <div {...props}>
      <UserIcon className={styles.icon.lg} />
    </div>
  );
}

export { Avatar };
