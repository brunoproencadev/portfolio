// Uses the image encoder already installed by the pinned Next.js dependency.
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const sharp = nextRequire("sharp");
const source = await readFile("public/images/profile/github-avatar.png");
const expected =
  "a31a9eb6f741a092ac97494565cc6b720f503cdbaa01d815b0aaf72a2ebf9672";
if (createHash("sha256").update(source).digest("hex") !== expected) {
  throw new Error(
    "Avatar changed: verify current GitHub provenance before generating icons.",
  );
}

const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) => sharp(source).resize(size, size).png().toBuffer()),
);
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (const [index, size] of sizes.entries()) {
  const entry = 6 + index * 16;
  directory[entry] = size;
  directory[entry + 1] = size;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(images[index].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += images[index].length;
}
await writeFile("src/app/favicon.ico", Buffer.concat([directory, ...images]));
for (const [name, size] of [
  ["icon", 192],
  ["apple-icon", 180],
]) {
  await sharp(source).resize(size, size).png().toFile(`src/app/${name}.png`);
}
console.log(
  "Verified avatar → ICO 16/32/48, PNG 192, Apple PNG 180; no crop or recoloring.",
);
