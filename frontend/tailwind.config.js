export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 28px 80px rgba(51, 122, 163, .14)",
        card: "0 16px 45px rgba(33, 81, 112, .10)"
      }
    }
  },
  plugins: []
};
