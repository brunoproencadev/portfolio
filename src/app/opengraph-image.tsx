import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt =
  "Bruno Proença Silva — Software, visão computacional e robótica.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 70,
        background: "#101311",
        color: "#f0f2e9",
      }}
    >
      <div style={{ display: "flex", fontSize: 62, fontWeight: 700 }}>
        BP<span style={{ color: "#c2f970" }}>/</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 62, fontWeight: 700 }}>{profile.name}</div>
        <div style={{ fontSize: 30, color: "#c2f970" }}>{profile.position}</div>
      </div>
      <div style={{ fontSize: 30, color: "#a8b2a8" }}>{profile.fields}</div>
    </div>,
    size,
  );
}
