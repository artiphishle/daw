import { type ReactNode } from "react";

interface IAccordionProps {
  children: ReactNode;
}

export default function Accordion({ children }: IAccordionProps) {
  return <section>{children}</section>;
}
