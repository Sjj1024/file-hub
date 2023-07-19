# FileHub介绍
一个基于Github Api 开发的文件存储软件，美其名曰：FileHub，类似于百度云盘的功能，但是功能上肯定达不到百度云盘的效果，但是基本功能还是有的：例如登录注册，文件上传查看下载，资源分享等等。当然，还在努力添加ChatGPT功能，gitpage网站一键部署，gitpage主题切换，视频解析和视频无水印下载等等功能。  
本项目使用的技术栈：Tauri + Vue3 + TypeScript + Vite + Pinia + element-plus

## 软件功能介绍
### 基本功能
跨平台支持：windows + mac + linux都支持，多主题：暗黑主题和亮白主题，多语言切换：中英互换。   

### 登录注册：  
使用用户名和密码注册账户，或者仅仅使用git token登陆。注册用户的时候，需要添加上git token，这个是必须项。注册成功后，就可以使用用户名和密码登陆，而不再需要token。
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230719/image.6j20h1xx7yw0.webp)  


### 文件系统：  
文件(各类文件)上传、拖动上传，文件预览，视频播放，音乐播放，m3u8视频导入，资源链接导入，文件分享，文件下载，github cdn链接转换
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230719/image.4b5z7kdli1i0.webp)


# 本地开发配置
先克隆项目：
```
git clone https://github.com/Sjj1024/s-hub.git
```

然后切换node环境为19.0.0以上，推荐使用nvm管理本地node环境，推荐使用pnpm来管理依赖包。
上述环境安装好后，开始安装依赖：
```
pnpm i

或者
npm i

或者
yarn
```


基于安全原因，本地开发需要先在src目录下创建一个config文件夹，并添加index.ts文件，文件配置如下：
```
// Filehub根路径地址：用于存储文件和被Frok
export const fileHubBoss = ""
// DataHub根路径：用于用户注册，分享内容，评论等
export const bossUrl = ""
// 1024小神token：用于开发测试
export const bossToken = ""
// 1024回家token：用于开发测试
export const guestToken = ""

// 公私钥加解密秘钥
export const publickKey = ``

export const privateKey = ``
```

启动项目：
```
pnpm tauri dev
```

编译项目：
```
pnpm tauri build
```


# TODO:
1.软件自动更新
2.下载文件
3.其他页面的demo样式
4.暗黑亮白模式样式适配
5.多语言配置
6.多文件下载


# 20230717：Done
1.资源分享页面按钮控制，
2.搜索Issue内容：并进行分页
3.资源分享页面分页展示