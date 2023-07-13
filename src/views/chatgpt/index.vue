<template>
  <div class="chat-box">
    <!-- 打开聊天列表 -->
    <el-icon class="guide-ico" @click="drawer = true">
      <CaretBottom />
    </el-icon>
    <!-- 主聊天窗口 -->
    <div class="chat-main" @click="drawer = false">
      <div class="main-title">与健身相关的聊天</div>
      <div class="main-content">主要的消息记录区域</div>
      <div class="main-send">发送消息区</div>
    </div>
    <!-- 左侧聊天列表 -->
    <el-drawer v-model="drawer" lock-scroll modal :with-header="false" direction="ttb" class="chat-list">
      <div class="chat-header">
        ChatGpt List
      </div>
      <ul class="chat-ul">
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

const drawer = ref(true)

</script>

<style scoped>
:deep(.el-drawer__body) {
  padding: 0 0 40px 0;
}

:deep(.el-drawer__body)::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

:deep(.el-drawer__body)::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

:deep(.el-drawer__body)::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #c3c3c3;
}

:deep(.el-drawer__body)::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>

<style lang='scss'>
.chat-box {
  position: relative;
  height: 100%;

  .guide-ico {
    position: absolute;
    top: -12px;
    left: calc(12% - 18px);
    font-size: 30px;
    cursor: pointer;
  }

  .el-overlay {
    position: unset !important;
    height: unset;
  }

  .chat-list {
    width: 25% !important;
    height: 100% !important;
    color: black;
    background-color: rgb(237, 237, 237);

    .chat-header {
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
    }

    .chat-ul {
      .chat-li {
        list-style: none;
        cursor: default;
        padding: 10px;

        &:hover {
          background-color: rgb(211, 209, 209);
        }

        .chat-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 17px;
        }

        .chat-time {
          margin-top: 8px;
          font-size: 14px;
          font-weight: 400;
          display: flex;
          color: gray;
          justify-content: space-between;
        }
      }
    }
  }

  .chat-main {
    height: 100%;
    // background-color: rgb(48 59 117/1);
  }
}
</style>