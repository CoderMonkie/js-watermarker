<!--
 * @Description: 
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-08-09 23:45:37
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
-->
<template>
  <div>
    <el-dialog v-model="dialogVisible" @close="handleClose">
      <SettingForm v-model="formData" />

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

import SettingForm from "e@/components/SettingForm.vue";

export default {
  name: "DialogConfigSetting",
  components: {
    SettingForm,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:visible", "update:config"],
  setup(props, ctx) {
    const states = reactive({
      dialogVisible: computed({
        get() {
          return props.visible;
        },
        set(val) {
          ctx.emit("update:visible", val);
        },
      }),
      formData: computed({
        get() {
          return props.config;
        },
        set(val) {
          ctx.emit("update:config", { ...val });
        },
      }),
    });

    const computedContent = computed(() => states.formData.content.split(","));

    const computedImagePosition = computed(
      () =>
        `${states.formData.imagePositionX} ${states.formData.imagePositionY}`
    );

    const computedOptions = computed(() => {
      return {
        content: computedContent.value,
        targetElement: states.watermarkRef,
        textStyle: {
          /** fillText 的位置 */
          left: parseInt(states.formData.textLeft),
          top: parseInt(states.formData.textTop),
          rotate: states.formData.rotate,
          align: states.formData.textAlign,
          fontSize: states.formData.fontSize,
          lineHeight: states.formData.lineHeight,
          color: states.formData.textColor,
          alpha: states.formData.textOpacity,
        },
        imageStyle: {
          /** 水印图片/canvas 的尺寸大小 */
          width: states.formData.imageWidth,
          height: states.formData.imageHeight,
          position: computedImagePosition.value,
          repeat: states.formData.repeat,
        },
      };
    });

    const handleClose = () => {
      ctx.emit("close", computedOptions);
      states.dialogVisible = false;
    };

    return {
      ...toRefs(states),
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped></style>
