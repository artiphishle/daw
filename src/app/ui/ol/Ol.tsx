import type { IOl } from "@/ui";

export default function Ol({ children, className }: IOl) {
  return <ul className={className}>{children}</ul>;
}
export { Ol };
