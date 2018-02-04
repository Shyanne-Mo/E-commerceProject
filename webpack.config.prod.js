var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: { //当我们需要把第三方包单独抽取出去的时候，那就是多入口
        'axios': ['axios'], //属性名称代表的是 打包出来，放在js文件夹下面的文件名称，值是代表第三方包
        'jquery': ['jquery'],
        'moment': ['moment'],
        'v-distpicker': ['v-distpicker'],
        'vue-lazyload': ['vue-lazyload'],
        'quanjiatong': ['vue', 'vue-router', 'vuex'],
        'bundle': './src/main.js' //别忘记了我们自己的源代码也要打包进入bundle.js
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: { //配置loader
        rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            minimize: true //压缩抽离出去的css
                        }
                    }
                })
            },
            {
                test: /\.(ttf|eot|svg|woff|jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2000,
                        name: 'statics/[name]-[hash:5].[ext]' //用哈希算法定义文件名
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.vue', '.js', '.json', '*']
    },
    plugins: [ //插件中的内容都是new出来的
        //打包之前，删除dist目录，写在其它插件前面
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            template: './template.html', //参照文件的路径
            filename: 'index.html', //最后发布到node服务器上面的名称
            minify: {
                removeComments: true, //压缩注释
                minifyJS: true, //压缩js
                minifyCSS: true, //压缩css
                collapseWhitespace: true, //去除空格
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"' //设置为生产 就会导入min.js的文件
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false, //去掉警告
                drop_debugger: true,
                drop_console: true //去除console.log
            },
            comments: false //去掉版权信息等注释
        }),
        new ExtractTextPlugin("css/styles.css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['jquery', 'moment', 'quanjiatong', 'axios', 'v-distpicker', 'vue-lazyload'],
            // filename: "vendor.js"
            // (给 chunk 一个不同的名字)

            minChunks: Infinity,
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
        })
    ]
}