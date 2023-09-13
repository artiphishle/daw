import { useState, type ReactNode, MouseEvent, ReactEventHandler } from "react";

interface IAccordionDetailsProps {
  children: ReactNode;
  open?: boolean;
}

export default function AccordionDetails({
  children,
  open = false,
}: IAccordionDetailsProps) {
  const [y, setY] = useState<number>(0);
  const [yAfter, setYAfter] = useState<number>(0);

  const onDragStart = (event: MouseEvent) => {
    console.log("START", event.clientY);
    setY(event.clientY);
  };
  const onDragEnd = (event: MouseEvent) => setYAfter(event.clientY);

  // TODO investigate <Details> toggle event, and how to avoid open accordion when dragging
  const onToggle: ReactEventHandler<HTMLDetailsElement> = (event) => {
    if (Math.abs(y - yAfter) > 10) {
      console.log("NOT TOGGLEABLE");
      event.preventDefault();
      event.stopPropagation();
    } else console.log("togglimi");
  };

  return (
    <details
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onToggle={onToggle}
      open={open}
    >
      {children}
    </details>
  );
}
