import { AllHTMLAttributes } from "react";

interface IDialog extends AllHTMLAttributes<HTMLDialogElement> {}

const Dialog = ({ children, ...rest }: IDialog) => (
  <dialog {...rest}>{children}</dialog>
);

export { Dialog };
