<template>
  <div class="base-box">
    <div class="base-line">
      <div class="base">
        <span class="line-lable">主题设置：</span>
        <el-select v-model="themeVal" class="m-2" placeholder="Select">
          <el-option v-for="item in themeOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="base">
        <span class="line-lable">语言设置：</span>
        <el-select v-model="langVal" class="m-2" placeholder="Select">
          <el-option v-for="item in langOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">文件展示样式：</span>
        <el-radio-group v-model="fileStyle">
          <el-radio-button label="网格" />
          <el-radio-button label="列表" />
        </el-radio-group>
      </div>
      <div class="base">
        <span class="line-lable">文件下载路径：</span>
        <el-input v-model="filePath" placeholder="Please input" style="width: 220px;" />
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">复制链接模板：</span>
        <el-select v-model="copyTmp" class="m-2" placeholder="Select">
          <el-option v-for="item in copyOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="base">
        <span class="line-lable">多文件默认模板：</span>
        <el-select v-model="copyMoreTmp" class="m-2" placeholder="Select">
          <el-option v-for="item in copyOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">开机自启动：</span>
        <el-switch v-model="startOn" active-text="开启" inactive-text="关闭" />
      </div>
      <div class="base">
        <span class="line-lable">软件自动更新：</span>
        <el-switch v-model="updateOn" active-text="开启" inactive-text="关闭" />
      </div>
    </div>
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
const fileStyle = ref("网格")

// 文件下载路径
const filePath = ref("")

// 复制链接模板
const copyTmp = ref('')

const copyOpt = [
  {
    value: 'Option1',
    label: '原始链接',
  },
  {
    value: 'Option2',
    label: 'Option2',
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
  }
}
</style>