import { ReactNode } from "react";

interface IDialogProps {
  children: ReactNode;
  className?: string;
  id: string;
  open?: boolean;
}

export default function Dialog({
  children,
  className = "",
  id,
  open = false,
}: IDialogProps) {
  return (
    <dialog id={id} className={className} open={open}>
      {children}
    </dialog>
  );
}
