<template>
  <div class="base-box">
    <div class="base-line">
      <div class="base">
        <span class="line-lable">链接规则：</span>
        <el-select v-model="linkVal" class="m-2" placeholder="默认亮白主题">
          <el-option v-for="item in linkOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="tips">
          <el-popover placement="bottom" :width="580" trigger="hover">
            <div>
              <h4>GitHub图片CDN链接规则</h4>
              <span>Staticaly：</span>
              <span v-pre>https://cdn.staticaly.com/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}</span><br />
              <span>ChinaJsDelivr：</span>
              <span v-pre>https://jsd.cdn.zzko.cn/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}</span><br />
              <span>jsDelivr：</span>
              <span v-pre>https://cdn.jsdelivr.net/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}</span><br />
              <span>GitHub：</span>
              <span v-pre>https://github.com/{{owner}}/{{repo}}/raw/{{branch}}/{{path}}</span><br />
              <span>GitHub IO：</span>
              <span v-pre>https://github.com/{{owner}}/{{repo}}/raw/{{branch}}/{{path}}</span><br />
            </div>
            <template #reference>
              <el-icon>
                <InfoFilled />
              </el-icon>
            </template>
          </el-popover>
        </div>
      </div>
      <div class="base">
        <span class="line-lable">自动复制链接：</span>
        <el-select v-model="autoLink" class="m-2" placeholder="默认简体中文">
          <el-option v-for="item in autoLinkOpt" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
        <div class="tips">
          <el-popover placement="bottom" :width="250" trigger="hover" content="文件上传后自动复制链接到粘贴板">
            <template #reference>
              <el-icon>
                <InfoFilled />
              </el-icon>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">图片压缩算法：</span>
        <el-select v-model="zipMethod" class="m-2" placeholder="默认亮白主题">
          <el-option v-for="item in zipMethodOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="tips">
          <el-popover placement="bottom" :width="500" trigger="hover">
            <div>
              <h4>图片上传时启用的压缩算法</h4>
              <span>webP：</span>
              <span v-pre>压缩后图片格式为 webp，压缩率较高，大多数浏览器支持</span><br />
              <span>mozJPEG：</span>
              <span v-pre>压缩后图片格式为 jpg，兼容性最好，所有浏览器支持</span><br />
              <span>avif：</span>
              <span v-pre>压缩后图片格式为 avif，压缩率极高，部分现代浏览器支持</span><br />
            </div>
            <template #reference>
              <el-icon>
                <InfoFilled />
              </el-icon>
            </template>
          </el-popover>
        </div>
      </div>
      <div class="base">
        <span class="line-lable">图片水印设置：</span>
        <el-select v-model="waterSet" class="m-2" placeholder="默认简体中文">
          <el-option v-for="item in waterOpt" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
        <div class="tips">
          <el-popover placement="bottom" :width="200" trigger="hover" content="文件上传时添加的水印">
            <template #reference>
              <el-icon>
                <InfoFilled />
              </el-icon>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
  <div class="save-user">
    <el-button type="primary" @click="addLink">添加链接规则</el-button>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const linkVal = ref('Staticaly')
const linkOpt = [
  {
    value: 'Staticaly',
    label: 'Staticaly',
  },
  {
    value: 'ChinaJsDelivr',
    label: 'ChinaJsDelivr',
  },
  {
    value: 'jsDelivr',
    label: 'jsDelivr',
  },
  {
    value: 'GitHub',
    label: 'GitHub',
  },
  {
    value: 'GitHub IO',
    label: 'GitHub IO',
  }
]

const autoLink = ref(false)
const autoLinkOpt = [
  {
    value: true,
    label: '开启',
  },
  {
    value: false,
    label: '关闭',
  }
]

// 图片压缩
const zipMethod = ref("webP")
const zipMethodOpt = [
  {
    value: 'webP',
    label: 'webP',
  },
  {
    value: 'mozJPEG',
    label: 'mozJPEG',
  },
  {
    value: 'avif',
    label: 'avif',
  }
]

// 图片水印设置
const waterSet = ref('暂不支持设置')

const waterOpt = [
  {
    value: 'souLink',
    label: '暂不支持设置',
  }
]

const addLink = () => {
  ElMessage({
    message: '暂不支持该操作',
    type: 'success',
  })
}
</script>

<style scoped lang='scss'>
.save-user {
  text-align: center;
  margin-top: 20px;
}

.base-line {
  display: flex;
  margin-bottom: 10px;

  .base {
    flex: 1;
    display: flex;
    align-items: center;

    .line-lable {
      width: 128px;
      text-align: left;
    }

    .tips {
      margin-left: 10px;
    }
  }
}
</style>