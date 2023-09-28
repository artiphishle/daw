import type { IOl } from "@/ui";

export default function Ol({ children, className }: IOl) {
  return <ol className={className}>{children}</ol>;
}

export { Ol };
