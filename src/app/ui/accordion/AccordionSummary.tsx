import { useState, type MouseEvent, type ReactNode } from "react";
import cn from "classnames";

interface IAccordionSummaryProps {
  children: ReactNode;
  className?: string;
}

export default function AccordionSummary({
  children,
  className = "",
}: IAccordionSummaryProps) {
  return <summary className={cn("list-none", className)}>{children}</summary>;
}
