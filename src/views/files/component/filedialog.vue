<template>
  <el-dialog v-model="centerDialogVisible" :title="file.name" width="100%" center top="0" fullscreen>
    <div class="open-content">
      显示的内容
    </div>
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
import { ref } from 'vue'

const centerDialogVisible = ref(false)

const props = defineProps({
  file: {
    type: Object,
    default: {
      name: "",
      path: "",
      type: "",
      size: "",
      openLink: '',
      downLink: '',
      htmlLink: "",
      creatTime: '',
      selected: false,
      showTips: false,
      uploading: false,
    },
  },
})

const showFileDialog = (source: Boolean) => {
  centerDialogVisible.value = true
  console.log("fiel-----", source);
}

defineExpose({
  showFileDialog
})



</script>

<style lang='scss'>
:deep(.el-dialog__body){
  height: 100%;
}

.open-content{
  height: 100%;
}
</style>