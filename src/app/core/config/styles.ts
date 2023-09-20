import { ETrackType } from "@/app/core/tracks/types";

export enum EColor {
  Gray = "gray",
  Green = "green",
  Orange = "orange",
  Purple = "purple",
  Red = "red",
  White = "white",
  Transparent = "transparent",
}

const SemColor = {
  Primary: { bg: "bg-blue-500", text: "text-white" },
  Secondary: { bg: "bg-gray-500", text: "text-white" },
};

const TrackColor = {
  [ETrackType.Audio]: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "text-purple-300",
  },
  [ETrackType.Midi]: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "text-orange-300",
  },
  [ETrackType.Group]: {
    bg: "bg-green-100",
    text: "text-gray-800",
    border: "bg-gray-300",
  },
  [ETrackType.Time]: {
    bg: "bg-transparent",
    text: "text-gray-800",
    border: "text-gray-300",
  },
};

const styles = {
  button: {
    primary: `flex items-center justify-center p-4 bg-green-500 text-white`,
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
    bgActive: `bg-orange-300`,
  },
  track: {
    active: "font-bold bg-white text-black border border-2 border-black",
    col1: {
      main: (trackType: ETrackType) =>
        `flex justify-between items-center px-4 py-1 border-r border-r-${TrackColor[trackType].border}`,
      name: "whitespace-nowrap w-28 overflow-x-hidden text-ellipsis",
    },
    col2: {
      main: `flex w-full border-r border-${EColor.Orange}-300`,
    },
    icon: (trackType: ETrackType) => `fill-${TrackColor[trackType]}-400 w-10`,
    row: (trackType: ETrackType) =>
      `relative flex w-full text-xs ${TrackColor[trackType].bg} ${TrackColor[trackType].text} mb-1 first:text-gray-400 first:mb-0`,
  },
};

export { TrackColor };
export default styles;
