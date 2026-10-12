const path = require("path");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],

    files: [
      { pattern: "src/**/*.spec.js", watched: false },
      { pattern: "src/**/*.spec.jsx", watched: false },
    ],
    preprocessors: {
      "src/**/*.spec.js": ["webpack"],
      "src/**/*.spec.jsx": ["webpack"],
    },

    webpack: {
      mode: "development",
      devtool: false,
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: { chrome: "100" } }],
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
              plugins: [
                ["istanbul", { exclude: ["**/*.spec.jsx", "**/*.spec.js", "src/tests/**", "src/main.jsx"] }],
              ],
            },
          },
        }],
      },
    },

    reporters: ["spec", "coverage"],
    coverageReporter: {
      dir: path.join(__dirname, "coverage"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }, { type: "text" }],
      check: { global: { statements: 90, branches: 90, functions: 90, lines: 90 } },
    },

    browsers: ["ChromeHeadlessSinSandbox"],
    customLaunchers: {
      ChromeHeadlessSinSandbox: { base: "ChromeHeadless", flags: ["--no-sandbox"] },
    },
    singleRun: true,
    autoWatch: false,
  });
};