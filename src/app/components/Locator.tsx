import { useEffect, useState } from "react";
import cn from "classnames";

import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

import { EUnit } from "@/app/types";
import type { Time as TTime } from "tone/build/esm/core/type/Units";
import useProjectSettings from "../hooks/useProjectSettings";

interface ILocator {
  // transport: ITransport;
  className?: string;
}

export default function Locator({ className = "" }: ILocator) {
  const [left, setLeft] = useState(DEFAULT_OFFSET_LEFT);

  const styles = { locator: "bg-black w-[1px] absolute top-0 bottom-0" };

  const getMeasure = (time: TTime = position) => parseInt(splitPosition[0]);
  const getQuarter = (time: TTime = position) => parseInt(splitPosition[1]);
  const getMeasureWidth = (measureCount: number) =>
    (window.innerWidth - left) / measureCount;

  const { projectSettings, isLoading, error } = useProjectSettings();
  if (isLoading) return <div>Loading...</div>;
  if (error || !projectSettings) return <div>Error: {error}</div>;
  const { measureCount, position } = projectSettings;

  const splitPosition = position.toString().split(":");

  const measureWidth = getMeasureWidth(measureCount);
  const currentMeasure = getMeasure(position);
  const currentQuarter = getQuarter(position);
  const newMeasureLeft = measureWidth * currentMeasure + DEFAULT_OFFSET_LEFT;
  const newQuarterLeft = (measureWidth / 4) * currentQuarter;

  const newLeft = newMeasureLeft + newQuarterLeft;
  if (newLeft !== left) setLeft(newLeft);
  console.log("[Locator] position:", position, newLeft);

  return (
    <div
      // TODO how not to use inline styles?
      style={{ left: `${left}${EUnit.Px}` }}
      className={cn(styles.locator, className)}
    />
  );
}
