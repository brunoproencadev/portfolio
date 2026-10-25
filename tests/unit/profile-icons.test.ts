import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { expect, test } from "vitest";

test("profile icons keep the verified avatar and decodable ICO entries", () => {
  const avatar = readFileSync("public/images/profile/github-avatar.png");
  expect(createHash("sha256").update(avatar).digest("hex")).toBe(
    "a31a9eb6f741a092ac97494565cc6b720f503cdbaa01d815b0aaf72a2ebf9672",
  );
  const ico = readFileSync("src/app/favicon.ico");
  expect(ico.readUInt16LE(0)).toBe(0);
  expect(ico.readUInt16LE(2)).toBe(1);
  expect(ico.readUInt16LE(4)).toBe(4);
  for (const [index, size] of [16, 32, 48, 64].entries()) {
    const entry = 6 + index * 16;
    const offset = ico.readUInt32LE(entry + 12);
    const length = ico.readUInt32LE(entry + 8);
    const png = ico.subarray(offset, offset + length);
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(png.readUInt32BE(16)).toBe(size);
    expect(png.readUInt32BE(20)).toBe(size);
    expect(png.length).toBe(length);
    expect(offset + length).toBeLessThanOrEqual(ico.length);
  }
});
