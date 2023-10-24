import classNames from 'classnames';

import styles from 'app/common/styles';

import type { AllHTMLAttributes, CSSProperties } from 'react';
import type { Note as TNote } from 'tone/build/esm/core/type/NoteUnits';

interface INote extends AllHTMLAttributes<HTMLDivElement> {
  note: TNote;
  index: number;
  style: CSSProperties;
}

export default function Note({
  index,
  note,
  onClick,
  className = '',
  style,
}: INote) {
  // TODO dependency injection of styles
  const $ = styles.notes;
  const props = {
    className: classNames('absolute', $.main, $.bgActive, { className }),
    onClick,
    style,
  };

  return (
    <div data-index={index} data-type="note" {...props}>
      {note}
    </div>
  );
}
