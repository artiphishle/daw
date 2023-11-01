'use client';
export function Instrument({ activeTrack, close }: any) {
  const ActiveInstrument = activeTrack.routing.input.instrument!.Instrument!;
  console.log('[Instrument] client-side');

  return (
    <ActiveInstrument
      key={`track-${activeTrack.id}-instrument`}
      close={close}
    />
  );
}
