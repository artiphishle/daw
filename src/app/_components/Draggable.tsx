'use client';
import { useDraggable } from '@dnd-kit/core';

import type { IDraggable } from '@/common/types/project.types';

export function Draggable({ id, children }: IDraggable) {
  const {
    attributes,
    listeners,
    setNodeRef: ref,
    transform,
  } = useDraggable({ id });

  const { x, y } = transform || {};
  const style = x ? { transform: `translate3d(${x}px, ${y}px, 0)` } : {};
  const props = {
    ...ref,
    ...style,
    ...listeners,
    ...attributes,
    /*** @url{https://docs.dndkit.com/api-documentation/draggable#recommendations} */
    className: 'touch-none',
  };
  return <div {...props}>{children}</div>;
}
