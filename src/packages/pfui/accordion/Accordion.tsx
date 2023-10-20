import { AccordionDetails, AccordionSummary } from "packages/pfui";
import { ReactNode } from "react";

interface IAccordionProps {
  summary: ReactNode;
  classNameDetails?: string;
  details?: ReactNode;
  open?: boolean;
}

function Accordion({
  details,
  summary,
  classNameDetails = "",
  open = false,
}: IAccordionProps) {
  return (
    <section>
      <AccordionDetails open={open} className={classNameDetails}>
        <AccordionSummary>{summary}</AccordionSummary>
        {details && details}
      </AccordionDetails>
    </section>
  );
}

export { Accordion };
