import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(99,102,241,0.28), transparent 55%)",
          color: "#f4f4f5",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div style={{ marginTop: 28, fontSize: 36, color: "#a1a1aa" }}>{profile.role}</div>
      </div>
    ),
    size,
  );
}
