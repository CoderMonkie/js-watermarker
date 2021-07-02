/*
 * @Description:
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-01 10:26:14
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
 */
import { createApp } from "vue";
import App from "./src/App.vue";
import "./src/style/common.css";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);
app.use(ElementPlus).mount("#app");
