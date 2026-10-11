import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#101311",
        color: "#f0f2e9",
        fontSize: 74,
        fontWeight: 700,
      }}
    >
      BP<span style={{ color: "#c2f970" }}>/</span>
    </div>,
    size,
  );
}
