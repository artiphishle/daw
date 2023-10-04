import { readdirSync, statSync } from "fs";
import type { NextRequest } from "next/server";

/* eslint-disable-next-line require-await */
export async function GET(req: NextRequest) {
  const root = readdirSync("./public/samples", "utf8").filter(
    (f) => !f.startsWith(".")
  );
  const three = root.map((name) => {
    const path = `./public/samples/${name}`;
    if (!statSync(path).isDirectory()) return { name };

    const items = readdirSync(path, "utf8")
      .filter((f) => !f.startsWith("."))
      .map((name) => ({ name }))
      .slice(0, 10);
    return { name, items };
  });
  return new Response(JSON.stringify(three));
}
