import usePortal from "react-useportal";

export default function useAudioInstrument() {
  const { isOpen, openPortal, togglePortal, closePortal, Portal } = usePortal();

  return {
    InstrumentPortal: Portal,
    openInstrument: openPortal,
    toggleInstrument: togglePortal,
    closeInstrument: closePortal,
    isOpen,
  };
}
