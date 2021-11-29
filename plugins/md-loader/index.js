let loaderUtils = require('loader-utils');
let MarkdownIt = require('markdown-it');
const emoji = require('markdown-it-emoji');
const hljs = require('highlight.js');
const { replaceComponent, childrenAnalysis } = require('./until');
// 初始化markdownit
const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    highlight: (str) => hljs.highlightAuto(str).value
});
md.use(emoji);

// 标记
const flag = 'fence';

module.exports = function (source) {
    // 路径
    const { resourcePath, resourceQuery } = this;

    // const fix = resourceQuery.replace(/\?/gi, '&').replace('&','?');
    // 获取import 参数
    let query = resourceQuery.length > 0 ? loaderUtils.parseQuery(resourceQuery) : {};
    // console.log(query)
    // 判断参数对象是否存在标识 如果有则是子级元素
    if (Object.keys(query).includes(flag)) {
        return childrenAnalysis(source, query[flag]);
    }

    const path = loaderUtils.stringifyRequest(this, resourcePath);
    const { str, components, script } = replaceComponent(source, path, flag);
    return  `
        <template>
              <div>
                ${str}
              </div>
        </template>
        <script>
            ${script.join(';')}
            export default {
                name:'EEE',
                components:{${components.join(',')}}
            }
        </script>
    `
};
