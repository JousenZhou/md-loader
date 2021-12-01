/**
 * desc：md-vue 解析器
 * author：ZhouJianHui
 * date：  2021/12/1 14:04
 */
const {queryAnalysis} = require('./until/until')
const version = 'vue-version';

class mdLoaderVue {
    [version] = null;
    formatting = null;
    rules = [];
    // 默认规则
    defaultRules = [{
        test: /```vue([\s\S]*?)(>[\s\S]*?)```/gi,
        render: function (source) {
            let {query, str} = queryAnalysis(source);
            return str
        }
    }]

    constructor({formatting, rules = [], cancelDefaultRules = false} = {}) {
        try {
            this.formatting = typeof formatting === 'function' ? formatting : (str) => str;
            this.rules = [...cancelDefaultRules ? [] : this.defaultRules, ...rules];
            this[version] = require('vue').version.slice(0, 1);
        } catch (e) {
            this.apply = new Function()
            console.error('md-vue-loader started fail', e)
        }
    }

    apply(compiler) {
        // vue2 执行 vue-loader
        // vue3 执行 vue-loader-v16 目前不能用正式版有Bug 目前预用bate版本

        const {[version]: ver, formatting, rules} = this;
        const vueLoader = ver === 2 ? 'vue-loader' : require.resolve('./node_modules/vue-loader-v16/dist/index.js');

        compiler.options.module.rules.push({
            resource: (path) => /\.md$/.test(path),
            use: [
                {
                    loader: vueLoader,
                    options: {
                        babelParserPlugins: ["jsx", "classProperties", "decorators-legacy"],
                    },
                },
                {
                    loader: require.resolve('./until/index.js'),
                    options: {
                        formatting,
                        rules
                    }
                },
            ]
        })
    }
}

module.exports = mdLoaderVue;
