import classNames from "classnames";
import { UserIcon } from "lucide-react";
import type { IAvatar } from "@/ui";

const css = {
  main: "flex items-center justify-center bg-cyan-700 text-white cursor-pointer w-12 h-12 hover:rotate-180",
  bordered: "border border-cyan-400",
  rounded: "rounded-full",
};

function Avatar({ bordered = true, rounded = true }: IAvatar) {
  const props = {
    className: classNames(
      css.main,
      { [css.bordered]: bordered },
      { [css.rounded]: rounded }
    ),
  };

  return (
    <div {...props}>
      <UserIcon className="w-8 h-8" />
    </div>
  );
}

export { Avatar };
