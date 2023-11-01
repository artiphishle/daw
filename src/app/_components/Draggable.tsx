'use client';
import { type ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface IDraggableProps {
  children: ReactNode;
  id: string;
}

export default function Draggable({ id, children }: IDraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : {};

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
