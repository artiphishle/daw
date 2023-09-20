import { MenuIcon } from "lucide-react";

import t from "@/app/core/i18n";
import generalStyles from "@/app/core/config/styles";

import { Transport } from "@/app/components";
import { Avatar, List } from "@/app/ui";

const styles = {
  navbar: {
    ui: "p-4 flex flex-row mb-6 w-full bg-black text-white items-center justify-between",
    uiInner: "flex px-4 py-2",
    icon: "w-8 h-8 mr-2",
  },
};

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
        <h1 className={generalStyles.headings.h1}>{t("daw")}</h1>
      </div>
      <nav>
        <List items={[{ children }]} />
      </nav>
    </div>
  );
}
