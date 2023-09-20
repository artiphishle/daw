import classNames from "classnames";
import { MouseEvent, useState } from "react";
import Anchor, { type IAnchor } from "@/app/ui/a/Anchor";

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
        const styles = classNames(
          className,
          isActive ? "bg-white" : "bg-[#f1f1f280] mr-1 py-1"
        );
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
