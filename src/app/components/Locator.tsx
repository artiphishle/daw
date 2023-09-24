import { useState } from "react";
import cn from "classnames";

import useTransport from "@/app/core/hooks/useTransport";
import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

import { EUnit } from "@/app/types/utility";
import type { IProjectContext } from "@/app/core/config/types";

interface ILocator {
  className?: string;
  projectContext: IProjectContext;
}

const styles = { locator: "bg-black w-[1px] absolute top-0 bottom-0" };
const getMeasureWidth = (measureCount: number) =>
  (window.innerWidth - DEFAULT_OFFSET_LEFT) / measureCount;

export default function Locator({ className = "", projectContext }: ILocator) {
  const [left, setLeft] = useState(DEFAULT_OFFSET_LEFT);
  const [quarter, setQuarter] = useState(0);
  const { measureCount } = projectContext;

  function loopFn(position: string) {
    const splitPosition = position.toString().split(":");

    const currentMeasure = parseInt(splitPosition[0]);
    const currentQuarter = parseInt(splitPosition[1]);
    if (currentQuarter === quarter) return;

    const measureWidth = getMeasureWidth(measureCount);
    const newMeasureLeft = measureWidth * currentMeasure + DEFAULT_OFFSET_LEFT;
    const newQuarterLeft = (measureWidth / 4) * currentQuarter;
    setQuarter(newQuarterLeft);

    const newLeft = newMeasureLeft + newQuarterLeft;
    if (newLeft !== left) setLeft(newLeft);
  }

  useTransport({ loopFn });

  return (
    <div
      // TODO how not to use inline styles?
      style={{ left: `${left}${EUnit.Px}` }}
      className={cn(styles.locator, className)}
    />
  );
}
