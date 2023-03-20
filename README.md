# ruoyi-vue3-tsx

这是一个vue3版本，使用tsx开发的应用

## 所用技术栈
1. vite vue-route，babel-plugin-jsx，elementPlus，pinia。
2. 项目的常用业务逻辑，将大量用hooks进行编写。
3. 使用的vite插件如下：
> vite-plugin-vue-setup-extend,解决vue3下 script setup语法糖 下 ,手动设置组件name不方便的问题

> vite-plugin-compression,vite打包开启gzip压缩，较少代码体积

> unplugin-auto-import/vite,自动导入，写过vue3都有一种体会，每个页面都要导入ref，reactive这个重复代码。

> vite-plugin-svg-icons,将图片生成svg

## 目前已改写完成的
1. 登录页面全部由tsx改写✅
2. 封装crud-hooks✅
3. 用户列表✅

## 如何使用项目
```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn run dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
