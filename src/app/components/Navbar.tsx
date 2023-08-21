import { MenuIcon } from "lucide-react";

import t from "@/app/core/i18n";
import generalStyles from "@/app/core/config/styles";
import List from "./ui/list/List";
import Transporter from "@/app/components/Transporter";

const styles = {
  navbar: {
    ui: "flex flex-row mb-2 w-full bg-black text-white items-center justify-between",
    uiInner: "flex px-4 py-2",
    icon: "w-8 h-8 mr-2",
  },
};

export default function Navbar({ transport }: any) {
  const children = <Transporter {...transport} />;
  return (
    <div className={styles.navbar.ui}>
      <div className={styles.navbar.uiInner}>
        <MenuIcon className={styles.navbar.icon} />
        <h1 className={generalStyles.headings.h1}>{t("daw")}</h1>
      </div>
      {/* TODO add UI:nav (with List in it) */}
      <nav>
        <List items={[{ children }]} />
      </nav>
    </div>
  );
}
