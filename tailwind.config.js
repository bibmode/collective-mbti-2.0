module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{js,jsx,ts,tsx,json}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Inter"'],
      },
      fontSize: {
        sm: ".825rem",
        title: ["3.25rem", "56.43px"],
      },
    },
    container: {
      center: true,
      padding: "24px",
    },
  },
  plugins: [],
};
