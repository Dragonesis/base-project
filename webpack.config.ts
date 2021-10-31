import path from 'path'
import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import Dotenv from 'dotenv-webpack'

const { NODE_ENV } = process.env
const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'
const assetName = isDev ? '[path][name].[ext]' : '[name].[hash:base64:5].[ext]'
const mediaPath = isDev ? '/' : 'static/media'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'src/components'),
    },
    fallback: {
      fs: false,
      os: false
    }
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].main.[contenthash:8].js',
    chunkFilename: 'static/js/[name].[id].[contenthash:8].js',
    publicPath: '/'
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  },
  optimization: {
    minimize: NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: {
      name: (entrypoint: { name: any }) => `runtime-${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true,
          reuseExistingChunk: true,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' :
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: isProd ? '[hash:base64:5]' : '[path]-[local]-[hash:base64:5]',
                auto: /\.module\.\w+$/i,
                exportLocalsConvention: 'camelCase',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: assetName,
          outputPath: 'static/media',
          publicPath: mediaPath
        },
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          {
            loader: 'url-loader',
            options: {
              name: assetName,
              outputPath: 'static/media',
              publicPath: mediaPath,
              limit: 100,
              babel: false
            }
          }
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: assetName,
            outputPath: 'static/media',
            publicPath: mediaPath
          }
        }
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public", globOptions: {
          ignore: ['**/index.html']
        }},
      ],
    }),
    new HTMLWebpackPlugin(
      Object.assign(
        {},
        {
          base: '/',
          inject: true,
          template: path.resolve(__dirname, 'public/index.html'),
        },
        isDev ? null : {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      )
    ),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new Dotenv()
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: !isProd ? 'source-map' : 'eval',
}
