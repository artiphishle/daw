import { type ReactNode } from "react";

interface IAccordionDetailsProps {
  children: ReactNode;
}

export default function AccordionDetails({ children }: IAccordionDetailsProps) {
  return <details>{children}</details>;
}
