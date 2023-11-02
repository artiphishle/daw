'use client';
import type { ITrack } from '@/common/types/track.types';

export function Instrument({
  activeTrack,
  onClose,
}: {
  activeTrack: ITrack;
  onClose: () => void;
}) {
  const ActiveInstrument = activeTrack.routing.input.instrument?.Instrument!;
  console.log('[Instrument] client-side', ActiveInstrument);

  return (
    <ActiveInstrument
      key={`track-${activeTrack.id}-instrument`}
      onClose={() => onClose()}
    />
  );
}
