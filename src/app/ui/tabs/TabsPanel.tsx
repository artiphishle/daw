import { ReactNode } from "react";

export interface ITabsPanel {
  id: string;
  isActive: boolean;
  Content: ReactNode;
}

export default function TabPanel({ isActive, id, Content }: ITabsPanel) {
  return (
    <section
      className={isActive ? "flex flex-col flex-1 justify-between" : "hidden"}
      id={`${id}-panel`}
      role="tabpanel"
      aria-labelledby={`${id}`}
      tabIndex={0}
    >
      {Content}
    </section>
  );
}
