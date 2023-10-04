import { NextRequest } from "next/server";
import { DefaultPreset } from "@/app/api/project/presets/DefaultPreset";

/**
 * Don't you dare to touch this!
 * Don't make a const out of it!
 */
let settingsCollection = { ...DefaultPreset };

/* eslint-disable-next-line require-await */
async function GET(_: NextRequest) {
  return new Response(JSON.stringify(settingsCollection));
}

/* eslint-disable-next-line require-await */
async function PATCH(req: NextRequest) {
  try {
    const json = await req.json();
    settingsCollection = { ...settingsCollection, ...json };
  } catch (error) {
    console.error(error);
  }
  return new Response(JSON.stringify(settingsCollection));
}

export { GET, PATCH };
