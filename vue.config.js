module.exports = {
    chainWebpack: config => {
        // 修复
        // config.resolve.symlinks(true);
    },
    configureWebpack:{
        module:{
            rules:[
                {
                    test:  /\.md$/,
                    use:[
                        {
                            loader:'cache-loader'
                        },
                        {
                            loader:'vue-loader-v16',
                            options:{
                                babelParserPlugins: ['jsx', 'classProperties', 'decorators-legacy']
                            }
                        },
                        {
                            loader:'./plugins/md-loader'
                        }
                    ]
                }
            ]
        }
    },
    devServer:{}
};