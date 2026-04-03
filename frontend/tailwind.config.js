export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: { 50: "#eef2ff", 100: "#e0e7ff", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca" },
        dark: { 900: "#0a0a0f", 800: "#0f0f1a", 700: "#141428", 600: "#1a1a35", 500: "#22223f", 400: "#2d2d52" }
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        glow: { from: { boxShadow: "0 0 20px rgba(99,102,241,0.3)" }, to: { boxShadow: "0 0 40px rgba(99,102,241,0.7)" } },
        slideUp: { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } }
      }
    }
  },
  plugins: []
}
