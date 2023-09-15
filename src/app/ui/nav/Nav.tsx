import classNames from "classnames";
import { MouseEvent, useState } from "react";
import Anchor, { type IAnchor } from "../a/Anchor";
import { ITabsItem } from "../tabs/Tabs";

export interface INav {
  items: IAnchor[];
  activeIndex?: number;
  className?: string;
  role?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default function Nav({
  items,
  activeIndex,
  className = "",
  onClick,
  ...props
}: INav) {
  const [navItems, setNavItems] = useState(items);

  return (
    <nav className={`flex items-center ${className}`} {...props}>
      {navItems.map(({ href, id, children, order }, aIndex) => {
        const isActive = activeIndex === aIndex;
        const styles = classNames(className, isActive ? "bg-white" : "");
        return (
          <Anchor
            className={styles}
            id={id}
            href={href}
            key={id}
            onClick={onClick}
            order={order}
          >
            {children}
          </Anchor>
        );
      })}
    </nav>
  );
}
