import { NextApiRequest, NextApiResponse } from "next";

import { DefaultPreset } from "@/pages/api/project/presets/DefaultPreset";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(DefaultPreset);
    case "PATCH":
      return res
        .status(200)
        .json({ ...DefaultPreset, ...JSON.parse(req.body) });
    default:
      return res.status(405).end();
  }
}
