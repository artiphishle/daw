'use client';
import { type ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface IDroppableProps {
  id: string;
  children?: ReactNode;
}

function Droppable({ children, id }: IDroppableProps) {
  const { setNodeRef } = useDroppable({ id });
  return <section ref={setNodeRef}>{children}</section>;
}

export default Droppable;
