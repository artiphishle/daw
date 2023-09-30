import { existsSync, lstatSync, readdirSync } from "fs";

/**
 * Convert audio files to base64
 * TODO functional programming (chain/pipe)
 */
function audioToBase64(fileOrDir: string) {
  // Check if file or directory exists
  if (!existsSync(fileOrDir)) throw new Error("File or directory not found");

  // Read directory and convert audio files to base64
  const base64 = readdirSync(fileOrDir, "utf8").map((fileOrDir) => (lstatSync(fileOrDir).isDirectory()
      ? audioToBase64(fileOrDir)
      : Buffer.from(fileOrDir).toString("base64")));
}
