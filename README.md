<div align="center">

# Web chatRoom

![build](https://travis-ci.org/YeomanLi/WebIM.svg?branch=master)

A Web chatRoom builded by Vue、Node、WebSocket  

</div>  

# 功能  
- [x] 注册登录
- [x] 聊天功能
- [x] 查看历史记录
- [x] 发送图片
- [x] 发送文件
- [x] 发送表情
- [x] 好友资料查看
- [x] 添加好友
- [x] 搜索好友
- [x] 删除好友
- [x] 图片预览
- [x] 文件下载
- [x] 修改头像
- [x] 群聊
- [x] 私聊


# 项目环境  
MongoDB、Node、NPM、Vue  

# 目录结构
* client
   * build - webpack config files
   * config - webpack config files
   * dist - build
   * src -your app
       * api
       * assets
       * components - your vue components
       * pages - your pages  
       * router -routes
       * stroe -vuex
       * App.vue
       * main.js - main file
   * static - static assets
* server
   * model - model data
   * public - resources
   * router - api interface
   * server_moduels
   * app.js

# 如何启动  
 请自行安装并启动[MongDB](https://www.mongodb.com/)
 
``` bash
# cd server
cd ./server

# install dependencies
npm install

#serve with hot reload at localhost:3000
node app.js  

# cd client
cd ../client

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

