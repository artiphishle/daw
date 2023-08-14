import { type ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

interface IDraggableProps {
  children: ReactNode;
}

export default function Draggable({ children }: IDraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
