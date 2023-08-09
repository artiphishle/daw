import { MouseEvent, type ReactNode } from "react";

interface IAccordionSummaryProps {
  children: ReactNode;
}

export default function AccordionSummary({ children }: IAccordionSummaryProps) {
  function handleClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    console.log(event.currentTarget, event.target);

    const { target } = event;
  }

  return (
    <summary className="list-none" onClick={handleClick}>
      {children}
    </summary>
  );
}
