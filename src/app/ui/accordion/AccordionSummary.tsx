import cn from "classnames";
import { MouseEvent, type ReactNode } from "react";

interface IAccordionSummaryProps {
  children: ReactNode;
  className?: string;
}

export default function AccordionSummary({
  children,
  className = "",
}: IAccordionSummaryProps) {
  function toggleAccordion(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    // const { target } = event;
    console.log(event.currentTarget, event.target);
  }

  return (
    <summary className={cn("list-none", className)} onClick={toggleAccordion}>
      {children}
    </summary>
  );
}
