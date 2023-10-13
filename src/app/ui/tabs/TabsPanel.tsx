import classNames from "classnames";
import { ReactNode } from "react";

export interface ITabsPanel {
  id: string;
  isActive?: boolean;
  Content: ReactNode;
  className?: string;
}

function TabsPanel({ isActive = false, id, Content, className }: ITabsPanel) {
  if (!isActive) return null;

  return (
    <section
      className={classNames("flex flex-col flex-1", className, {
        hidden: !isActive,
      })}
      id={`${id}-panel`}
      role="tabpanel"
      aria-labelledby={`${id}`}
      tabIndex={0}
    >
      {Content}
    </section>
  );
}

export { TabsPanel };
