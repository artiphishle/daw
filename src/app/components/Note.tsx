import classNames from "classnames";

import styles from "config/styles";

import type { AllHTMLAttributes, CSSProperties } from "react";
import type { Note as TNote } from "tone/build/esm/core/type/NoteUnits";

interface INote extends AllHTMLAttributes<HTMLDivElement> {
  note: TNote;
  style: CSSProperties;
}

export default function Note({ note, onClick, className = "", style }: INote) {
  // TODO dependency injection of styles
  const $ = styles.notes;
  const props = {
    className: classNames("absolute", $.main, $.bgActive, { className }),
    onClick,
    style,
  };

  return <div {...props}>{note}</div>;
}
