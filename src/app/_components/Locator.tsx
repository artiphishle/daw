'use client';
import { useEffect, useState } from 'react';
import cn from 'classnames';

import { DEFAULT_OFFSET_LEFT } from 'app/_common/constants';

import { EUnit } from 'app/_common/types/utility.types';

import styles from 'app/_common/styles';
const $ = styles.locator;

interface ILocator {
  position: string;
  className?: string;
}

const getMeasureWidth = (measureCount: number) =>
  (window.innerWidth - DEFAULT_OFFSET_LEFT) / measureCount;

export function Locator({ position, className = '' }: ILocator) {
  const measureCount = 2;
  const [left, setLeft] = useState(DEFAULT_OFFSET_LEFT);
  const updateLocator = (position: string) => {
    const [measures, quarters, sixteenths] = position
      .toString()
      .split(':')
      .map((s) => parseInt(s, 10));

    const measureWidth = getMeasureWidth(measureCount);
    const newMeasures = measureWidth * measures + DEFAULT_OFFSET_LEFT;
    const newQuarters = (measureWidth / 4) * quarters;
    const newSixteenths = (measureWidth / 16) * sixteenths;
    const newLeft = newMeasures + newQuarters + newSixteenths;
    if (newLeft !== left) setLeft(newLeft);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateLocator(position), [position]);

  return (
    <div style={{ left: `${left}${EUnit.Px}` }} className={cn($, className)} />
  );
}
