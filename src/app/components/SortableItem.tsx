import React, { type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";

interface ISortableItemProps {
  children: ReactNode;
  id: string;
}

export default function SortableItem({ children, id }: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className="relative" ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} className="absolute left-0 bottom-0 top-0 right-auto">
        <GripVerticalIcon />
      </div>
      {children}
    </li>
  );
}
