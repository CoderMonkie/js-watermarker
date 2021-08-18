<!--
 * @Description: 示例App
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-16 11:44:31
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
-->
<template>
  <div class="app-container">
    <section class="page-section__header flex flex-column align-center">
      <h1>js-watermarker</h1>
      <div>
        The demo using:
        <ul>
          <li>Vue3.0</li>
          <li>Vite</li>
          <li>Element Plus</li>
        </ul>
      </div>
      <h3 class="title">maonianyou@gmail.com</h3>
    </section>

    <section class="page-section__nav-tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="For Page" name="page">
          <ForPage v-if="activeTab === 'page'" />
        </el-tab-pane>
        <el-tab-pane label="For Image" name="image">
          <ForImage v-if="activeTab === 'image'" />
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

import ForPage from "./views/for-page/Index.vue";
import ForImage from "./views/for-image/Index.vue";

export default {
  name: "App",
  components: {
    ForPage,
    ForImage,
  },
  setup() {
    const state = reactive({
      activeTab: "page",
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px 30px;
  min-width: 800px;
  overflow-y: auto;
  height: auto;

  .page-section__header {
    color: rgb(50, 150, 250);
    h1 {
      font-size: 30px;
    }
    .title {
      color: rgba(50, 150, 250, 0.6);
      width: 100%;
      text-align: center;
    }
  }

  & > section:not(:first-child) {
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    margin: 50px 100px;
    padding: 10px;
  }
}
</style>
