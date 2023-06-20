<template>
  <el-dialog v-model="centerDialogVisible" :title="fileName" width="100%" center top="0" fullscreen>
    <div class="open-content">
      显示的内容
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          下载
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import type { fileRes } from "@/utils/useTypes"

const centerDialogVisible = ref(false)

let fileName = ref("默认标题")

const showFileDialog = (source: Boolean, f: fileRes) => {
  centerDialogVisible.value = true
  fileName.value = f.name
  console.log("fiel-----", source, f, fileName);
}

// 实时计算弹窗内容高度
let dialogHeight = ref(document.body.clientHeight - 116)
window.onresize = () => {
  console.log(`body宽度：${document.body.clientWidth}`);
};

defineExpose({
  showFileDialog
})

</script>

<style lang='scss' scoped>
:deep(.el-dialog__body){
  // height: v-bind(dialogHeight);
  height: 1000px;
}
</style>