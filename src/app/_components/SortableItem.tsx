'use client';
import classNames from 'classnames';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

import type { ISortableItem } from '@/common/types/project.types';

import $ from '@/common/styles';

export function SortableItem({ children, className, id }: ISortableItem) {
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
      <div
        {...listeners}
        className={classNames($.icon.sm, 'absolute left-[.3rem] top-[.5rem]')}
      >
        <GripVerticalIcon />
      </div>
      {children}
    </li>
  );
}
