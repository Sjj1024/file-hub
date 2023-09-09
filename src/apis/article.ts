import http from '@/utils/request'
import { useUserStore } from '@/stores/user'
import { ResponseType } from '@tauri-apps/api/http'
const userStore = useUserStore()
// 先判断仓库FileHub是否存在，存在就获取文件，不存在就frok然后再获取

export default {
  getNotes(path: string) {
    // return http(userStore.gitPath + path, {
    //   method: 'get'
    // })
    return [
      {
        title: '我爱你',
        type: 'md',
        path: 'root/我爱你',
        category: '分类',
        digest:
          '我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你啊啊啊啊啊啊啊啊啊啊啊我可爱你啊啊啊啊啊啊啊啊啊啊啊我可爱你啊',
        img: 'https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10012.jpeg',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/我爱你',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/我爱你',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 11,
        content:
          '<p>我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊我可爱你 啊啊啊啊啊啊啊啊啊啊</p><p><img src="https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10012.jpeg" alt="https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10012.jpeg" data-href="https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10012.jpeg" style=""/></p>',
        fileSha: 'fdbbc39dd722d2df25d833f19943d6b216435dd0'
      },
      {
        title: 'Dochub介绍.md',
        type: 'md',
        path: 'root/Dochub介绍.md',
        category: '分类',
        digest:
          'DocHub一个使用 tauri+react+ts 开发的线上笔记本软件，依托 Github api 作为接口，实现创建笔记文件，创建文件夹，删除笔记，富文本编辑笔记，Markdown 编辑笔记，Ma',
        img: 'https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/image.35ywvl1kmdc0.webp',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/Dochub介绍.md',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/Dochub介绍.md',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        fileSha: 'e50629e75b9b7f501ea6500b25e8defbf0294e05',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 22,
        content:
          '<h1>DocHub</h1><p>一个使用 tauri+react+ts 开发的线上笔记本软件，依托 Github api 作为接口，实现创建笔记文件，创建文件夹，删除笔记，富文本编辑笔记，Markdown 编辑笔记，Markdown 实时预览，预览同步滚动，图片/视频/音乐等文件上传同步存储等功能</p><p>使用到的技术栈：<br>tauri：必须要用到的<br><br>react：前端页面开发框架，也可以用 Vue<br><br>react-router：路由页面跳转控制<br><br>mobx：数据存储和共享<br><br>antd：UI 页面渲染<br><br>sass：样式编程<br><br>node：v16.18.0 本地开发依赖</p><h2>页面预览</h2><p><img src="https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/image.35ywvl1kmdc0.webp" alt="" data-href="" style=""/></p><p><img src="https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/image.39hqgfcwwg80.webp" alt="" data-href="" style=""/></p><p><img src="https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/image.1zdc3yt6nylc.webp" alt="" data-href="" style=""/></p><p><img src="https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/image.z3wf7msueeo.webp" alt="" data-href="" style=""/></p><p><img src="https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/image.4l8136m6fp20.webp" alt="" data-href="" style=""/></p><p><img src="https://cdn.staticaly.com/gh/1024huijia/QingChunMeizi@master/image.5rni30s4jws0.webp" alt="" data-href="" style=""/></p><h2>本地开发配置</h2><p>克隆到本地：</p><pre><code >git clone https://github.com/Sjj1024/tauri-react.git\n</code></pre><p>安装依赖：</p><pre><code >pnpm install\n</code></pre><p>开发预览：第一次比较耗时和消耗电脑性能，因为要安装 tauri 依赖</p><pre><code >pnpm develop\n</code></pre><p>编译打包：打包为不同平台的安装文件</p><pre><code >pnpm bundle\n</code></pre><h2>使用 Github Action 发版</h2><p>使用 github action 打包不同平台的安装包，然后发布新版本，并支持自动升级。操作教程：<a href="https://xiaoshen.blog.csdn.net/article/details/131963524" target="">tauri 在 github 上进行自动更新打包并发版过程，实战操作避坑</a></p><p>打 tag 命令：</p><pre><code >git tag v0.0.2\n</code></pre><p>推 tag 命令：</p><pre><code >git push --tag\n</code></pre><p><br></p>'
      },
      {
        title: '工作总结',
        type: 'md',
        path: 'root/工作总结',
        category: '分类',
        digest:
          '菜鸟教程不提供任何形式的保证。所有与使用本站相关的直接风险均由用户承担。菜鸟教程提供的所有代码均为实例，并不对性能、适用性、适销性或/及其他方面提供任何保证。菜鸟教程的内容可能包含不准确性或错误。菜鸟',
        img: '',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/工作总结',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/工作总结',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        fileSha: 'dca2fd36c7bca0cfd751ab8887ed81417004a165',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 19,
        content: ''
      },
      {
        title: 'MarkDown文本测试.md',
        type: 'md',
        path: 'root/MarkDown文本测试.md',
        category: '分类',
        digest:
          '注：以下项目为个人业余时间开发的开源项目，公司项目保密不在此展示\nFileHub 介绍\n一个基于Github开发的文件存储软件，美其名曰：FileHub，可存万物。类似于百度云盘的功能，基本功能：例如',
        img: 'https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/others/%E7%99%BB%E5%BD%95%E9%A1%B5.png',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/MarkDown文本测试.md',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/MarkDown文本测试.md',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        issueNum: 25,
        fileSha: 'd51530f6ea8c5f10f0d142fff2a26dec8482a6f8',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        content: ''
      },
      {
        title: '那一些想法',
        type: 'md',
        path: 'root/那一些想法',
        category: '分类',
        digest:
          '本站包括了HTML、CSS、Javascript、PHP、C、Python等各种基础编程教程。同时本站中也提供了大量的在线实例，通过实例，您可以更好地学习如何建站。本站致力于推广各种编程语言技术，所有',
        img: '',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/那一些想法',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/那一些想法',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        fileSha: '6ff50c9232ea26de8eac8b6f140ae02b5d607240',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 17,
        content: ''
      },
      {
        title: '纯文本内容',
        type: 'md',
        path: 'root/纯文本内容',
        category: '分类',
        digest:
          '众所周知，Chris Lattner 是 LLVM 项目的主要发起人与作者之一，他曾受雇于苹果公司，为苹果电脑开发应用程序系统，在这家公司任职的多年间，先后发起 Clang 项目、设计 Swift 编',
        img: '',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/纯文本内容',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/纯文本内容',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        fileSha: '57cb73b3c0f846fc9c33d324909fd98106fb249c',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 16,
        content:
          '<p>众所周知，Chris Lattner 是 LLVM 项目的主要发起人与作者之一，他曾受雇于苹果公司，为苹果电脑开发应用程序系统，在这家公司任职的多年间，先后发起 Clang 项目、设计 Swift 编程语言，而后功成身退，选择离开苹果。又因认为「Swift 核心团队会议中的存在“有毒环境”」，而选择正式退出 Swift 核心开发团队众所周知，Chris Lattner 是 LLVM 项目的主要发起人与作者之一，他曾受雇于苹果公司，为苹果电脑开发应用程序系统，在这家公司任职的多年间，先后发起 Clang 项目、设计 Swift 编程语言，而后功成身退，选择离开苹果。又因认为「Swift 核心团队会议中的存在“有毒环境”」，而选择正式退出 Swift 核心开发团队众所周知，Chris Lattner 是 LLVM 项目的主要发起人与作者之一，他曾受雇于苹果公司，为苹果电脑开发应用程序系统，在这家公司任职的多年间，先后发起 Clang 项目、设计 Swift 编程语言，而后功成身退，选择离开苹果。又因认为「Swift 核心团队会议中的存在“有毒环境”」，而选择正式退出 Swift 核心开发团队众所周知，Chris Lattner 是 LLVM 项目的主要发起人与作者之一，他曾受雇于苹果公司，为苹果电脑开发应用程序系统，在这家公司任职的多年间，先后发起 Clang 项目、设计 Swift 编程语言，而后功成身退，选择离开苹果。又因认为「Swift 核心团队会议中的存在“有毒环境”」，而选择正式退出 Swift 核心开发团队众所周知，Chris Lattner 是 LLVM 项目的主要发起人与作者之一，他曾受雇于苹果公司，为苹果电脑开发应用程序系统，在这家公司任职的多年间，先后发起 Clang 项目、设计 Swift 编程语言，而后功成身退，选择离开苹果。又因认为「Swift 核心团队会议中的存在“有毒环境”」，而选择正式退出 Swift 核心开发团队</p>'
      },
      {
        title: '第一篇文章.md',
        type: 'md',
        path: 'root/第一篇文章.md',
        category: '分类',
        digest:
          '这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第',
        img: 'https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10034.jpeg',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/第一篇文章.md',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/第一篇文章.md',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        fileSha: '8d318da38b4caabf53c32cf155e5fc9a6f147999',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 14,
        content:
          '<p>这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容这是第一篇文章内容</p>'
      },
      {
        title: 'DES和RSA加解密小工具',
        type: 'md',
        path: 'root/DES和RSA加解密小工具',
        category: '分类',
        digest:
          '闲来无事做的一个DES和RSA加解密小工具，有助于学习一下加解密的基本知识，了解下非对称加密算法RSA的公钥和私钥，网上相关的代码很多，自己可以试着做一做，RSA会遇到分段加密、分段解密的问题。DES',
        img: '',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/DES和RSA加解密小工具',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/DES和RSA加解密小工具',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        issueNum: 24,
        fileSha: '8ebc617c509a6498c854396ce7e4f2ed1b43694f',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        content: ''
      },
      {
        title: '什么时候开始吃饭',
        type: 'md',
        path: 'root/什么时候开始吃饭',
        category: '分类',
        digest:
          '需求是从数据库查数据，在前端以柱形图的形式展现出来，查到的数据按行业分组，显示每个行业的户数及户数占比，涉及到的字段有A表的用户数、总用户数和B表的行业名称。本来是不管查不查的到数据，在X轴都应该显示',
        img: '',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/什么时候开始吃饭',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/什么时候开始吃饭',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        fileSha: '0943b465ab53d7b7cd6e07b8c40b3dc0487a1027',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 20,
        content:
          '<p><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">需求是从数据库查数据，在前端以</span><a href="https://so.csdn.net/so/search?q=%E6%9F%B1%E5%BD%A2%E5%9B%BE&amp;spm=1001.2101.3001.7020" target="_blank" style="text-align: start;">柱形图</a><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">的形式展现出来，查到的数据按行业分组，显示每个行业的户数及户数占比，涉及到的字段有A表的用户数、总用户数和B表的行业名称。本来是不管查不查的到数据，在X轴都应该显示行业名称的，结果是X、Y轴都没有任何数据显示。问题就是我用错了联结方式。需求是从数据库查数据，在前端以</span><a href="https://so.csdn.net/so/search?q=%E6%9F%B1%E5%BD%A2%E5%9B%BE&amp;spm=1001.2101.3001.7020" target="_blank" style="text-align: start;">柱形图</a><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">的形式展现出来，查到的数据按行业分组，显示每个行业的户数及户数占比，涉及到的字段有A表的用户数、总用户数和B表的行业名称。本来是不管查不查的到数据，在X轴都应该显示行业名称的，结果是X、Y轴都没有任何数据显示。问题就是我用错了联结方式。需求是从数据库查数据，在前端以</span><a href="https://so.csdn.net/so/search?q=%E6%9F%B1%E5%BD%A2%E5%9B%BE&amp;spm=1001.2101.3001.7020" target="_blank" style="text-align: start;">柱形图</a><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">的形式展现出来，查到的数据按行业分组，显示每个行业的户数及户数占比，涉及到的字段有A表的用户数、总用户数和B表的行业名称。本来是不管查不查的到数据，在X轴都应该显示行业名称的，结果是X、Y轴都没有任何数据显示。问题就是我用错了联结方式。需求是从数据库查数据，在前端以</span><a href="https://so.csdn.net/so/search?q=%E6%9F%B1%E5%BD%A2%E5%9B%BE&amp;spm=1001.2101.3001.7020" target="_blank" style="text-align: start;">柱形图</a><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">的形式展现出来，查到的数据按行业分组，显示每个行业的户数及户数占比，涉及到的字段有A表的用户数、总用户数和B表的行业名称。本来是不管查不查的到数据，在X轴都应该显示行业名称的，结果是X、Y轴都没有任何数据显示。问题就是我用错了联结方式。</span></p>'
      },
      {
        title: '还有啥需要记录的',
        type: 'md',
        path: 'root/还有啥需要记录的',
        category: '分类',
        digest:
          '菜鸟教程提供的内容仅用于个人学习、研究或欣赏。我们不保证内容的正确性。通过使用本站内容随之而来的风险与本站无关访问者可将本网站提供的内容或服务用于个人学习、研究或欣赏，以及其他非商业性或非盈利性用途，',
        img: '',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/还有啥需要记录的',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/还有啥需要记录的',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        fileSha: '6e5fc30c7222b454df133e09180cc4064eac1bd4',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 18,
        content: ''
      },
      {
        title: '随便记录点内容',
        type: 'md',
        path: 'root/随便记录点内容',
        category: '分类',
        digest:
          '一个使用 tauri+react+ts 开发跨平台软件的模板，支持窗口头部自定义和窗口阴影，不用再自己做适配了，拿来即用，非常 nice。而且已经封装好了 tauri 的 http 请求工具，省去很多',
        img: 'https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10084.jpeg',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/随便记录点内容',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/随便记录点内容',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        fileSha: '67ba5584834a2919e3559db8b7822f38c83e71e7',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 15,
        content:
          '<p style="text-align: start;">一个使用 tauri+react+ts 开发跨平台软件的模板，支持窗口头部自定义和窗口阴影，不用再自己做适配了，拿来即用，非常 nice。而且已经封装好了 tauri 的 http 请求工具，省去很多弯路。</p><p style="text-align: start;">使用到的技术栈：<br>tauri：必须要用到的<br>react：前端页面开发框架，也可以用 Vue<br>react-router：路由页面跳转控制<br>mobx：数据存储和共享<br>antd：UI 页面渲染<br>sass：样式编程<br>node：v16.18.0 本地开发依赖</p><p style="text-align: start;"><img src="https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10070.jpeg" alt="https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10070.jpeg" data-href="https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10070.jpeg" style=""></p><h2 style="text-align: start;">页面预览：登陆页和主页</h2><p><img src="https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10034.jpeg" alt="https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10034.jpeg" data-href="https://jsd.cdn.zzko.cn/gh/1024huijia/FileHub@main/root/picture/10034.jpeg" style=""/></p>'
      },
      {
        title: 'mac使用VsCode远程连接服务器',
        type: 'md',
        path: 'root/mac使用VsCode远程连接服务器',
        category: '分类',
        digest:
          '它接收到的参数一 prop中可以接收到的数据是基本一样的如果我们想自已写一个组件， 把 elementPlus 中的期中一个组件封装一下。可以这样做',
        img: '',
        openLink:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/mac使用VsCode远程连接服务器',
        downLike:
          'https://cdn.staticaly.com/gh/Sjj1024/Dochub@main/root/mac使用VsCode远程连接服务器',
        delete: 'false',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        fileSha: '3f0f18e9776acfe93f5e92e86938a614f404e39a',
        createTime: '2023.8.22',
        updateTime: '2023.8.23',
        issueNum: 21,
        content: ''
      }
    ]
  },
  downFile(path: string) {
    return http(path, {
      method: 'get',
      responseType: ResponseType.Binary
    })
  },
  creatIssue(body: any) {
    return http('/repos/Sjj1024/DataHub/issues', {
      method: 'post',
      body: body
    })
  },
  uploadFile(filePath: string, body: any) {
    return http(
      `/repos/${userStore.gitName}/${userStore.gitRepo}/contents${filePath}`,
      {
        method: 'put',
        body: body
      }
    )
  },
  importSource(filePath: string, body: any) {
    return http(
      `/repos/${userStore.gitName}/${userStore.gitRepo}/contents${filePath}`,
      {
        method: 'put',
        body: body
      }
    )
  },
  delFile(filePath: string, body: any) {
    return http(
      `/repos/${userStore.gitName}/${userStore.gitRepo}/contents/${filePath}`,
      {
        method: 'DELETE',
        body: body
      }
    )
  },
  shareFile(body: any) {
    return http('/repos/Sjj1024/DataHub/issues', {
      method: 'post',
      body: body
    })
  },
  registUser(token: string, body: any) {
    return http(`/repos/Sjj1024/DataHub/issues`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: body
    })
  },
  getShareFiles(label?: string) {
    return http(`/repos/Sjj1024/DataHub/issues?${label}`, {
      method: 'get'
    })
  },
  updateShare(issue_number: string, body: any) {
    return http(`/repos/Sjj1024/DataHub/issues/${issue_number}`, {
      method: 'PATCH',
      body: body
    })
  },
  searchShare(
    keyWord: string = 'FileHub',
    lable: string = '+label:share',
    state: string = '+state:closed',
    author: string = '',
    pageSize: number = 35,
    pageNum: number = 1
  ) {
    // 在Sjj1024/DataHub中搜索关闭的和分享的内容，并且是标题里面包含关键字的
    return http(
      `/search/issues?q=${
        keyWord + lable + state + author
      }+in:title+repo:Sjj1024/DataHub&per_page=${pageSize}&page=${pageNum}`,
      {
        method: 'get'
      }
    )
  }
}
