<!--
 * @Description: 
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-08-09 23:16:54
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
-->
<template>
  <div class="quote-block">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.quote-block {
  width: 100%;

  line-height: 40px;
  border-left: 10px solid #a6a6a6;
  padding: 10px;
  background-color: #e9e9e9;
}
</style>
