import { type MouseEvent, useState } from "react";

import { Nav, TabsPanel } from "@/app/ui";
import classNames from "classnames";

export interface ITabsItem {
  children: JSX.Element;
  href: string;
  id: string;
  order: number;
  panel: JSX.Element;
  title: string;
}

export interface ITabs {
  activeIndex: number;
  items: ITabsItem[];
  className?: string;
  vertical?: boolean;
}

export default function Tabs({
  activeIndex = 0,
  items,
  className = "",
  vertical = false,
}: ITabs) {
  const [tabItems] = useState(items);
  const [activeTabIndex, setActiveTabIndex] = useState(activeIndex);

  const events = {
    on: {
      click: (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const tab = e.currentTarget as HTMLAnchorElement;
        setActiveTabIndex(tab.tabIndex - 1);
        console.info("[Tabs] activeIndex:", tab.tabIndex - 1);
      },
    },
  };

  return (
    <section
      className={classNames(
        className,
        "flex flex-1",
        vertical ? "" : "flex-col"
      )}
    >
      <Nav
        activeIndex={activeTabIndex}
        items={tabItems}
        role="tablist"
        onClick={events.on.click}
      />
      {tabItems.map(({ id, panel }, itemIndex) => {
        const isActive = activeTabIndex === itemIndex;
        return isActive ? (
          <TabsPanel Content={panel} id={id} isActive={isActive} key={id} />
        ) : null;
      })}
    </section>
  );
}
