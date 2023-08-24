import { useEffect, useState } from "react";
import cn from "classnames";

import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

import { EUnit } from "@/app/types";
import type { Time as TTime } from "tone/build/esm/core/type/Units";
import { type ITransport } from "@/app/components";

interface ILocator {
  className?: string;
  transport: ITransport;
}

export default function Locator({ className = "", transport }: ILocator) {
  const { measureCount, position, setPosition } = transport;
  const [left, setLeft] = useState(DEFAULT_OFFSET_LEFT);

  function getMeasureWidth() {
    return (window.innerWidth - DEFAULT_OFFSET_LEFT) / measureCount;
  }
  const measureWidth = getMeasureWidth();

  useEffect(() => {
    const splitPosition = position.toString().split(":");
    const getMeasure = (time: TTime = position) => parseInt(splitPosition[0]);
    const getQuarter = (time: TTime = position) => parseInt(splitPosition[1]);

    const currentMeasure = getMeasure(position);
    const currentQuarter = getQuarter(position);
    const newMeasureLeft = measureWidth * currentMeasure + DEFAULT_OFFSET_LEFT;
    const newQuarterLeft = (measureWidth / 4) * currentQuarter;
    const newLeft = newMeasureLeft + newQuarterLeft;
    if (newLeft !== left) setLeft(newLeft);
    console.log("[Locator] position:", position, newLeft);
  }, [measureWidth, left, position]);

  useEffect(() => {}, [position]);

  const styles = {
    locator: "bg-black w-[1px] absolute top-0 bottom-0",
  };

  return (
    <div
      // TODO how not to use inline styles?
      style={{ left: `${left}${EUnit.Px}` }}
      className={cn(styles.locator, className)}
    />
  );
}
