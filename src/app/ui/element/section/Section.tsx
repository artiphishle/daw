import { ReactNode } from "react";

interface ISection {
  readonly children: ReactNode;
  readonly className?: string;
}

function Section({ children, ...rest }: ISection) {
  return <section {...rest}>{children}</section>;
}

export { Section };
