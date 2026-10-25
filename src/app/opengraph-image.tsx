/* eslint-disable @next/next/no-img-element -- ImageResponse renders native image elements. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt =
  "Bruno Proença Silva — Software, visão computacional e robótica.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const [regular, medium, avatar] = await Promise.all([
  readFile(join(process.cwd(), "src/fonts/manrope-og-400.ttf")),
  readFile(join(process.cwd(), "src/fonts/manrope-og-500.ttf")),
  readFile(join(process.cwd(), "public/images/profile/github-avatar.png")),
]);

export default function OpenGraphImage() {
  const [firstName, ...surname] = profile.name.split(" ");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: 56,
        background: "#08090d",
        color: "#f5f3ff",
        fontFamily: "Manrope",
      }}
    >
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <defs>
          <filter id="og-halo" x="-30%" y="-100%" width="160%" height="300%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>
        <path
          d="M-80 335 Q600 705 1280 335"
          fill="none"
          stroke="#7350d6"
          strokeWidth="56"
          opacity=".65"
          filter="url(#og-halo)"
        />
        <path
          d="M-80 335 Q600 705 1280 335"
          fill="none"
          stroke="#bda4ff"
          strokeWidth="3"
        />
      </svg>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 20px",
          borderRadius: 48,
          background: "#202024",
          fontSize: 24,
          fontWeight: 500,
        }}
      >
        <img
          src={`data:image/png;base64,${avatar.toString("base64")}`}
          width={56}
          height={56}
          alt=""
        />
        {profile.shortName}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 88,
            fontWeight: 500,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
          }}
        >
          <div>{firstName}</div>
          <div>{surname.join(" ")}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28 }}>{profile.position}.</div>
      </div>
      <div style={{ fontSize: 26, color: "#b8b5c5" }}>{profile.fields}</div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Manrope", data: regular, weight: 400, style: "normal" },
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
