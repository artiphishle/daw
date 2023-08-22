import { useEffect, useState } from "react";
import { Loop, Time, Transport } from "tone";
import type { Time as TTime } from "tone/build/esm/core/type/Units";
import cn from "classnames";

import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

import { EUnit } from "@/app/types";

interface ILocatorProps {
  className?: string;
  transport: any;
}

export default function Locator({ className = "", transport }: ILocatorProps) {
  const { measureCount, position, setPosition } = transport;
  const fn = {
    get: {
      measure: {
        width: () => (window.innerWidth - DEFAULT_OFFSET_LEFT) / measureCount,
      },
    },
  };
  const measureWidth = fn.get.measure.width();

  const [left, setLeft] = useState(DEFAULT_OFFSET_LEFT);

  useEffect(() => {
    const getMeasure = (time: TTime = position) => parseInt(splitPosition[0]);
    const getQuarter = (time: TTime = position) => parseInt(splitPosition[1]);

    const splitPosition = position.toString().split(":");
    const currentMeasure = getMeasure(position);
    const currentQuarter = getQuarter(position);
    const newMeasureLeft = measureWidth * currentMeasure + DEFAULT_OFFSET_LEFT;
    const newQuarterLeft = (measureWidth / 4) * currentQuarter;
    const newLeft = newMeasureLeft + newQuarterLeft;
    if (newLeft !== left) setLeft(newLeft);
  }, [measureWidth, left, position]);

  useEffect(() => {
    const loop = new Loop((time) => {
      setPosition(Time(Transport.position).toBarsBeatsSixteenths());
    }, "16n");
    loop.start(0);
    loop.stop(`${measureCount}m`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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