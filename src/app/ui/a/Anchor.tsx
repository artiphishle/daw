import cn from "classnames";
import { MouseEvent } from "react";

export interface IAnchor {
  href: string;
  id: string;
  children: JSX.Element;
  className?: string;
  order?: number;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default function Anchor({
  children,
  href,
  id,
  className,
  order,
  onClick,
}: IAnchor) {
  const styles = {
    anchor: cn("relative", { className, order: `order-${order}` }),
    icon: "absolute-0",
  };

  return (
    <a
      id={id}
      className={cn("relative", className, { order: `order-${order}` }, "p-4")}
      href={href}
      tabIndex={order}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
