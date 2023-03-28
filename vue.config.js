const { defineConfig } = require("@vue/cli-service");

const WebpackBundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const bundleAnalyzerPlugin = new WebpackBundleAnalyzerPlugin({
  AnalyzerNode: "server",
  generateStatsFile: true,
});
const pluginsByEnv = {
  production: [bundleAnalyzerPlugin],
  development: [bundleAnalyzerPlugin],
  local: [bundleAnalyzerPlugin],
};
module.exports = defineConfig({
  // options...
  pages: {
    index: {
      entry: "src/main.js",
      title: "!!Todo App!!",
    },
  },

  configureWebpack: {
    devtool: "source-map",
    plugins: pluginsByEnv[process.env.NODE_ENV],
    optimization: {
      minimize: true,
    },
  },
});
