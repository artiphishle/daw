import { MenuIcon } from "lucide-react";

import Transport from "@/app/components/Transport";
import t from "@/app/core/i18n";
import generalStyles from "@/app/core/config/styles";

export default function Toolbar() {
  return (
    <div className="flex flex-row mb-2 w-full bg-black text-white items-center justify-between">
      <div className="flex px-4 py-2">
        <MenuIcon className="w-8 h-8 mr-2" />
        <h1 className={generalStyles.headings.h1}>{t("daw")}</h1>
      </div>
      <Transport />
    </div>
  );
}
