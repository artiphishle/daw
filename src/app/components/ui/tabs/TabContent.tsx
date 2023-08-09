import { type ReactNode } from "react";

interface ITabContentProps {
  children: ReactNode;
}

export default function TabContent({ children }: ITabContentProps) {
  return <section>{children}</section>;
}
