<!--
 * @Description: 
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-01 10:26:30
 * @LastEditors: Archmage | 大法师
-->
<template>
  <div class="app-container" ref="targetElementRef">
    <section class="page-section__header flex flex-column align-center">
      <h2>js-watermarker</h2>
      <h3 class="title">
        水印默认添加到 body 上<br />
        也可指定为页面其它元素
      </h3>
    </section>

    <section class="page-section__settings">
      <el-form label-suffix="：" label-width="200px">
        <el-form-item label="水印文字">
          <el-input
            v-model="formData.content"
            placeholder="@码路工人"
            size="small"
            @change="handleOptionsChange"
          >
          </el-input>
        </el-form-item>

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
          <span class="font-size-tip">10&nbsp;~&nbsp;48&nbsp;step 1</span>
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
          <span class="font-size-tip">15&nbsp;~&nbsp;60&nbsp;step 1</span>
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
          <span class="rotate-tip">-360&nbsp;~&nbsp;360&nbsp;step 10</span>
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
      </el-form>
    </section>

    <section class="page-section__setting-json">
      <pre
        >{{ JSON.stringify(computedOptions, null, 4) }}
      </pre>
    </section>
  </div>
</template>

<script>
import setWatermark from "../../src/main.js";
import { computed, onMounted, reactive, ref, toRefs } from "vue";

export default {
  name: "App",
  setup() {
    const getToday = () => {
      const d = new Date();
      const formatToday = `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
      return formatToday;
    };

    const defaultContent = "@码路工人 (支持多行[,]逗号分隔)";

    const state = reactive({
      formData: {
        // textStyle
        content: `CoderMonkey | 码路工人,快乐编程 · 佛系开发, ${getToday()}`,
        textAlign: "left",
        textLeft: 20,
        textTop: 100,
        fontSize: 16,
        lineHeight: 25,
        rotate: -10,
        // imageStyle
        repeat: "repeat",
        imagePositionX: "left",
        imagePositionY: "top",
        imageWidth: 500,
        imageHeight: 300,
      },
      computedContent: computed(() =>
        (state.formData.content || defaultContent).split(",")
      ),
      computedImagePosition: computed(
        () =>
          `${state.formData.imagePositionX} ${state.formData.imagePositionY}`
      ),
      computedOptions: computed(() => {
        return {
          content: state.computedContent,
          targetElement: targetElementRef.value,
          textStyle: {
            /** fillText 的位置 */
            left: parseInt(state.formData.textLeft),
            top: parseInt(state.formData.textTop),
            rotate: state.formData.rotate,
            color: "#fee0b9",
            align: state.formData.textAlign,
            fontSize: state.formData.fontSize,
            lineHeight: state.formData.lineHeight,
          },
          imageStyle: {
            /** 水印图片/canvas 的尺寸大小 */
            width: state.formData.imageWidth,
            height: state.formData.imageHeight,
            position: state.computedImagePosition,
            repeat: state.formData.repeat,
          },
        };
      }),
    });

    const targetElementRef = ref(null);

    const handleOptionsChange = () => {
      setWatermark(state.computedOptions);
    };

    onMounted(() => {
      handleOptionsChange();
    });

    return {
      ...toRefs(state),
      targetElementRef,
      handleOptionsChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 2000px;

  .page-section__header {
    color: #3296fa;
    .title {
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

  .page-section__settings {
    .font-size-tip,
    .rotate-tip {
      margin-left: 10px;
      color: #999999;
    }
  }

  .page-section__setting-json {
    background-color: #f0f0f0;
    pre {
      color: lightseagreen;
    }
  }
}
</style>
