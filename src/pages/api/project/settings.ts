import { NextApiRequest, NextApiResponse } from "next";

import { DEFAULT_TRACKS } from "@/app/core/config/constants";
import t from "@/app/core/i18n";

import { ETrackType } from "@/app/core/tracks/types";
import type { TTrackConfig } from "@/app/core/config/types";
import type { IMixer } from "@/app/components/Mixer";

export interface IConfig {
  bpm: number;
  clef: string;
  measureCount: number;
  mixer: IMixer;
  name: string;
  position: string;
  quantization: number;
  tracks: TTrackConfig[];
}

const defaultProjectSettings: IConfig = {
  bpm: 120,
  clef: "C",
  measureCount: 8,
  mixer: {
    visibility: {
      [ETrackType.Audio]: true,
      [ETrackType.Midi]: true,
    },
  },
  name: t("project.new"),
  position: "0:0:0",
  quantization: 8,
  tracks: DEFAULT_TRACKS,
};

// TODO persist project settings instead
let projectSettings = defaultProjectSettings;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(projectSettings);

    case "PATCH":
      projectSettings = {
        ...projectSettings,
        ...JSON.parse(req.body),
      };
      return res.status(200).json(projectSettings);
  }
}
