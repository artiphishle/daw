import { ETrackType } from "@/app/types/daw";

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
    text: "text-cyan-800",
    border: "text-gray-300",
  },
  [ETrackType.Instrument]: {
    bg: "bg-gray-100",
    text: "text-cyan-800",
    border: "text-gray-300",
  },
  [ETrackType.Group]: {
    bg: "bg-green-100",
    text: "text-cyan-800",
    border: "bg-gray-300",
  },
  [ETrackType.Sampler]: {
    bg: "bg-gray-100",
    text: "text-cyan-800",
    border: "bg-gray-300",
  },
};

const styles = {
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
  arranger: { main: "relative bg-white" },
  navbar: {
    ui: "p-4 flex flex-row mb-6 w-full bg-black text-white items-center justify-between",
    uiInner: "flex px-4 py-2",
    icon: "w-8 h-8 mr-2",
  },
  mixer: {
    main: "bg-white p-1 pt-4 flex justify-between w-full",
    inner: "flex w-full",
    track: {
      main: "border mr-2 justify-center text-xs items-center",
      inner: "flex px-4 py-1 border-b border-white",
      master:
        "h-full flex flex-col justify-end bg-white text-cyan-900 border border-cyan-900",
      active: "text-black border border-black font-bold",
      inactive: "border border-gray-400",
    },
  },
  notes: {
    main: "flex flex-1 justify-center items-center mr-1 text-black text-center cursor-pointer text-[0.5rem]",
    bg: `bg-transparent`,
    bgActive: `bg-cyan-900 text-white`,
  },
  track: {
    time: "flex w-full bg-white text-gray-500 text-xs",
    active: "font-bold text-black bg-[#00000020]",
    col1: {
      main: (trackType: ETrackType) => `flex justify-between items-center px-4`,
      name: "whitespace-nowrap w-28 overflow-x-hidden text-ellipsis",
    },
    col2: {
      main: `relative flex w-full`,
    },
    icon: (trackType: ETrackType) =>
      `fill-${TrackColor[trackType]}-400 w-6 h-6`,
    row: (trackType: ETrackType) =>
      `relative flex w-full h-10 ${TrackColor[trackType].bg} text-black mb-[1px] first:text-gray-400 first:mb-0 text-xs`,
  },
};

export { TrackColor };
export default styles;
