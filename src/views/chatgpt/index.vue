<template>
  <div class="chat-box">
    <!-- 打开聊天列表 -->
    <el-icon class="guide-ico" v-show="!drawer" @click="drawer = true">
      <CaretBottom />
    </el-icon>
    <!-- 主聊天窗口 -->
    <div class="chat-main" @click="drawer = false">
      <div class="main-content">
        <!-- 使用ul列表来渲染控制显示的消息：根据发送还是接收，展示不同的消息样式 -->
        <div class="sender">
          <el-icon class="msg-send">
            <CaretRight />
          </el-icon>
          <span class="my-message">帮我制定一个健身计划，我想要在一个月内减肥10斤</span>
          <span class="my-png">
            <img :src="uStore.gitAvatar" alt="" class="avatar">
          </span>
        </div>
        <div class="gpt-res">
          <el-icon class="msg-gpt">
            <CaretLeft />
          </el-icon>
          <span class="gpt-png">
            <img :src="gptImg" alt="" class="avatar">
          </span>
          <span class="gpt-message">好的，以下是一个适合减脂的健身计划：

            有氧运动：每周进行至少3次有氧运动，如跑步、跳绳、游泳等，每次持续30分钟以上。

            高强度间歇训练：每周进行2次高强度间歇训练，比如快速的体操动作、蛙跳、俯卧撑等，每次持续大约15-20分钟。

            重量训练：每周进行2次重量训练，以增强肌肉力量，帮助燃烧更多脂肪。可以选择哑铃、杠铃等器械进行训练，每次持续30分钟左右。

            减少热量摄入：要减肥就必须控制饮食。每天摄入量应该减少500卡路里左右，可通过少吃淀粉质食物、多吃蔬果、规律饮食等方式达到控制总热量的目的。
            每天饮用足够的水：每天至少饮用8杯水，帮助身体代谢废物和脂肪。
            需要注意的是，减肥需要耐心和恒心，建议在营养师或健身教练的指导下进行较为安全和有效的减肥。

          </span>
        </div>
      </div>
      <div class="main-send">
        <el-input v-model="input1" class="send-input" placeholder="请输入消息内容">
          <template #suffix>
            <el-icon class="send-icon">
              <Promotion />
            </el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <!-- 左侧聊天列表 -->
    <el-drawer v-model="drawer" lock-scroll modal :with-header="false" direction="ttb" class="chat-list">
      <div class="chat-header">
        <span>ChatGPT List</span>
        <span class="new-chat"><el-icon>
            <Plus />
          </el-icon></span>
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
import { reactive, ref } from 'vue'
import gptImg from "@/assets/image/chat.png"
import { useUserStore } from '@/stores/user'
import { Promotion } from '@element-plus/icons-vue'


const uStore = useUserStore()
const drawer = ref(false)
const input1 = ref('')

const messageList = reactive([
  {
    id: "",
    role: "",
    content: "",
    sendTime: "",
    session: "",
  }
])

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
    z-index: 9;
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

      .new-chat {
        font-size: 16px;
        font-weight: 400;
        margin-left: 20px;

        &:hover {
          color: #409EFF;
        }
      }
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
    position: relative;
    padding: 10px 20px;
    background-color: rgb(245, 245, 245);

    .main-content {
      height: 100%;

      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 6px;
      }

      .gpt-res {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: start;
        // background-color: pink;

        .msg-gpt {
          position: absolute;
          top: 15px;
          left: 46px;
          color: white;
          font-size: 20px;
        }

        .gpt-png {
          margin-right: 10px;
          vertical-align: middle;
        }

        .gpt-message {
          padding: 14px 10px;
          width: 60%;
          border-radius: 10px;
          background-color: white;

          &:hover {
            .msg-gpt {
              color: rgb(235, 235, 235);
            }

            background-color: rgb(235, 235, 235);
          }
        }
      }

      .sender {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: end;
        // background-color: skyblue;

        .msg-send {
          position: absolute;
          top: 15px;
          right: 46px;
          color: rgb(149, 236, 105);
          font-size: 20px;
        }

        .my-png {
          margin-left: 10px;
          vertical-align: middle;
        }

        .my-message {
          padding: 14px 10px;
          width: 60%;
          border-radius: 10px;
          background-color: rgb(149, 236, 105);

          &:hover {
            .msg-send {
              color: rgb(137, 217, 97);
            }

            background-color: rgb(137, 217, 97);
          }
        }
      }
    }

    .main-send {
      position: absolute;
      bottom: 52px;
      width: calc(100% - 40px);
      height: 50px;

      .send-input {
        height: 44px;
        font-size: 16px;
        border-radius: 10px;
      }

      .send-icon {
        font-size: 26px;

        &:hover {
          color: #79bbff;
        }
      }
    }
  }
}
</style>