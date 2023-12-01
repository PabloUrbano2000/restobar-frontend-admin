/** @type {import('tailwindcss').Config} */

import * as plugin from "tw-elements-react/dist/plugin.cjs";
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [plugin],
};
