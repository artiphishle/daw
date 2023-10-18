import type { IOl } from "packages/ui";

export default function Ol({ children, className }: IOl) {
  return <ul className={className}>{children}</ul>;
}
export { Ol };
