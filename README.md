# Tauri + Vue 3 + TypeScript

![](https://23img.com/i/2023/07/06/h20dgf.jpg)

# 基于安全原因
本地开发需要先在src目录下创建一个config文件夹，并添加index.ts文件，文件配置如下：
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