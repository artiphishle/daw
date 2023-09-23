import { ReactNode } from "react";

interface IFlex {
  children: [ReactNode, ReactNode];
  vertical?: boolean;
}

export default function Flex({ children, vertical = false }: IFlex) {
  return (
    <div className={`flex flex-${vertical ? "column" : "row"}`}>{children}</div>
  );
}
