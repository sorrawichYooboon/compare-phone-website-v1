/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    boxShadow: {
      modal: "0px 4px 24px rgba(0, 0, 0, 0.05)",
      footer: "0px -1px 34px rgba(0, 0, 0, 0.05)",
      pagination: "inset 1px 0px 0px rgba(198, 209, 221, 0.5)",
    },
    dropShadow: {
      header: [
        "0px 0px 2px rgba(40, 41, 61, 0.04)",
        "0px 4px 8px rgba(96, 97, 112, 0.08)",
      ],
    },
    colors: {
      primarydefault: "#1226AA",
      primary: {
        light: "#6DA5D9",
        DEFAULT: "#1226AA",
        dark: "#282560",
      },
      blue: "#6DA5D9",
      outline: "#E5E5E5",
      warning: {
        light: "#FFFCF0",
        DEFAULT: "#E7B902",
        dark: "#A6841B",
      },
      error: {
        light: "#FDF0EF",
        DEFAULT: "#FD7468",
        dark: "#F03E35",
      },
      success: {
        light: "#F6FFF9",
        DEFAULT: "#59CB86",
        dark: "#2E9055",
      },
      black: "#000000",
      darkgray1: "#565A5F",
      darkgray2: "#73787D",
      darkgray3: "#90969C",
      gray1: "#B1B2B5",
      gray2: "#DFE1E7",
      lightgray1: "#F3F5FA",
      lightgray1_40: "rgba(243, 245, 250, 0.4)",
      lightgray2: "#FAFAFA",
      white: "#FFFFFF",
    },
    fontSize: {
      xs: ["12px", "18px"],
      sm: ["14px", "21px"],
      base: ["16px", "24px"],
      lg: ["18px", "27px"],
      xl: ["20px", "30px"],
      "2xl": ["24px", "36px"],
      "3xl": ["32px", "48px"],
    },
    fontFamily: {
      sans: ["Noto Sans Thai", "sans-serif"],
      mono: ["Roboto", "sans-serif"],
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
};
