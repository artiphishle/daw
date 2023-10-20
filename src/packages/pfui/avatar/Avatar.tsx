import classNames from "classnames";
import { UserIcon } from "lucide-react";
import type { IAvatar } from "packages/pfui";
import styles from "app/common/styles";

function Avatar({ bordered = true, className, rounded = true }: IAvatar) {
  const css = styles.avatar;
  const props = {
    className: classNames(
      { className },
      css.main,
      { [css.bordered]: bordered },
      { [css.rounded]: rounded }
    ),
  };

  return (
    <div {...props}>
      <UserIcon className={css.icon} />
    </div>
  );
}

export { Avatar };
