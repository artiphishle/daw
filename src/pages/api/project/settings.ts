import { NextApiRequest, NextApiResponse } from "next";

import { DEFAULT_PROJECT_SETTINGS } from "@/app/core/config/constants";

let projectSettings = DEFAULT_PROJECT_SETTINGS;

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
