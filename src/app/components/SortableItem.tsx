import React, { type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";

import styles from "app/common/styles";

import type { UniqueIdentifier } from "@dnd-kit/core";

interface ISortableItemProps {
  children: ReactNode;
  className: string;
  id: UniqueIdentifier;
}

export default function SortableItem({
  children,
  className,
  id,
}: ISortableItemProps) {
  const css = styles.track;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      id={id as string}
      className={className}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div {...listeners} className="absolute left-0 bottom-0 top-0 right-auto">
        <GripVerticalIcon />
      </div>
      {children}
    </li>
  );
}
