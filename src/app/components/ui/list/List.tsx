import { MouseEvent } from "react";
import cn from "classnames";

import { type LucideIcon } from "lucide-react";

interface IListItem {
  Icon?: LucideIcon;
  text?: string;
}

interface IListProps {
  active?: number;
  items: IListItem[];
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

export default function List({ active = 1, items }: IListProps) {
  return (
    <ul className="flex">
      {items.map(({ Icon, text }, itemIndex) => (
        <li
          className={cn(
            active === itemIndex ? "border-none bg-gray-100" : "bg-slate-200",
            "p-4 border-b border-b-slate-200"
          )}
          key={`li-${itemIndex}`}
        >
          <div className="flex gap-1">
            {Icon && <Icon />}
            {text && <span>{text}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export type { IListItem };
