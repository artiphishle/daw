import classNames from "classnames";

import type { ReactNode } from "react";

interface IAccordionSummaryProps {
  children: ReactNode;
  className?: string;
}

function AccordionSummary({
  children,
  className = "",
}: IAccordionSummaryProps) {
  return (
    <summary className={classNames("cursor-pointer list-none", className)}>
      {children}
    </summary>
  );
}

export { AccordionSummary };
