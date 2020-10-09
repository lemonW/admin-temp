const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
    },
  },
  parallel: require("os").cpus().length > 1,
  devServer: {},
  configureWebpack: (config) => {
    config.resolve.alias = {
      "@": resolve("src"),
      components: resolve("src/components"),
    };
    if (process.env.NODE_ENV === "production") {
      const compress =
        config.optimization.minimizer[0].options.terserOptions.compress;
      compress.warnings = false;
      compress.drop_console = true;
      compress.drop_debugger = true;
      compress.pure_funcs = ["console.log"];
    }
    if (process.env.NODE_ENV !== "development") {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            test: /\.(js|css|html)(\?.*)?$/i,
            threshold: 10240,
            deleteOriginalAssets: false,
          }),
        ],
      };
    }
  },
  chainWebpack(config) {
    // env
    config.plugin("define").tap((args) => {
      const argv = process.argv;
      const mode = argv[argv.indexOf("--project-env") + 1];
      args[0]["process.env"].NODE_ENV = `"${mode}"`;
      return args;
    });
    // cdn
    const externals = {
      echarts: "echarts",
    };
    config.externals(externals);
    const cdn = {
      js: ["https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.min.js"],
    };
    config.plugin("html").tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
};
