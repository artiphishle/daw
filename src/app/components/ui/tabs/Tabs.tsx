import { type ReactNode } from "react";

interface ITabsProps {
  children: ReactNode;
}

export default function Tabs({ children }: ITabsProps) {
  return <section>{children}</section>;
}
