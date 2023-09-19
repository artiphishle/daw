import { ETrackType } from "../tracks/types";

export enum EColor {
  Gray = "gray",
  Orange = "orange",
  Purple = "purple",
  White = "white",
  Transparent = "transparent",
}

const TrackColor = {
  [ETrackType.Audio]: EColor.Purple,
  [ETrackType.Group]: EColor.White,
  [ETrackType.Midi]: EColor.Orange,
  [ETrackType.Time]: EColor.Transparent,
};

export enum EColorHue {
  Bg = 200,
  Border = 300,
  BgActive = 400,
  Main = 500,
  // = 600
  // = 700
  Text = 800,
}

const semanticColors = {
  track: {},
};

const styles = {
  button: {
    primary: "flex items-center justify-center p-4 bg-green-600 text-white",
  },
  headings: {
    h1: "text-3xl font-black",
    h2: "text-2xl font-bold",
    h3: "text-xl font-semibold",
  },
  main: "relative h-full flex flex-1 justify-between",
  dialog:
    "flex flex-col shadow-2xl p-4 w-22 absolute top-0 left-0 right-0 bottom-0",
  notes: {
    main: "flex flex-1 justify-center items-center mr-1 text-white text-center cursor-pointer text-[0.6rem]",
    bg: `bg-transparent`,
    bgActive: `bg-${EColor.Orange}-${EColorHue.BgActive}`,
  },
  track: {
    col1: {
      main: (trackType: ETrackType) =>
        `flex justify-between items-center px-4 py-1 border-r border-r-${TrackColor[trackType]}-${EColorHue.Border}`,
      name: "whitespace-nowrap w-28 overflow-x-hidden text-ellipsis",
    },
    col2: {
      main: `flex w-full border-r border-${EColor.Orange}-${EColorHue.Border}`,
    },
    icon: (trackType: ETrackType) => `fill-${TrackColor[trackType]}-400 w-10`,
    row: (trackType: ETrackType) =>
      `relative flex w-full text-xs bg-${TrackColor[trackType]}-${EColorHue.Bg} text-${TrackColor[trackType]}-${EColorHue.Text} mb-1 first:text-gray-400 first:mb-0`,
  },
};

export default styles;
