<!--
 * @Description: 
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-28 23:12:56
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
-->
<template>
  <div class="tab-for-image">
    <el-image
      src="https://gitee.com/Coding-Worker/picture/raw/master/2021-7-28/1627448089888-tokyo-sky-tree.jpg"
      ref="watermarkRef"
      @load="onImageLoad"
    ></el-image>

    <el-divider></el-divider>

    <el-form
      label-suffix="："
      label-width="200px"
      :label-position="labelPosition"
    >
      <el-form-item label="水印文字">
        <el-input
          v-model="formData.content"
          placeholder="@码路工人"
          size="small"
          @change="handleOptionsChange"
        >
        </el-input>
      </el-form-item>

      <el-divider content-position="left">
        <h3>imageStyle</h3>
      </el-divider>

      <el-form-item label="是否重复">
        <el-radio-group
          v-model="formData.repeat"
          size="small"
          @change="handleOptionsChange"
        >
          <el-radio label="repeat">是</el-radio>
          <el-radio label="no-repeat">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="水印位置">
        <div>
          横：
          <el-radio-group
            v-model="formData.imagePositionX"
            size="small"
            @change="handleOptionsChange"
          >
            <el-radio label="left">左</el-radio>
            <el-radio label="center">中</el-radio>
            <el-radio label="right">右</el-radio>
          </el-radio-group>
        </div>
        <div>
          纵：
          <el-radio-group
            v-model="formData.imagePositionY"
            size="small"
            @change="handleOptionsChange"
          >
            <el-radio label="top">上</el-radio>
            <el-radio label="center">中</el-radio>
            <el-radio label="bottom">下</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>

      <el-form-item label="水印尺寸">
        <span style="display: inline-block; width: 120px">
          <el-input
            type="number"
            id="imageWidth"
            :input-style="{ textAlign: 'right' }"
            v-model="formData.imageWidth"
            @change="handleOptionsChange"
          >
            <template v-slot:prefix> Width: </template>
          </el-input>
        </span>
        <span style="display: inline-block; width: 120px">
          <el-input
            type="number"
            id="imageHeight"
            :input-style="{ textAlign: 'right' }"
            v-model="formData.imageHeight"
            @change="handleOptionsChange"
          >
            <template v-slot:prefix> Height: </template>
          </el-input>
        </span>
      </el-form-item>

      <el-divider content-position="left">
        <h3>textStyle</h3>
      </el-divider>

      <el-form-item label="文字排版">
        <el-radio-group
          border
          v-model="formData.textAlign"
          size="small"
          @change="handleOptionsChange"
        >
          <el-radio label="left">左</el-radio>
          <el-radio label="right">右</el-radio>
        </el-radio-group>
        <span style="margin-left: 50px">
          <span style="margin-right: 10px">文字定位</span>
          <span style="display: inline-block; width: 120px">
            <el-input
              v-model="formData.textLeft"
              type="number"
              :min="0"
              :input-style="{ textAlign: 'right' }"
              @change="handleOptionsChange"
            >
              <template v-slot:prefix> Left: </template>
            </el-input>
          </span>
          <span style="display: inline-block; width: 120px">
            <el-input
              v-model="formData.textTop"
              type="number"
              :min="0"
              :input-style="{ textAlign: 'right' }"
              @change="handleOptionsChange"
            >
              <template v-slot:prefix> Top: </template>
            </el-input>
          </span>
        </span>
        <div></div>
      </el-form-item>

      <el-form-item label="字体大小">
        <el-input-number
          v-model="formData.fontSize"
          :min="10"
          :max="48"
          :step="1"
          step-strictly
          :controls="false"
          @change="handleOptionsChange"
        ></el-input-number>
        <span class="form-item__tip font-size-tip"
          >10&nbsp;~&nbsp;48&nbsp;(step 1)</span
        >
      </el-form-item>

      <el-form-item label="多行文本时用于累加的行高">
        <el-input-number
          v-model="formData.lineHeight"
          :min="15"
          :max="60"
          :step="1"
          step-strictly
          :controls="false"
          @change="handleOptionsChange"
        ></el-input-number>
        <span class="form-item__tip font-size-tip"
          >15&nbsp;~&nbsp;60&nbsp;(step 1)</span
        >
      </el-form-item>

      <el-form-item label="文字倾斜">
        <el-input-number
          v-model="formData.rotate"
          :min="-360"
          :max="360"
          :step="5"
          step-strictly
          :controls="false"
          @change="handleOptionsChange"
        ></el-input-number>
        <span class="form-item__tip rotate-tip"
          >-360&nbsp;~&nbsp;360&nbsp;(step 5)</span
        >
      </el-form-item>

      <el-form-item label="颜色">
        <el-color-picker
          v-model="formData.textColor"
          show-alpha
          color-format="hex"
          @change="handleOptionsChange"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="透明度">
        <el-input-number
          v-model="formData.textOpacity"
          :min="0.01"
          :max="1"
          :step="0.01"
          step-strictly
          :controls="false"
          @change="handleOptionsChange"
        ></el-input-number>
        <span class="form-item__tip text-opacity-tip"
          >0.01&nbsp;~&nbsp;1&nbsp;(step 0.01)</span
        >
        <span class="form-item__tip text-opacity-tip">
          &gt;&gt;&nbsp;当颜色中使用了透明度(即
          RGBA)时，此处的透明度会同时起作用，建议使用默认值 1</span
        >
      </el-form-item>
    </el-form>

    <section class="page-section__setting-json">
      <span>&nbsp;&nbsp;The Setting JSON</span>
      <hr />
      <pre
        >{{ JSON.stringify(settingJson, null, 4) }}
      </pre>
    </section>
  </div>
</template>

<script>
import watermarker from "../../../../src/main.js";
import { toRefs, reactive } from "@vue/reactivity";

import SettingForm from "e@/components/SettingForm.vue";
import { computed, onMounted, onBeforeUnmount } from "@vue/runtime-core";

export default {
  name: "ForImage",
  components: {
    SettingForm,
  },
  setup() {
    let marker = null;
    const states = reactive({
      labelPosition: "right",
      // ref of target element
      watermarkRef: null,
      formData: {
        // textStyle
        content: `CoderMonkey | 码路工人,2018-11-20,@Tokyo`,
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
    const computedContent = computed(() => states.formData.content.split(","));
    const computedImagePosition = computed(
      () =>
        `${states.formData.imagePositionX} ${states.formData.imagePositionY}`
    );
    const computedOptions = computed(() => {
      return {
        content: computedContent.value,
        targetElement: states.watermarkRef?.$el,
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

    const settingJson = computed(() => {
      const copy = JSON.parse(JSON.stringify(computedOptions.value));
      copy.targetElement = "<HTMLElement>[states.watermarkRef?.$el]";
      return copy;
    });

    const handleOptionsChange = () => {
      marker.setOption(computedOptions.value);
    };

    const onImageLoad = () => {
      marker = watermarker.init(states.watermarkRef.$el);
      handleOptionsChange();
    };

    const onWindowResize = () => {
      states.labelPosition = document.body.clientWidth > 1200 ? "right" : "top";
    };

    onMounted(() => {
      window.addEventListener("resize", onWindowResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", onWindowResize);
      marker && marker.clear();
    });

    return {
      ...toRefs(states),
      handleOptionsChange,
      onImageLoad,
      settingJson,
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-for-image {
  display: flex;
  flex-direction: column;
  align-items: center;

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
