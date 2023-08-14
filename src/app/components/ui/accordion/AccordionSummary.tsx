import { MouseEvent, type ReactNode } from "react";

interface IAccordionSummaryProps {
  children: ReactNode;
}

export default function AccordionSummary({ children }: IAccordionSummaryProps) {
  function toggleAccordion(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    // const { target } = event;
    console.log(event.currentTarget, event.target);
  }

  return (
    <summary className="list-none" onClick={toggleAccordion}>
      {children}
    </summary>
  );
}
