let loaderUtils = require('loader-utils');
const {replaceComponent, childrenAnalysis} = require('./until');
// 标记
const flag = 'indexOf';

module.exports = function (source) {
    // 路径
    const {resourcePath, resourceQuery} = this;
    // 参数
    const {formatting, rules} = loaderUtils.getOptions(this);
    // 获取import参数
    let query = resourceQuery.length > 0 ? loaderUtils.parseQuery(resourceQuery) : {};
    // 如果参数含有flag标记字段则是子组件
    if (Object.keys(query).includes(flag)) {
        // 返回子组件
        return childrenAnalysis(source, query[flag], query.regIndex, rules)
    }
    // 获取当前文件根路径
    const path = loaderUtils.stringifyRequest(this, resourcePath);
    // 主文件 解析
    const {str, components, script} = replaceComponent(source, path, flag, rules);

    return `
        <template>
              <div>
                ${formatting(str)}
              </div>
        </template>
        <script>
            ${script.join(';')}
            export default {
                name:'md',
                components:{${components.join(',')}}
            }
        </script>
    `
};
