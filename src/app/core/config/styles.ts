import { ETrackType } from "@/app/components/track/types";

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
    text: "text-green-800",
    border: "bg-gray-300",
  },
  [ETrackType.Time]: {
    bg: "bg-transparent",
    text: "text-gray-800",
    border: "text-gray-300",
  },
};

const styles = {
  // Native HTML elements
  button: {
    primary: `flex items-center justify-center p-4 bg-green-500 text-white`,
    navbar:
      "mr-1 w-11 h-11 p-2 bg-[#333] rounded-xs cursor-pointer hover:bg-[#222]",
  },
  dialog:
    "flex flex-col shadow-2xl p-4 w-22 absolute top-0 left-0 right-0 bottom-0",
  headings: {
    h1: "text-3xl font-black",
    h2: "text-2xl font-bold",
    h3: "text-xl font-semibold",
  },
  main: "relative h-full flex flex-1 justify-between",
  // Custom components
  navbar: {
    ui: "p-4 flex flex-row mb-6 w-full bg-black text-white items-center justify-between",
    uiInner: "flex px-4 py-2",
    icon: "w-8 h-8 mr-2",
  },
  mixer: {
    main: "bg-[#fff] p-1 pt-4 flex justify-between w-full",
    inner: "flex w-full",
    track: {
      main: "border mr-2 justify-center text-xs items-center",
      inner: "flex px-4 py-1 border-b border-white",
      master: "h-full flex flex-col justify-end bg-cyan-100",
      active: "text-black border border-orange-800 font-bold",
      inactive: "border border-gray-400",
    },
  },
  notes: {
    main: "flex flex-1 justify-center items-center mr-1 text-white text-center cursor-pointer text-[0.6rem]",
    bg: `bg-transparent`,
    bgActive: `bg-orange-300`,
  },
  track: {
    active: "font-bold bg-white text-black border border-orange-800",
    col1: {
      main: (trackType: ETrackType) =>
        `flex justify-between items-center px-4 py-1 border-r border-r-${TrackColor[trackType].border}`,
      name: "whitespace-nowrap w-28 overflow-x-hidden text-ellipsis",
    },
    col2: {
      main: `relative flex w-full border-r border-${EColor.Orange}-300`,
    },
    icon: (trackType: ETrackType) => `fill-${TrackColor[trackType]}-400 w-10`,
    row: (trackType: ETrackType) =>
      `relative flex w-full text-xs ${TrackColor[trackType].bg} ${TrackColor[trackType].text} mb-1 first:text-gray-400 first:mb-0`,
  },
};

export { TrackColor };
export default styles;
