import List, { IListItem } from "../list/List";

interface ITabMenuProps {
  items: IListItem[];
}

export default function TabMenu({ items }: ITabMenuProps) {
  return <List items={...items} />;
}
