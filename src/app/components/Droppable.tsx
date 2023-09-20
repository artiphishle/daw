import { type ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

interface IDroppableProps {
  children: ReactNode;
}

export default function Droppable({ children }: IDroppableProps) {
  const { setNodeRef } = useDroppable({ id: "unique-id" });

  return <div ref={setNodeRef}>{children}</div>;
}
