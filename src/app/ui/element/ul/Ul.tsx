import type { IUl } from "@/ui";

export default function Ul({ children, className }: IUl) {
  return <ul className={className}>{children}</ul>;
}

export { Ul };
