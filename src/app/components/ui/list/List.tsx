import cn from "classnames";

import type { MouseEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface IListItem {
  Icon?: LucideIcon;
  text?: string;
  children?: ReactNode;
}

interface IListProps {
  items: IListItem[];
  active?: number;
  // TODO <li> className... change that
  className?: { li: string; liActive: string };
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

export default function List({
  items,
  active = 1,
  className = { li: "", liActive: "" },
}: IListProps) {
  return (
    <ul className="flex">
      {items.map(({ children, Icon, text }, itemIndex) => {
        const isActive = active === itemIndex;
        const cnNonActive = isActive ? className.liActive : className.li;
        return (
          <li
            className={cn({ active: isActive }, cnNonActive)}
            key={`li-${itemIndex}`}
          >
            <div className="flex gap-1">
              {Icon && <Icon />}
              {text && <span>{text}</span>}
              {children && children}
              {}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export type { IListItem };
