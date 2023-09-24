import classNames from "classnames";
import { ReactNode } from "react";

export interface ITabsPanel {
  id: string;
  isActive: boolean;
  Content: ReactNode;
  className?: string;
}

export default function TabPanel({
  isActive,
  id,
  Content,
  className = "",
}: ITabsPanel) {
  return (
    <section
      className={classNames(
        isActive ? "flex flex-col justify-between" : "hidden",
        className
      )}
      id={`${id}-panel`}
      role="tabpanel"
      aria-labelledby={`${id}`}
      tabIndex={0}
    >
      {Content}
    </section>
  );
}
