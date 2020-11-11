const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production";
    const newConfig = {
      ...config,
      mode: prod ? "production" : "development",
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
    if (prod) {
      newConfig.devtool = "hidden-source-map";
    }
    return newConfig;
  },
});

/* module.exports = withBundleAnalyzer({
    compress: true, // html,css,js를 .gz파일로 압축
    webpack(config, { webpack }) {
      const prod = process.env.NODE_ENV === "production";
      return {
        ...config,
        mode: prod ? "production" : "development",
        devtool: prod ? "hidden-source-map" : "eval",
        plugins: [
          ...config.plugins,
          new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        ],
      };
    },
  });
 */
