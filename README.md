# FileHub 介绍

<div style="text-align: center; width:100%">
<img src="https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/fileHub.3z5pyj461dq0.webp"/>
</div>
一个基于Github开发的文件存储软件，美其名曰：FileHub，可存万物，而且绝不和谐任何文件。类似于百度云盘的功能，但是功能上肯定达不到百度云盘的效果，但是基本功能还是有的：例如登录注册，文件上传查看下载，资源分享等等。当然，还在努力添加ChatGPT功能，gitpage网站一键部署，gitpage主题切换，视频解析和视频无水印下载等等功能。如果对你有帮助，请给个Star吧，有问题请提交Isue吧  
本项目使用的技术栈：Tauri + Vue3 + TypeScript + Vite + Pinia + element-plus

##### Windows 安装包

Github 下载链接: [下载地址一](https://Sjj1024.github.io/FileHub/root/Filehub/FileHub_0.0.1_x64_zh-CN.msi)  
蓝奏云下载链接：[下载地址二](https://wwlu.lanzouq.com/ipnKO14uwf2f)

##### Mac 电脑安装包

Github 下载链接: [下载地址一](https://Sjj1024.github.io/FileHub/root/Filehub/FileHub_0.0.1_x64.dmg)  
蓝奏云下载链接：[下载地址二](https://wwlu.lanzouq.com/ipnKO14uwf2f)

##### Linux 安装包

Github 下载链接: [下载地址一](https://Sjj1024.github.io/FileHub/root/Filehub/file-hub_0.0.1_amd64.deb)  
蓝奏云下载链接：[下载地址二](https://wwlu.lanzouq.com/ipnKO14uwf2f)

## 软件功能介绍

### 基本功能特性

跨平台支持：windows + mac + linux 都支持，多主题：暗黑主题和亮白主题，多语言切换：中英互换。  
上传文件，在线预览图片，播放视频，音乐，分享资源等等，修改 Token，修改密码，修改用户名，修改图片链接 CDN，加快访问速度。  
待开发功能：  
1.AI 产品集成：ChatGPT，WormGPT(邪恶版 ChatGPT)，Bard，AI 绘画，AI 写作等智能 AI 应用接口  
2.依托 Github 进行文章笔记管理：文章分类，文章发布，文章加密，文章分享等  
3.依托 Github Page 发布自己的网站：使用 Github Page 发布自己的网站，可以设置不同的网站主题等等 4.常用工具插件：各平台视频无水印下载，音频下载，图片下载等，视频/音频/图片等转存到我的文件  
5.依托 Github Action 实现：定时打卡签到等，定时爬虫任务，爬虫任务资源存储到我的文件等  
6.移动端支持：安卓 Android 和苹果 IOS 客户端支持，暂定使用 Flutter 开发  
7.对上传的图片进行压缩处理，以节省 Github 仓库容量(一个仓库容量 1G，一个账号最大容量 100G) 8.对根目录新建的文件夹，用新创建的仓库代替

### 登录注册

使用用户名和密码注册账户，或者仅仅使用 git token 登陆。注册用户的时候，需要添加上 git token，这个是必须项。注册成功后，就可以使用用户名和密码登陆，而不再需要 token。(我会对你的 token 进行公私钥加密存储，所以可放心食用)
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230720/image.2uh6124tv4a0.webp)  
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230726/image.3p83ldepb780.webp)

### 文件系统

文件(各类文件)上传、拖动上传，文件预览，视频播放，音乐播放，m3u8 视频导入，资源链接导入，文件分享，文件下载，github cdn 链接转换。多文件选择多文件上传，多文件下载等
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230720/image.4ikm9oo3l3m0.webp)
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230720/image.5nlodjb062c0.webp)

### 资源广场

用户可以分享自己的资源到资源广场，实现资源的共享，可以分享 m3u8 类型的视频资源，也可以分享图片等等  
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230726/image.7lcpf67knyo0.webp)

### 图片视频音乐播放

图片预览\放大\缩小\旋转等，视频播放\倍速\全屏播放\循环播放等，支持大多数视频文件，可以将网上的视频文件链接导入到文件中，音乐播放\倍速\循环播放，音乐后台播放等  
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230720/image.69xjc9jm1800.webp)
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230720/image.26skfpadn5og.webp)
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230720/image.2whu0rbw5la0.webp)

### ChatGPT 集成效果

chatgpt 大语言模型聊天\问答等
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230720/image.32nkp0ib2r20.webp)

### 插件工具

视频无水印下载等
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230726/image.61j93kheyy80.webp)

### 设置中心

常用设置+图床设置+ChatGPT 设置+用户设置等
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230726/image.7ifcl62dqew0.webp)  
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230726/image.2myajqua1sy0.webp)  
![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230726/image.9e8nookw6o0.webp)

### 帮助反馈

![](https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/20230726/image.2umhfyy4khq0.webp)

# 本地开发配置

先克隆项目：

```
git clone https://github.com/Sjj1024/s-hub.git
```

然后切换 node 环境为 19.0.0 以上，推荐使用 pnpm 来管理依赖包。
上述环境安装好后，开始安装依赖：

```
pnpm i

或者
npm i

或者
yarn
```

基于安全原因，本地开发需要先在 src 目录下创建一个 config 文件夹，并添加 index.ts 文件，文件配置如下：

```
// Filehub根路径地址：用于存储文件和被Frok
export const fileHubBoss = ""
// DataHub根路径：用于用户注册，分享内容，评论等
export const bossUrl = ""
// token1：用于开发测试
export const bossToken = ""
// token2：用于开发测试
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

1.多语言配置，等最后再集成吧 2.集成 ChatGPT 3.开发文章管理 4.开发网站管理

# 20230717：Done

1.资源分享页面按钮控制， 2.搜索 Issue 内容：并进行分页 3.资源分享页面分页展示 4.下载文件 5.多文件下载 6.软件自动更新 7.其他页面的 demo 样式 8.暗黑亮白模式样式适配: chatgpt 模式 9.更改 token，登陆时更改，设置页面更改 10.用户名和密码记住功能
