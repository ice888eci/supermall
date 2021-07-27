module.exports = {
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