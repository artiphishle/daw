'use client';
import { useCallback, useEffect, useState } from 'react';
import * as Tone from 'tone';
import cn from 'classnames';

import { DEFAULT_OFFSET_LEFT } from 'app/_common/constants';

import { EUnit } from 'app/_common/types/utility.types';
import {
  ETransportState,
  type IProjectContext,
} from 'app/_common/types/project.types';

import styles from 'app/_common/styles';
const $ = styles.locator;

interface ILocator {
  projectContext: IProjectContext;
  className?: string;
}

const getMeasureWidth = (measureCount: number) =>
  (window.innerWidth - DEFAULT_OFFSET_LEFT) / measureCount;

export default function Locator({ className = '', projectContext }: ILocator) {
  const { measureCount } = projectContext;
  const [left, setLeft] = useState(DEFAULT_OFFSET_LEFT);
  const [previousSixteenths, setPrevSixteenths] = useState(0);
  const [updateInterval, setUpdateInterval] = useState<any>();

  const updateLocator = useCallback((position: string) => {
    const [measures, quarters, sixteenths] = position
      .toString()
      .split(':')
      .map((s) => parseInt(s, 10));
    if (sixteenths === previousSixteenths) return;

    const measureWidth = getMeasureWidth(measureCount);
    const newMeasures = measureWidth * measures + DEFAULT_OFFSET_LEFT;
    const newQuarters = (measureWidth / 4) * quarters;
    const newSixteenths = (measureWidth / 16) * sixteenths;
    setPrevSixteenths(newSixteenths);

    const newLeft = newMeasures + newQuarters + newSixteenths;
    if (newLeft !== left) setLeft(newLeft);
    console.log('left', left);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      if (Tone.Transport.state !== ETransportState.Started)
        return clearInterval(updateInterval!);

      const position = Tone.Transport.position.toString();
      const interval = setInterval(() => updateLocator(position), 200);
      setUpdateInterval(interval);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Tone.Transport.state],
  );

  return (
    <div style={{ left: `${left}${EUnit.Px}` }} className={cn($, className)} />
  );
}
