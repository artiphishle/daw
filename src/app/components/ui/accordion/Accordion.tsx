import AccordionDetails from "@/app/components/ui/accordion/AccordionDetails";
import AccordionSummary from "@/app/components/ui/accordion/AccordionSummary";

interface IAccordionProps {
  summary: JSX.Element;
  details?: JSX.Element;
  open?: boolean;
}

export default function Accordion({
  details,
  summary,
  open = false,
}: IAccordionProps) {
  return (
    <section>
      <AccordionDetails open={open}>
        <AccordionSummary>{summary}</AccordionSummary>
        {details && details}
      </AccordionDetails>
    </section>
  );
}
