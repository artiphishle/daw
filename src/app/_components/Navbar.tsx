import { MenuIcon } from 'lucide-react';

import styles from 'app/_common/styles';
import t from 'app/_core/i18n';

import { Avatar } from 'packages/pfui';
import { Transport } from '@/components';
import type { IProject } from '@/common/types/project.types';

export default function Navbar({ project }: { project: IProject }) {
  const { navbar } = styles;
  console.log('[Navbar] server-side');

  return (
    <div className={navbar.ui}>
      <div className={navbar.uiInner}>
        &nbsp;
        <h1 className={styles.headings.h1}>
          <MenuIcon className={styles.icon.md} />
        </h1>
        &nbsp;
        {t('daw')}
      </div>
      {<Transport project={project} />}
      <Avatar />
    </div>
  );
}
