import usePortal from "react-useportal";

export default function useInstrument() {
  const { isOpen, openPortal, togglePortal, closePortal, Portal } = usePortal();

  return {
    Instrument: Portal,
    openInstrument: openPortal,
    toggleInstrument: togglePortal,
    closeInstrument: closePortal,
    isOpen,
  };
}
