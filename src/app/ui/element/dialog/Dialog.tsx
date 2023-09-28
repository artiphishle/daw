import { AllHTMLAttributes } from "react";

interface IDialog extends AllHTMLAttributes<HTMLDialogElement> {}

function Dialog({ children, ...rest }: IDialog) {
  return <dialog {...rest}>{children}</dialog>;
}

export { Dialog };
