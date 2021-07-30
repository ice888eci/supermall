module.exports = {

    // 基本路径
    publicPath: "./",  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
    outputDir: "dist",  //打包时生成的生产环境构建文件的目录
    assetsDir: 'public',  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    /*devServer: {
        proxy: 'http://localhost:8080'
    }*/
    configureWebpack: {
        /**
         * 配置别名路径 
         * '@':'src'为默认可以不用添加
         * @resolve -> @alias
         */
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'views': '@/views',
                'network': '@/network',
                'router': '@/router',
                'store': '@/store',
            }
        },
    },
}