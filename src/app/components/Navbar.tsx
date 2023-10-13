import { MenuIcon } from "lucide-react";

import styles from "@/core/config/styles";
import t from "@/core/i18n";

import { Avatar } from "@/ui";
import { Transport } from "@/components";

export default function Navbar() {
  const { navbar } = styles;

  return (
    <div className={navbar.ui}>
      <div className={navbar.uiInner}>
        <MenuIcon className={navbar.icon} />
        <h1 className={styles.headings.h1}>{t("daw")}</h1>
      </div>
      <Transport />
      <Avatar />
    </div>
  );
}
