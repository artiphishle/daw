import { type MouseEvent } from "react";
import List, { type IListItem } from "../list/List";

interface IContextMenuProps {
  items: IListItem[];
}

export default function Context({ items }: IContextMenuProps) {
  function handleClick(event: MouseEvent<HTMLLIElement>) {
    // TODO
    console.info("[Context] clicked:", event.target);
  }

  return <List items={items} onClick={handleClick} />;
}
