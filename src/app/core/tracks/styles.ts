import { ETrackType } from "./types";

const colors = {
  gray: "gray",
  orange: "orange",
  purple: "purple",
  white: "white",
};

const semanticColors = {
  track: {
    [ETrackType.Audio]: { bg: colors.purple },
    [ETrackType.Group]: { bg: colors.white },
    [ETrackType.Midi]: { bg: colors.orange },
    [ETrackType.Time]: { bg: colors.gray },
  },
};

const styles = {
  button: {
    primary: "flex items-center justify-center p-4 bg-green-600 text-white",
  },
  bg: {
    pad: `bg-${colors.white}`,
    padActive: "bg-orange-400",
  },
  dialog:
    "flex flex-col shadow-2xl p-4 w-22 absolute top-0 left-0 right-0 bottom-0",
  track: {
    column1: (trackType: ETrackType) =>
      `flex justify-between items-center px-4 py-1 border-r border-r-${semanticColors.track[trackType].bg}-200`,
    icon: (trackType: ETrackType) =>
      `fill-${semanticColors.track[trackType]}-400 w-10`,
    row: (trackType: ETrackType) => `flex w-full mb-2 items-center text-xs`,
  },
};

export { styles };
