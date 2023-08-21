import List, { IListItem } from "../list/List";

interface ITabMenuProps {
  items: IListItem[];
}

export default function TabMenu({ items }: ITabMenuProps) {
  const styles = {
    ui: {
      tabs: {
        nav: "p-4 mr-2 bg-slate-200",
        navActive: "p-4 mr-2 bg-white",
      },
    },
  };

  return (
    <List
      className={{ li: styles.ui.tabs.nav, liActive: styles.ui.tabs.navActive }}
      items={...items}
    />
  );
}
