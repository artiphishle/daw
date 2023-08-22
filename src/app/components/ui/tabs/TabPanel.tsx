import { ReactNode } from "react";

export interface ITabPanel {
  id: string;
  isActive: boolean;
  Content: ReactNode;
}

export default function TabPanel({ isActive, id, Content }: ITabPanel) {
  return (
    <section
      className={isActive ? "" : "hidden"}
      id={`${id}-panel`}
      role="tabpanel"
      aria-labelledby={`${id}`}
      tabIndex={0}
    >
      {Content}
    </section>
  );
}
