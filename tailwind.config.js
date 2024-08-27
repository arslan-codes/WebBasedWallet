module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        "base-100": "#fcffe1",
        "base-200": "#dbdec4",
        "base-300": "#bbbea7",
        "base-300": "#7f1d1d",

        // Add other custom colors here
      },
      backgroundImage: {
        "hero-pattern": "url('src/assets/background.png)",
        // "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0088ff",
          "primary-content": "#000616",
          secondary: "#00b3ff",
          "secondary-content": "#000c16",
          accent: "#00b900",
          "accent-content": "#000d00",
          neutral: "#13161b",
          "neutral-content": "#cacacc",

          "base-content": "#161612",
          info: "#00ceff",
          "info-content": "#000f16",
          success: "#00b930",
          "success-content": "#000d01",
          warning: "#ffa600",
          "warning-content": "#160a00",

          "info-content": "#000b13",
          success: "#769600",
          "success-content": "#050800",
          error: "#f10030",
          "error-content": "#140001",

          "base3-content": "#fee2e2",
        },
      },
    ],
  },
};
