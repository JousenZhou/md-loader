# vue-lesze

## Project setup
``` html
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```vue
@slot = ['TEST']
<template>
    <div>2134</div>
</template>
<script>
    export default {
        name:'lll2',
        methods:{
            say:function() {
              console.log(12);
            }
        },
        mounted(){
            console.log('测试23')
        }
    }
</script>
```



<div>
    <p>周健会</p>
</div>

| 提交日期   |      | 描述 |                         
| :-------- | ---  | --- |
| 2021/8/27 |      | 初始化框架 
| 2021/8/30 |      | 添加(光源/模型)元素以及UI控制
| 2021/9/1  |      | 修改threeJs引擎为模块化       
| 2021/9/11 |      | threeJs模块引入优化，不走webpack编译           
| 2021/9/11 |      | readme.md 完善、添加体验地址 

:::demo 123
here be dragons
:::