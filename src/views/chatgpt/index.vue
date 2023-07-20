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
          <span class="my-message">
            <el-icon class="msg-send">
              <CaretRight />
            </el-icon>
            <span>帮我制定一个健身计划，我想要在一个月内减肥10斤</span>
          </span>
          <span class="my-png">
            <img :src="uStore.gitAvatar" alt="" class="avatar">
          </span>
        </div>
        <div class="gpt-res">
          <span class="gpt-png">
            <img :src="gptImg" alt="" class="avatar">
          </span>
          <span class="gpt-message">
            <el-icon class="msg-gpt">
              <CaretLeft />
            </el-icon>
            <span>
              好的，以下是一个适合减脂的健身计划：
              有氧运动：每周进行至少3次有氧运动，如跑步、跳绳、游泳等，每次持续30分钟以上。
              高强度间歇训练：每周进行2次高强度间歇训练，比如快速的体操动作、蛙跳、俯卧撑等，每次持续大约15-20分钟。
              重量训练：每周进行2次重量训练，以增强肌肉力量，帮助燃烧更多脂肪。可以选择哑铃、杠铃等器械进行训练，每次持续30分钟左右。
              减少热量摄入：要减肥就必须控制饮食。每天摄入量应该减少500卡路里左右，可通过少吃淀粉质食物、多吃蔬果、规律饮食等方式达到控制总热量的目的。
              每天饮用足够的水：每天至少饮用8杯水，帮助身体代谢废物和脂肪。
              需要注意的是，减肥需要耐心和恒心，建议在营养师或健身教练的指导下进行较为安全和有效的减肥。
            </span> </span>
        </div>
        <div class="sender">
          <span class="my-message">
            <el-icon class="msg-send">
              <CaretRight />
            </el-icon>
            <span>你觉得python未来发展怎么样</span>
          </span>
          <span class="my-png">
            <img :src="uStore.gitAvatar" alt="" class="avatar">
          </span>
        </div>
        <div class="gpt-res">
          <span class="gpt-png">
            <img :src="gptImg" alt="" class="avatar">
          </span>
          <span class="gpt-message">
            <span>作为一个AI，我认为Python在未来的发展前景非常乐观。Python是一种功能强大且易于学习的编程语言，已经成为了许多领域的首选语言，如数据科学、人工智能、Web开发等。与其它语言相比，Python有着简洁的语法、丰富的生态系统和活跃的社区支持。此外，Python还具有良好的跨平台性和扩展性，很多大型公司和开源项目都在使用Python。随着人工智能、物联网和数据科学等领域的迅速发展，Python的需求还将进一步增加。因此，我相信Python在未来仍然会持续蓬勃发展。</span>
            <el-icon class="msg-gpt">
              <CaretLeft />
            </el-icon>
          </span>
        </div>
        <div class="sender">
          <span class="my-message">
            <span>你觉得rust未来发展怎么样</span>
            <el-icon class="msg-send">
              <CaretRight />
            </el-icon>
          </span>
          <span class="my-png">
            <img :src="uStore.gitAvatar" alt="" class="avatar">
          </span>
        </div>
        <div class="gpt-res">
          <span class="gpt-png">
            <img :src="gptImg" alt="" class="avatar">
          </span>
          <span class="gpt-message">
            <el-icon class="msg-gpt">
              <CaretLeft />
            </el-icon>
            <span>
              作为一个AI，我认为Rust在未来有很大的发展潜力。Rust是一门强类型、系统级的编程语言，注重安全性、并发性和性能优化。它的核心理念是“零成本抽象”，旨在为开发者提供高效、可靠的软件开发工具。Rust具有许多吸引人的特点，如内存安全性、线程安全性和错误处理机制等，使得它成为可信赖和可维护的选择。

              在近年来，Rust在开源社区和工业界都得到了广泛的关注。它在系统级编程、嵌入式系统、网络服务和区块链等领域都有着广泛的应用。Rust的社区也在不断壮大，开发者们积极贡献库、框架和工具，进一步丰富了Rust生态系统。

              随着软件安全性和性能优化的需求不断增加，我相信Rust将在未来得到更多认可和应用。它的独特特性和有力的工具链使得Rust成为一个有竞争力的编程语言，为开发者提供了解决复杂问题的强大能力。因此，我对Rust在未来的发展表达乐观态度。
            </span>
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
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </div>
        </li>
        <li class="chat-li">
          <div class="chat-title">制定一个健身计划，我想要在一个月内减肥10斤</div>
          <div class="chat-time">
            <span>2023-06-27 09:59</span>
            <span>4条对话</span>
          </div>
          <div class="close-li">
            <el-icon>
              <RemoveFilled />
            </el-icon>
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
  padding: 0 0 0 0;
  background-color: #303b75;
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
  background-color: #252f5d;
}

:deep(.el-drawer__body)::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>

<style lang='scss'>
.chat-box {
  position: relative;

  .guide-ico {
    position: fixed;
    top: 44px;
    left: 200px;
    font-size: 30px;
    cursor: pointer;
    z-index: 9;
  }

  .el-overlay {
    // position: unset !important;
    height: unset;
  }

  .chat-list {
    width: 216px !important;
    height: 100% !important;
    color: black;
    background-color: rgb(237, 237, 237);
    // overflow-y: scroll;

    .chat-header {
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      color: white;
      user-select: none;
      background-color: #303b75;

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
      padding: 0 10px;
      color: white;
      background-color: #303b75;

      .chat-li {
        position: relative;
        list-style: none;
        cursor: pointer;
        padding: 10px;
        border-radius: 10px;
        background-color: #4a589e;
        margin-bottom: 10px;

        &:hover .close-li {
          display: block;
        }

        .close-li {
          position: absolute;
          top: -8px;
          left: -8px;
          font-size: 20px;
          display: none;
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
          justify-content: space-between;
        }
      }
    }
  }

  .chat-main {
    height: 100%;
    position: relative;
    padding: 10px 20px;
    padding-bottom: 120px;

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
          left: 45.5px;
          color: var(--menu-ative-bg);
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
          background-color: var(--menu-ative-bg);

          &:hover {
            .msg-gpt {
              color: var(--gpt-message-bg-hover) !important;
            }

            background-color: var(--gpt-message-bg-hover);
          }
        }
      }

      .sender {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: end;
        align-items: center;

        .msg-send {
          position: absolute;
          top: 15px;
          right: 46px;
          color: var(--gpt-me-message-bg);
          font-size: 20px;
        }

        .my-png {
          margin-left: 10px;
          vertical-align: middle;
        }

        .my-message {
          padding: 14px 10px;
          max-width: 60%;
          border-radius: 10px;
          background-color: var(--gpt-me-message-bg);
        }

        .my-message:hover {
          background-color: var(--gpt-me-message-bg-hover);
        }
      }
    }

    .main-send {
      position: fixed;
      bottom: 20px;
      right: 26px;
      left: 180px;
      border-radius: 40px;
      background-color: var(--bg-color);
      box-shadow: 0 15px 30px rgba(0, 0, 0, .3);

      .send-input {
        height: 46px;
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

.my-message:hover .msg-send {
  color: rgb(137, 217, 97) !important;
}
</style>