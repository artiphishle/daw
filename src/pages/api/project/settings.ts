import { NextApiRequest, NextApiResponse } from "next";

import { DefaultPreset } from "./presets/DefaultPreset";

let projectContext = DefaultPreset;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("body", req.body);
  switch (req.method) {
    case "GET":
      return res.status(200).json(projectContext);

    case "PATCH":
      projectContext = { ...projectContext, ...JSON.parse(req.body) };
      return res.status(200).json(projectContext);

    default:
      return res.status(405).end();
  }
}
