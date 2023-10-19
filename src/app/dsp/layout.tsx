import { Metadata } from "next";
import { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

export const metadata: Metadata = {
  description: "DSP Example Oage",
  title: "DSP",
};

export default function Layout({ children }: ILayout) {
  return (
    <>
      <header>Hi</header>
      <main>{children}</main>
    </>
  );
}
