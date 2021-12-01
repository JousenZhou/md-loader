// Vue模板正则
const reg = /```vue([\s\S]*?)(>[\s\S]*?)```/gi;
// @参数正则
const queryReg = /@([\s\S]*?)=([\s\S]*?)]/gi;
// 获取key
const keyReg = /@([\s\S]*?)=/gi;
// 获取value
const valueReg = /=\[([\s\S]*?)]/gi;
// 组件名称
const componentName = 'test';

module.exports = {
    // 模板替换索引组件
    replaceComponent: function (source, path, flag, rules) {
        path = path.replace(/"/g, '');
        // 这里还是写规范一点吧
        return rules.reduce((x, y, index) => {
            const reg = y.test;
            (x.str.match(reg) || []).forEach((str, regIndexOf) => {
                // 组件名称
                const name = `${componentName}${index}${regIndexOf}`;
                x.components.push(name);
                x.script.push(`import ${name} from "${path}?fence&${flag}=${index}&regIndex=${regIndexOf}"`)
                x.length++;
                x.str = x.str.replace(str, `<${name}/>`)
            })
            return x;
        }, {
            components: [],
            script: [],
            length: 0,
            str: source
        })
    },
    // 子模块解析
    childrenAnalysis: function (source, ruleIndex, regIndex, rules) {
        try {
            rules.forEach((em, ruleIndexOf) => {
                const reg = em.test;
                source.match(reg).forEach((item, regIndexOf) => {
                    if (ruleIndexOf === Number(ruleIndex) && regIndexOf === Number(regIndex)) {
                        throw rules[ruleIndexOf].render(item)
                    } else {
                        // 去掉干扰的其他项
                        source = source.replace(item, '')
                    }
                })
            })
        }
        catch (code) {
            return code;
        }
        return `<template>插件匹配失败</template>`;
    },
    // 默认规则解析
    queryAnalysis: function (str) {
        const _ = str.match(queryReg);
        const query = (_ || []).reduce((x, y) => {
            // 删掉内容
            str = str.replace(y, '');
            // 去掉空格 双引号转单引号
            y = y.replace(/\s*/g, '').replace(/'"'/gi, "'");
            // 获取key
            let key = y.match(keyReg)[0].replace(/[@=]/gi, '');
            // 获取value
            let value = y.match(valueReg)[0].replace(/[='[\]]/gi, '');
            return {...x, [key]: value};
        }, {});
        return {
            query,
            str: str.trim().slice(6, -3)
        };
    }
};
