import { MenuIcon } from 'lucide-react';

import styles from 'app/_common/styles';
import t from 'app/_core/i18n';

import { Avatar } from 'packages/pfui';
import { Transport } from 'app/_components';
import { useRef } from 'react';

export default function Navbar() {
  const menuMainRef = useRef(null);
  const { navbar } = styles;
  const events = {
    showMenu: () => {
      console.log('show');
    },
  };

  return (
    <div className={navbar.ui}>
      <div className={navbar.uiInner}>
        <MenuIcon className={navbar.icon} />
        <h1 className={styles.headings.h1}>{t('daw')}</h1>
      </div>
      <Transport />
      <Avatar />
    </div>
  );
}
