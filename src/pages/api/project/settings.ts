import { NextApiRequest, NextApiResponse } from "next";

import { DefaultPreset } from "./presets/DefaultPreset";

let projectSettings = DefaultPreset;

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

    default:
      return res.status(405).end();
  }
}
