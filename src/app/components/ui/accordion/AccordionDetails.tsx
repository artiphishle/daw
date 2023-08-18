import { type ReactNode } from "react";

interface IAccordionDetailsProps {
  children: ReactNode;
  open?: boolean;
}

export default function AccordionDetails({
  children,
  open = false,
}: IAccordionDetailsProps) {
  return <details open={open}>{children}</details>;
}
