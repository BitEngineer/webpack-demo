var HtmlWebpackPlugin = require('html-webpack-plugin')  // html打包
var ExtractTextPlugin = require("extract-text-webpack-plugin")  // 抽取css的插件，将css从js中抽取
var CleanWebpackPlugin = require("clean-webpack-plugin")  // 清理上次的打包文件

// 该配置基于webpack2.0 详情查看 https://webpack.js.org/guides/migrating/
const path = require('path'); // 导入路径包

module.exports = {
    entry: './src/main.js', //入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 指定打包之后的文件夹
　　　　 // publicPath: '/assets/', // 指定资源文件引用的目录，也就是说用/assests/这个路径指代path，开启这个配置的话，index.html中应该要引用的路径全部改为'/assets/...'
        // filename: 'build.js' // 指定打包为一个文件 build.js
        filename: 'build.[chunkHash:5].js' // 指定打包为一个文件，并且使用hash命名，防止浏览器缓存
        // filename: '[name].js' // 可以打包为多个文件,name就是原来js的文件名
    },
    // 使用loader模块
    module: {
        /* 在webpack2.0版本已经将 module.loaders 改为 module.rules 为了兼容性考虑以前的声明方法任然可用，
　　　　　　同时链式loader(用!连接)只适用于module.loader，
　　　　　　同时-loader不可省略 */
        rules: [
            {
                test: /\.css$/,
                // use: [
                //     'style-loader', 
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             // modules: true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
                //         }
                //     }, 
                //     {
                //         loader: 'postcss-loader',
                //         // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
                //         options: {
                //             plugins: function() {
                //                 return [
                //                     require('autoprefixer')
                //                 ];
                //             }
                //         }
                //     }
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", 
                    use: "css-loader" 
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({
            //这里关键至极,filename:[name].[contenthash:5].css;之前我们项目是这样写的，这样写，打包出来的css就跑到dist/js里面去了，
            // 虽然不影响使用，但是混到一起就是很不舒服，
            //这里你们非常有必要先试试，filename:[name].[contenthash:5].css
            //还有就是最外层建一个 css文件夹  ，然后这样配置filename:css/[name].[contenthash:5].css,然后看看具体打包出什么，
            filename: (getPath)=>{
                return getPath('[name].[contenthash:5].css').replace("js","css")
            }
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    devServer: {
        contentBase: "./",  // 本地服务器目录，即index.html所在的目录，默认打开的页面是index.html
        historyApiFallback: true,
        hot: true,
        open: true,  // 启动后，浏览器自动打开index.html
        inline: true,  // 实时刷新
        port: 8000  // 端口
    },
}