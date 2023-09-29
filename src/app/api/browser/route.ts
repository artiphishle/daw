import { readdirSync } from "fs";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const publicSamples = readdirSync("./public/samples", "utf8").filter(
      (f) => !f.startsWith(".")
    );
    return new Response(JSON.stringify(publicSamples));
  } catch (error) {}
}
