import cn from "classnames";

import type { MouseEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface IListItem {
  Icon?: LucideIcon;
  text?: string;
  children?: ReactNode;
}

interface IList {
  items: IListItem[];
  active?: number;
  // TODO <li> className... change that
  className?: { li: string; liActive: string };
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

export default function List({
  items,
  active,
  className = { li: "", liActive: "" },
}: IList) {
  return (
    <ul className="flex">
      {items.map(({ children, Icon, text }, itemIndex) => {
        const isActive = active === itemIndex;
        const cnActiveOrNot = isActive ? className.liActive : className.li;
        const styles = active === undefined ? "" : cnActiveOrNot;

        return (
          <li className={styles} key={`li-${itemIndex}`}>
            <div className="flex gap-1">
              {children && children}
              {Icon && <Icon />}
              {text && <span>{text}</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export type { IListItem };
