<!--
 * @Description: 配置项设置用表单组件
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-27 10:10:37
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
-->
<template>
  <div>
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
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "SettingForm",
  emits: ["update:modelValue"],
  props: ["modelValue", "options"],

  setup(props, ctx) {
    const formData = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        ctx.emit("update:modelValue", val);
      },
    });

    return {
      formData,
    };
  },
};
</script>

<style lang="scss" scoped></style>
