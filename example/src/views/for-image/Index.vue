<!--
 * @Description: 图片水印示例页
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-28 23:12:56
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
-->
<template>
  <div class="tab-for-image">
    <Quote text="Case 1：Same origin image | no-repeat" class="case-title" />
    <div class="case-1-block flex flex-column align-center">
      <el-button @click="showSettingDialog(1)"
        >点我修改水印配置 | Click me to set watermark</el-button
      >
      <img ref="watermarkRef1" class="el-image__inner" />
      <DialogConfigSetting
        v-if="case1DialogVisible"
        v-model:visible="case1DialogVisible"
        v-model:config="configCase1"
        @close="handleSetting(0, true)"
      />
    </div>

    <Quote text="Case 2：Same origin image | repeat" class="case-title" />
    <div class="case-2-block flex flex-column align-center">
      <el-button @click="showSettingDialog(2)"
        >点我修改水印配置 | Click me to set watermark</el-button
      >
      <img ref="watermarkRef2" class="el-image__inner" />
      <DialogConfigSetting
        v-if="case2DialogVisible"
        v-model:visible="case2DialogVisible"
        v-model:config="configCase2"
        @close="handleSetting(1, true)"
      />
    </div>

    <Quote text="Case 3：Cross origin image | no-repeat" class="case-title" />
    <div class="case-3-block flex flex-column align-center">
      <el-button @click="showSettingDialog(3)"
        >点我修改水印配置 | Click me to set watermark</el-button
      >
      <img ref="watermarkRef3" class="el-image__inner" />
      <DialogConfigSetting
        v-if="case3DialogVisible"
        v-model:visible="case3DialogVisible"
        v-model:config="configCase3"
        @close="handleSetting(2, true)"
      />
    </div>

    <el-divider></el-divider>

    <!-- <section class="page-section__setting-json">
      <pre>targetElement: &lt;HTMLElement&gt;[states.watermarkRef?.$el]</pre>
      <span>&nbsp;&nbsp;The Setting JSON</span>
      <hr />
      <pre>{{ JSON.stringify(computedOptions, null, 4) }}</pre>
    </section> -->
  </div>
</template>

<script>
import watermarker from "../../../../src/main.js";
import { toRefs, reactive } from "@vue/reactivity";
import { computed, onMounted, onBeforeUnmount } from "@vue/runtime-core";

import SettingForm from "e@/components/SettingForm.vue";
import Quote from "e@/components/quote.vue";
import DialogConfigSetting from "./DialogConfigSetting.vue";

export default {
  name: "ForImage",
  components: {
    SettingForm,
    Quote,
    DialogConfigSetting,
  },
  setup() {
    // let marker = null;
    const markers = [];
    const states = reactive({
      labelPosition: "right",
      // ref of target element
      watermarkRef1: null,
      watermarkRef2: null,
      watermarkRef3: null,
      case1DialogVisible: false,
      case2DialogVisible: false,
      case3DialogVisible: false,
      formData: {
        // textStyle
        content: `CoderMonkey,  码路工人`,
        textAlign: "right",
        textLeft: 20,
        textTop: 100,
        fontSize: 18,
        lineHeight: 25,
        rotate: -10,
        textColor: "#d9d9d94d",
        textOpacity: 1,
        // imageStyle
        repeat: "no-repeat",
        imagePositionX: "right",
        imagePositionY: "bottom",
        imageWidth: 240,
        imageHeight: 180,
      },
      configCase1: {
        // textStyle
        content: `CoderMonkey | 码路工人,   2012-04 | by MiOne `,
        textAlign: "left",
        textLeft: 0,
        textTop: 20,
        fontSize: 18,
        lineHeight: 25,
        rotate: 0,
        textColor: "#b9b9b9",
        textOpacity: 1,
        // imageStyle
        repeat: "no-repeat",
        imagePositionX: "right",
        imagePositionY: "bottom",
        imageWidth: 240,
        imageHeight: 60,
      },
      configCase2: {
        // textStyle
        content: `码   路   工   人,CoderMonkey`,
        textAlign: "left",
        textLeft: 50,
        textTop: 100,
        fontSize: 18,
        lineHeight: 25,
        rotate: -20,
        textColor: "lightgray", //"#d9d9d94d",
        textOpacity: 1,
        // imageStyle
        repeat: "repeat",
        imagePositionX: "left",
        imagePositionY: "top",
        imageWidth: 400,
        imageHeight: 240,
      },
      configCase3: {
        // textStyle
        content: `CoderMonkey | 码路工人,2018-11-20          , @Tokyo              `,
        textAlign: "right",
        textLeft: 20,
        textTop: 100,
        fontSize: 18,
        lineHeight: 25,
        rotate: 0,
        textColor: "#d9d9d9",
        textOpacity: 1,
        // imageStyle
        repeat: "no-repeat",
        imagePositionX: "right",
        imagePositionY: "bottom",
        imageWidth: 240,
        imageHeight: 180,
      },
    });

    const getComputedOptions = (formData) => {
      // const content = states.formData.content.split(",")
      // const imagePosition = `${states.formData.imagePositionX} ${states.formData.imagePositionY}`

      const computedContent = computed(() => formData.content.split(","));
      const computedImagePosition = computed(
        () => `${formData.imagePositionX} ${formData.imagePositionY}`
      );
      const computedOptions = computed(() => {
        return {
          content: computedContent.value,
          textStyle: {
            /** fillText 的位置 */
            left: parseInt(formData.textLeft),
            top: parseInt(formData.textTop),
            rotate: formData.rotate,
            align: formData.textAlign,
            fontSize: formData.fontSize,
            lineHeight: formData.lineHeight,
            color: formData.textColor,
            alpha: formData.textOpacity,
          },
          imageStyle: {
            /** 水印图片/canvas 的尺寸大小 */
            width: formData.imageWidth,
            height: formData.imageHeight,
            position: computedImagePosition.value,
            repeat: formData.repeat,
          },
        };
      });
      return computedOptions;
    };

    const computedOptions = [];
    computedOptions.push(getComputedOptions(states.configCase1));
    computedOptions.push(getComputedOptions(states.configCase2));
    computedOptions.push(getComputedOptions(states.configCase3));

    const showSettingDialog = (i) => {
      states[`case${i}DialogVisible`] = true;
    };

    const handleSetting = (i, reset = false) => {
      markers[i].setOption(computedOptions[i].value, reset);
    };

    const onWindowResize = () => {
      states.labelPosition = document.body.clientWidth > 1200 ? "right" : "top";
    };

    onMounted(() => {
      window.addEventListener("resize", onWindowResize);

      markers.push(watermarker.init(states.watermarkRef1));
      markers.push(watermarker.init(states.watermarkRef2));
      markers.push(watermarker.init(states.watermarkRef3));

      states.watermarkRef1.setAttribute("src", "./images/clover.png");
      states.watermarkRef2.setAttribute("src", "./images/tokyo-sky-tree.jpg");
      states.watermarkRef3.setAttribute(
        "src",
        "https://gitee.com/Coding-Worker/picture/raw/master/2021-7-28/1627448089888-tokyo-sky-tree.jpg"
      );

      states.watermarkRef1.onload = handleSetting(0);
      states.watermarkRef2.onload = handleSetting(1);
      states.watermarkRef3.onload = handleSetting(2);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", onWindowResize);
      markers && markers.forEach((m) => m.clear());
    });

    return {
      ...toRefs(states),
      computedOptions,
      showSettingDialog,
      handleSetting,
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-for-image {
  display: flex;
  flex-direction: column;
  align-items: center;

  :deep(.el-button) {
    margin: 10px 0;
  }

  .case-title:not(:first-child) {
    margin-top: 15px;
  }

  .page-section__setting-json {
    width: 100%;
    padding: 10px 20px;
    background-color: #f0f0f0;
    pre {
      color: lightseagreen;
    }
  }
}
</style>
