// Vue模板正则
const reg = /```vue([\s\S]*?)(>[\s\S]*?)```/gi;
// @参数正则
const queryReg = /@([\s\S]*?)=([\s\S]*?)]/gi;
// 获取key
const keyReg = /@([\s\S]*?)=/gi;
// 获取value
const valueReg = /=\[([\s\S]*?)]/gi;
// 组件名称
const componentName = 'TEST';
// 参数解析
const queryAnalysis = function (str) {
    const query = str.match(queryReg).reduce((x, y) => {
        // 删掉内容
        str = str.replace(y, '');
        // 去掉空格 双引号转单引号
        y = y.replace(/\s*/g, '').replace(/'"'/gi, "'");
        // 获取key
        let key = y.match(keyReg)[0].replace(/[@=]/gi, '');
        // 获取value
        let value = y.match(valueReg)[0].replace(/[='[\]]/gi, '');
        return { ...x, [key]: value };
    }, {});
    return {
        query,
        str
    };
};
// 模板解析
// const analysisOfString = function (source, options) {
//     const { param = false } = options || {};
//     return source.match(reg).map((str) => {
//         return Object.assign(
//             // 原始模板字符串
//             { str },
//             // 参数解析判断
//             param ? { query: queryAnalysis(str) } : {}
//         );
//     });
// };

module.exports = {
    // 模板替换索引组件
    replaceComponent: function (source, path, flag) {
        path = path.replace(/"/g, '');
        return source.match(reg).reduce((x, y, index) => {
            const name = `${componentName}${index + 1}`;
            return {
                components: [...(x.components || []), name],
                script: [...(x.script || []), `import ${name} from "${path}?${flag}=${index + 1}"`],
                length: index + 1,
                str: (x.str || source).replace(y, `<${name}/>`)
            };
        }, {});
    },
    // 子模块解析
    childrenAnalysis: function (source, index) {
        let res = source.match(reg);
        if (res.length >= index) {
            // 参数解析
            // eslint-disable-next-line no-unused-vars
            let { query, str } = queryAnalysis(res[index - 1]);
            // console.log(query);
            // 去掉```vue ```
            return str.trim().slice(6, -3);
        }
        return `<template/>`;
    }
};
