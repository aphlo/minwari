import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const files = ["server", "scripts"].flatMap((directory) =>
  readdirSync(directory, { recursive: true })
    .filter((file) => /\.test\.(ts|mjs)$/.test(file))
    .map((file) => join(directory, file))
);
const result = spawnSync(
  process.execPath,
  ["--test", "--import", "tsx", ...files],
  { stdio: "inherit" }
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
