```
const md2Vue = require('md-vue-loader');
let MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
// 初始化markdownit
const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    highlight: (str) => hljs.highlightAuto(str).value
});

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            new md2Vue({
                // 代码进一步格式化 自行引入MarkdownIt
                formatting: function (source) {
                    return md.render(source)
                },
                // rules这里执行顺序至上而下， 优先于formatting
                rules: [
                    {
                        // 正则匹配需要解析的块级代码
                        test: /```title([\s\S]*?)\|```/gi,
                        // 这里必须把匹配的到代码 转义成vue的模板代码然后return出去
                        render: function (source) {
                            return `<template>哈哈哈2</template>`
                        }
                    }
                ],
                // 是否取消默认规则 即 ```vue ``` 匹配规则
                cancelDefaultRules: false
            })
        ]
    }
};
```
