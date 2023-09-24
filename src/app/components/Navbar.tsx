import { MenuIcon } from "lucide-react";

import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";

import { Transport } from "@/app/components";
import { Avatar, List } from "@/app/ui";

const { navbar } = styles;

interface INavbar {}

export default function Navbar({}: INavbar) {
  const children = (
    <>
      <Transport />
      <Avatar />
    </>
  );
  return (
    <div className={styles.navbar.ui}>
      <div className={styles.navbar.uiInner}>
        <MenuIcon className={styles.navbar.icon} />
        <h1 className={styles.headings.h1}>{t("daw")}</h1>
      </div>
      <nav>
        <List items={[{ children }]} />
      </nav>
    </div>
  );
}
