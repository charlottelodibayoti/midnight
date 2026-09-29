import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bayanihan — Help, where it matters.",
    short_name: "Bayanihan",
    description: "Verified disaster updates and trusted ways to help.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f9f7",
    theme_color: "#f7f9f7",
    orientation: "portrait-primary",
    lang: "en-PH",
    categories: ["news", "lifestyle", "utilities"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
