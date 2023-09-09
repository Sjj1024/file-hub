<template>
  <div class="note-main">
    <img v-if="props.note.img" :src="props.note.img" alt="" class="note-img" />
    <div class="note-info">
      <div class="note-content">
        <div class="note-title">
          {{ props.note.title }}
        </div>
        <div class="note-digest">
          {{ props.note.digest }}
        </div>
      </div>
      <div class="note-action">
        <span class="action">时间日期</span>
        <span class="action visit">查看</span>
        <span class="action share">分享</span>
        <span class="action edit">编辑</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from "vue";
interface noteType {
  title: string;
  type: string;
  category: string;
  digest: string;
  img: string;
  path: string;
  issueNum: string;
  openLink: string;
  downLike: string;
  delete: string;
  sha: string;
  createTime: string;
  updateTime: string;
}

const props = defineProps<{
  note: noteType;
}>();
</script>

<style lang="scss" scoped>
.note-main {
  height: 124px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #eee;
  }
  .note-img {
    width: 160px;
    height: 102px;
    object-fit: fill;
    margin-right: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }

  .note-info {
    height: 102px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .note-title {
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      word-wrap: normal;
      word-break: normal;
      display: -webkit-box;
      -webkit-line-clamp: 1; //显示3行
      -webkit-box-orient: vertical;
    }

    .note-digest {
      font-size: 14px;
      color: #888;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 3; //显示3行
      -webkit-box-orient: vertical;
    }

    .note-action {
      font-size: 14px;
      .action {
        margin-right: 20px;
      }
      .visit,
      .share,
      .edit {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>