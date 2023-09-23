import { NextApiRequest, NextApiResponse } from "next";

import { DefaultPreset } from "./presets/DefaultPreset";

let ProjectContext = DefaultPreset;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(ProjectContext);

    case "PATCH":
      ProjectContext = Object.assign(
        {},
        {
          ...ProjectContext,
          ...JSON.parse(req.body),
        }
      );
      return res.status(200).json(ProjectContext);

    default:
      return res.status(405).end();
  }
}
