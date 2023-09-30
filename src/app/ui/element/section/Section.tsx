import { ReactNode } from "react";

interface ISection {
  readonly children: ReactNode;
  readonly className?: string;
}

const Section = ({ children, ...rest }: ISection) => (
  <section {...rest}>{children}</section>
);

export { Section };
