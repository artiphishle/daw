"use client";
import classNames from "classnames";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { type MouseEvent, useState, useEffect } from "react";

// Works for 'touchstart' too
enum EMouseButton {
  Left = 0,
  Right = 2,
}
interface IMenu {
  readonly className?: string;
  readonly isContextMenu?: boolean;
}

// TODO move to styles
const $ = {
  main: "absolute bg-black",
  nav: "flex flex-col items-center",
  a: "flex text-white py-2 px-4 gap-2 border-b border-gray-600",
};

// TODO if in arranger let's create new tracks
// if on a track ask to delete it
export function Menu({ className, isContextMenu = false }: IMenu) {
  const [style, setStyle] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);

  // TODO move to utilities
  const on = window?.addEventListener;
  const off = window?.removeEventListener;
  const one = (
    event: string,
    cb: (event: Event) => any,
    options?: { once: true }
  ) => window?.addEventListener(event, cb, { ...options, once: true });

  /*** @pfui (Context-)Menu Activation */
  const menuOn: any = (event: MouseEvent) => {
    const { button, clientX: left, clientY: top } = event;
    event.preventDefault();

    // 1. evaluate if (context-)menu has to be shown
    if (isContextMenu && button === EMouseButton.Left) return;
    if (!isContextMenu && button !== EMouseButton.Right) return;

    // 2. Hide the menu on click outside
    one("click", () => setVisible(false));

    // 3. Update menu position & show
    setStyle({ left, top });
    setVisible(true);
    console.info("[ContextMenu] target:", event.target);
  };

  useEffect(() => {
    on("click", menuOn, true);
    on("touchstart", menuOn, true);
    on("contextmenu", menuOn, true);

    return () => {
      off("click", menuOn, true);
      off("touchstart", menuOn, true);
      off("contextmenu", menuOn, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const event = {
    menuClick: (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setStyle({ left: event.clientX, top: event.clientY });
    },
  };

  return (
    <section
      style={{ ...style }}
      className={classNames(className, $.main, { hidden: !visible })}
    >
      <nav className={$.nav}>
        <a className={$.a} onClick={event.menuClick} href="#">
          <PlusIcon size={24} /> Hardcoded!
        </a>
        <a className={$.a} onClick={event.menuClick} href="#">
          <Trash2Icon size={24} /> Change that!
        </a>
      </nav>
    </section>
  );
}
