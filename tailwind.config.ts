import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070B14",
        panel: "#0D1422",
        blue: "#3678F6",
        muted: "#9AA7BC",
      },
      boxShadow: {
        glow: "0 0 55px rgba(54,120,246,.18)",
      },
    },
  },
  plugins: [],
};
export default config;
