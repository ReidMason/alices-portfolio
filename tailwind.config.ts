import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Antic-Didone"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
