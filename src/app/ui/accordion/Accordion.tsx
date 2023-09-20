import { AccordionDetails, AccordionSummary } from "@/app/ui";

interface IAccordionProps {
  summary: JSX.Element;
  classNameDetails?: string;
  details?: JSX.Element;
  open?: boolean;
}

export default function Accordion({
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
