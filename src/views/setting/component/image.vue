<template>
  <div class="base-box">
    <div class="base-line">
      <div class="base">
        <span class="line-lable">链接规则：</span>
        <el-select v-model="themeVal" class="m-2" placeholder="默认亮白主题">
          <el-option v-for="item in themeOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="tips">
          <el-popover placement="bottom" :width="580" trigger="hover">
            <div>
              <h4>GitHub图片CDN链接规则</h4>
              <span>Staticaly：</span>
              <span v-pre>https://cdn.staticaly.com/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}</span><br/>
              <span>ChinaJsDelivr：</span>
              <span v-pre>https://jsd.cdn.zzko.cn/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}</span><br/>
              <span>jsDelivr：</span>
              <span v-pre>https://cdn.jsdelivr.net/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}</span><br/>
              <span>GitHub：</span>
              <span v-pre>https://github.com/{{owner}}/{{repo}}/raw/{{branch}}/{{path}}</span><br/>
              <span>GitHub IO：</span>
              <span v-pre>https://github.com/{{owner}}/{{repo}}/raw/{{branch}}/{{path}}</span><br/>
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
        <span class="line-lable">自动复制：</span>
        <el-select v-model="langVal" class="m-2" placeholder="默认简体中文">
          <el-option v-for="item in langOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="tips">
          <el-popover placement="bottom" :width="250" trigger="hover"
            content="文件上传后自动复制链接到粘贴板">
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
        <el-select v-model="themeVal" class="m-2" placeholder="默认亮白主题">
          <el-option v-for="item in themeOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="tips">
          <el-popover placement="bottom" :width="500" trigger="hover">
            <div>
              <h4>图片上传时启用的压缩算法</h4>
              <span>webP：</span>
              <span v-pre>压缩后图片格式为 webp，压缩率较高，大多数浏览器支持</span><br/>
              <span>mozJPEG：</span>
              <span v-pre>压缩后图片格式为 jpg，兼容性最好，所有浏览器支持</span><br/>
              <span>avif：</span>
              <span v-pre>压缩后图片格式为 avif，压缩率极高，部分现代浏览器支持</span><br/>
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
        <el-select v-model="langVal" class="m-2" placeholder="默认简体中文">
          <el-option v-for="item in langOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="tips">
          <el-popover placement="bottom" :width="200" trigger="hover"
            content="文件上传时添加的水印">
            <template #reference>
              <el-icon>
                <InfoFilled />
              </el-icon>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
    <!-- <div class="base-line">
      <div class="base">
        <span class="line-lable">文件展示样式：</span>
        <el-select v-model="fileStyle" class="m-2" placeholder="Select">
          <el-option v-for="item in fileOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="base">
        <span class="line-lable">文件下载路径：</span>
        <el-input v-model="filePath" placeholder="默认系统下载路径" style="width: 220px;" />
      </div>
    </div> -->
  </div>
  <div class="save-user">
    <el-button type="primary">添加链接规则</el-button>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
const langVal = ref('简体中文')
const langOpt = [
  {
    value: '简体中文',
    label: '简体中文',
  },
  {
    value: 'English',
    label: 'English',
  }
]

const themeVal = ref('亮白主题')
const themeOpt = [
  {
    value: '暗黑主题',
    label: '暗黑主题',
  },
  {
    value: '亮白主题',
    label: '亮白主题',
  }
]

// 文件展示样式
const fileStyle = ref("grid")
const fileOpt = [
  {
    value: 'grid',
    label: '网格布局',
  },
  {
    value: 'list',
    label: '列表布局',
  }
]

// 文件下载路径
const filePath = ref("")

// 复制链接模板
const copyTmp = ref('')

const copyOpt = [
  {
    value: 'souLink',
    label: '原始链接',
  },
  {
    value: 'forLink',
    label: '论坛代码',
  },
  {
    value: 'mdLink',
    label: 'MarkDown',
  },
  {
    value: 'htmlLink',
    label: 'HTML标签',
  }
]
// 多文件复制模板
const copyMoreTmp = ref("")

// 开机启动
const startOn = ref(false)
// 自动更新
const updateOn = ref(false)

const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  }
]

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