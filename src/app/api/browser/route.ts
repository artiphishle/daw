import { readdirSync, statSync } from "fs";
import type { NextRequest } from "next/server";

/* eslint-disable-next-line require-await */
export async function GET(req: NextRequest) {
  try {
    const root = readdirSync("./public/samples", "utf8").filter(
      (f) => !f.startsWith(".")
    );
    const three = root.map((name) => {
      const path = `./public/samples/${name}`;
      if (!statSync(path).isDirectory()) return { name };

      const items = readdirSync(path, "utf8")
        .filter((f) => !f.startsWith("."))
        .map((name) => ({ name }));
      return { name, items };
    });
    return new Response(JSON.stringify(three));
  } catch (error) {
    return new Response(JSON.stringify({ error }));
  }
}
