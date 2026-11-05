import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Misma identidad que el sitio: crema, texto verde bosque y un acento verde.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#f4f0e6",
          color: "#0b1a13",
        }}
      >
        <div style={{ width: 84, height: 10, borderRadius: 5, background: "#1b6a47" }} />
        <div
          style={{
            marginTop: 44,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -5,
            lineHeight: 1,
          }}
        >
          {profile.name}
        </div>
        <div style={{ marginTop: 30, fontSize: 38, color: "#4a5850" }}>{profile.role}</div>
      </div>
    ),
    size,
  );
}
