import classNames from "classnames";
import { Section } from "@/ui";

import { RefObject, type ReactNode } from "react";
import { useActiveState } from "@/ui/hooks/useActiveState";

enum ERole {
  Tablist = "tablist",
}

export interface ITabs {
  readonly children: ReactNode | ReactNode[];
  readonly className?: string;
  readonly initialActive?: number;
  readonly vertical?: boolean;
}

function Tabs({
  children,
  className: _className,
  vertical = false,
  initialActive = 0,
  ...rest
}: ITabs) {
  const flexDir = vertical
? "flex-row"
: "flex-col";
  const className = classNames("flex flex-1", _className, flexDir);
  const role = ERole.Tablist;
  const props = { ...rest, className, role };

  return <Section {...props}>{children}</Section>;
}

export { Tabs };
