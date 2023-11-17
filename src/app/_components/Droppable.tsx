'use client';
import { useDroppable } from '@dnd-kit/core';

import type { IDroppable } from '@/common/types/project.types';

export function Droppable({ children, id }: IDroppable) {
  const { setNodeRef } = useDroppable({ id });
  return <section ref={setNodeRef}>{children}</section>;
}
