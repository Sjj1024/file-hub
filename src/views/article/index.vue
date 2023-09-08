<template>
  <div class="art-main">
    <div class="art-header">
      <span class="header-status label">状态</span>
      <span class="header-status">全部</span>
      <span class="header-status">全部可见</span>
      <span class="header-status">仅我可见</span>
      <span class="header-status">草稿箱</span>
      <span class="header-status">回收站</span>
    </div>
    <div class="art-filter">
      <el-input
        v-model="searchForm.keyword"
        placeholder="请输入关键词"
        class="search-item keyword"
      />
      <el-select
        v-model="searchForm.type"
        placeholder="文章分类"
        class="search-item type"
      >
        <el-option label="全部" value="shanghai" />
        <el-option label="Python" value="beijing" />
      </el-select>
      <el-select
        v-model="searchForm.year"
        placeholder="年"
        class="search-item year"
      >
        <el-option
          v-for="index in 12"
          :key="index"
          :label="index"
          :value="index"
        />
        <!-- <el-option label="2" value="beijing" /> -->
      </el-select>
      <el-select
        v-model="searchForm.month"
        placeholder="月"
        class="search-item month"
      >
        <el-option
          v-for="index in 12"
          :key="index"
          :label="index"
          :value="index"
        />
      </el-select>
      <el-button type="primary">搜索</el-button>
    </div>
    <div class="art-list">列表</div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from "vue";
const searchForm = reactive({
  keyword: "",
  type: "",
  year: "",
  month: "",
});
</script>

<style scoped lang='scss'>
.art-main {
  padding: 0 10px;
  .art-header {
    .header-status {
      margin-right: 36px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: black;
      }
    }

    .label {
      cursor: default;
      &:hover {
        color: #666;
      }
    }
  }

  .art-filter {
    margin: 10px 0;
    .search-item {
      margin-right: 10px;
    }
    .keyword {
      width: 200px;
    }
    .type {
      width: 120px;
    }
    .year,
    .month {
      width: 80px;
    }
  }
}
</style>