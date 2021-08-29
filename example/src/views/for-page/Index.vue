<!--
 * @Description: 
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-28 23:13:15
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
-->
<template>
  <div class="tab-for-page" ref="watermarkRef">
    <!-- 
        水印默认添加到 body 上<br />
        也可指定为页面其它元素
    -->

    <section class="page-section__settings">
      <el-form
        label-suffix="："
        label-width="200px"
        :label-position="labelPosition"
      >
        <el-form-item label="">
          <el-radio-group
            v-model="formData.hasWatermark"
            size="small"
            @change="toggleWatermark"
          >
            <el-radio :label="false">无水印 No Watermark</el-radio>
            <el-radio :label="true">加水印 Add Watermark</el-radio>
          </el-radio-group>
          <div>以下两项都勾选即多实例 Check Both below for Multi-Instance</div>
          <el-checkbox-group
            v-model="formData.checkList"
            :disabled="!formData.hasWatermark"
            @change="toggleAppendTo"
          >
            <el-checkbox :label="undefined"
              >加水印到页面 Add to the full page</el-checkbox
            >
            <el-checkbox :label="watermarkRef"
              >加水印到标签页 Add to this Tab</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>

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
    </section>

    <section class="page-section__setting-json">
      <pre>
targetElement: &lt;HTMLElement&gt;[states.watermarkRef]; 
      </pre>
      生成的配置对象：
      <hr />
      <pre
        >{{ JSON.stringify(computedOptions, null, 4) }}
      </pre>
    </section>
  </div>
</template>

<script>
import watermarker from "../../../../src/main.js";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { getToday } from "e@/utils/utils.js";

export default {
  name: "ForPage",
  setup(props, ctx) {
    const markers = [];
    const states = reactive({
      labelPosition: "right",
      // ref of target element
      watermarkRef: null,
      formData: {
        // fields for interaction
        hasWatermark: true,
        checkList: [undefined],
        // fields in setting options
        // options.textStyle
        content: `CoderMonkey | 码路工人,快乐编程 · 佛系开发, ${getToday()}`,
        textAlign: "left",
        textLeft: 20,
        textTop: 100,
        fontSize: 16,
        lineHeight: 25,
        rotate: -10,
        textColor: "#fee0b9",
        textOpacity: 1,
        // options.imageStyle
        repeat: "repeat",
        imagePositionX: "left",
        imagePositionY: "top",
        imageWidth: 400,
        imageHeight: 300,
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
        zIndex: 999, // 可选，默认10000
      };
    });

    const toggleWatermark = (flag) => {
      toggleAppendTo(flag ? states.formData.checkList : []);
    };

    const toggleAppendTo = (checkedArr) => {
      markers.forEach((m) => {
        m.clear();
        m = null;
      });
      markers.length = 0;
      checkedArr.forEach((n) => {
        const addNewMark = watermarker.init(n);
        addNewMark.setOption(computedOptions.value);
        markers.push(addNewMark);
      });
    };

    const onWindowResize = () => {
      states.labelPosition = document.body.clientWidth > 1200 ? "right" : "top";
    };

    const handleOptionsChange = () => {
      toggleAppendTo(states.formData.checkList);
    };

    onMounted(() => {
      window.addEventListener("resize", onWindowResize);
      nextTick(handleOptionsChange);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", onWindowResize);
      toggleWatermark();
    });

    return {
      ...toRefs(states),
      handleOptionsChange,
      computedOptions,
      toggleWatermark,
      toggleAppendTo,
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-for-page {
  width: 100%;
  height: 2000px;

  & > section:not(:first-child) {
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    margin: 50px 100px;
    padding: 10px;
  }

  .page-section__settings {
    .form-item__tip {
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
