import purgecss from "@fullhuman/postcss-purgecss";

const purgeCSSPlugin = purgecss({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  safelist: {
    standard: ["active", "open", "navbar-scrolled", /^fa-/, /^fab/, /^fas/],
  },

  defaultExtractor: (content) => content.match(/[\w-/:%]+(?<!:)/g) || [],
});

export default {
  plugins: process.env.NODE_ENV === "production" ? [purgeCSSPlugin] : [],
};
