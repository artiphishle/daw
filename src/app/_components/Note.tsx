import classNames from 'classnames';

import type { AllHTMLAttributes, CSSProperties } from 'react';

import styles from 'app/_common/styles';
const $ = styles.notes;

interface INote extends AllHTMLAttributes<HTMLDivElement> {
  index: number;
  style: CSSProperties;
}

export default function Note({
  index,
  onClick,
  className = '',
  style,
  value = '',
}: INote) {
  // TODO dependency injection of styles
  const props = {
    className: classNames('absolute', $.main, $.bgActive, { className }),
    onClick,
    style,
  };

  return (
    <div data-index={index} data-type="note" {...props}>
      {value}
    </div>
  );
}
