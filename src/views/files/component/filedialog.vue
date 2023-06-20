<template>
  <el-dialog v-model="centerDialogVisible" :title="file.name" width="30%" center>
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import type { fileRes } from "@/utils/useTypes"

const centerDialogVisible = ref(false)

let file: fileRes = reactive({
  name: "默认值",
  path: "",
  type: "",
  size: "",
  openLink: 'https://element-plus.gitee.io/',
  downLink: 'https://element-plus.gitee.io/',
  htmlLink: "",
  creatTime: '2021-08-22',
  selected: false,
  showTips: false,
  uploading: false,
})

const showFileDialog = (source: fileRes) => {
  centerDialogVisible.value = true
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      file[key] = source[key]
    }
  }
  // file.name = source.name
  console.log("fiel-----", file);
}

defineExpose({
  showFileDialog
})

</script>

<style scoped lang='scss'></style>