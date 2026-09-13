import { ImageResponse } from "next/og";

// Generated at build time into a real PNG, so the social card is version-controlled
// and changes with the copy instead of drifting away from it in a design file.
// Required under `output: "export"` -- without it the build refuses to collect
// this route, since it can't know the image is generated once at build time.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Acer Carl Fanged — I build the half of a web application you never see: databases, access rules, payments.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5b6169",
              marginBottom: 34,
            }}
          >
            Acer Carl Fanged
          </div>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.16,
              color: "#17181a",
              fontWeight: 600,
              maxWidth: 1000,
            }}
          >
            I build the half of a web application you never see — databases, access rules,
            payments.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
              <div style={{ width: 46, height: 4, background: "#2b5cff", marginRight: 18 }} />
              <div style={{ fontSize: 30, color: "#17181a" }}>
                Four live systems. Three real businesses.
              </div>
            </div>
            <div style={{ fontSize: 26, color: "#5b6169" }}>
              And verified it actually works before it shipped.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
