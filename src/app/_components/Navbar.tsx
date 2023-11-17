import { MenuIcon } from 'lucide-react';

import styles from 'app/_common/styles';
import t from 'app/_core/i18n';

import { Transport } from '@/components';
import type { IProject } from '@/types/project.types';
import { UserButton } from '@clerk/nextjs';

export function Navbar({
  project,
  setProject,
}: {
  project: IProject;
  setProject: (project: IProject) => void;
}) {
  const { navbar } = styles;
  console.info('[Navbar] server-side');

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
      {<Transport project={project} setProject={setProject} />}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
