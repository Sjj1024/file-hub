<template>
  <div class="help-box">
    <div class="filehub-info">
      <h3>项目介绍</h3>
      <span>
        FileHub是一个依托Github
        Api开发的免费文件系统软件，功能类似百度云，但没有百度云的会员限制。主要用作图床和网络文件存储。其他附加功能并不是本软件的核心功能，但是就是想集成进去，因为可能是我个人常用的功能。如果对你有帮助，可以请我喝个咖啡：
      </span><br />
      <span class="praise">
        <span class="pay-box">
          <div>微信赞赏码</div>
          <img class="pay-code" src="https://cdn.staticaly.com/gh/XPoet/image-hosting@master/common/appreciation.webp"
            alt="">
        </span>
        <span class="pay-box">
          <div>支付宝打赏</div>
          <img class="pay-code" src="https://cdn.staticaly.com/gh/XPoet/image-hosting@master/common/appreciation.webp"
            alt="">
        </span>
        <span class="pay-box">
          <div>QQ交流群</div>
          <img class="pay-code" src="https://cdn.staticaly.com/gh/XPoet/image-hosting@master/common/appreciation.webp"
            alt="">
        </span>
        <span class="pay-box">
          <div>微信交流群</div>
          <img class="pay-code" src="https://cdn.staticaly.com/gh/XPoet/image-hosting@master/common/appreciation.webp"
            alt="">
        </span>
      </span>
    </div>
    <br />
    <div>
      <h3>我的信息</h3>
      <span>曾就职于上海华为实验室，现自有开发者，如果你有开发需求，可以联系我做外包，目前我主要做：网站+桌面端+移动端+小程序+浏览器插件+油猴脚本+各种需求可以私信联系我。合作流程：按照合作谈定的价格，预付50%的项目款，开始工作。完成验收后，支付尾款。价格参考：视具体项目难度和工作量等，一般来说，工时价格为150
        左右。<br />
        技术栈：Python + Java + Kotlin + Swift + HTML + Js + Vue + React + Tauri等<br />
        端开发：Web网站 + 桌面端 + 移动端(安卓Android/苹果IOS) + Chrome插件 + 油猴脚本等<br />
        平台主页：Github主页 + CSDN(访问量200W) + Bilibili主页 + 抖音主页 + 微信公众号 + 今日头条<br />
        联系方式：邮箱：1024xiaoshen@gmail.com QQ: 2950525265 微信: 2950525265<br />
      </span>
    </div>
  </div>
</template>

<script setup lang='ts'>
</script>

<style scoped lang='scss'>
.help-box {
  padding: 10px;
}

.praise {
  display: flex;
  justify-content: space-around;

  .pay-box {
    text-align: center;
  }
}

.pay-code {
  width: 200px;
  height: 200px;
}
</style>