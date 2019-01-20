
# merchant-console

> Merchant Console of kuaidian order system

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目文件目录
| 目录     | 说明                |
| ------ | ----------------- |
| build  | 项目构建（webpack）相关代码 |
| config | 配置目录，如端口号等        |
| src    | 开发的主目录            |
| static | 静态资源，比如公共的UI等等    |

### 开发的主目录src

* src中共有以下文件夹
  * assets 存放静态资源，如图片、字体、css
  * components 存放组件，通用的公共组件单独编写。复杂页面建立文件夹，细分每个组件。
  * router 路由，其中index.js汇总所有路由配置，每个模块单独建立配置文件
  * util 公共方法


## 关于Vue比较好的文章

* 推荐了很多实用插件：如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

* ​

  ​