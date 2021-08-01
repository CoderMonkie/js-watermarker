# js-watermarker

👏 版本更新 Version Up👏

> v1.x 仅支持设一个水印（可以更新水印的设置）  
> v1.x only one watermark can be set (can update setting options)  
> v1.x 1 つだけウォーターマーク設定できる
>
> v2.x 支持创建多个实例，分别给页面多多个元素设置不同水印  
> v2.x support multi-instance to set different wartermarks for different elements  
> v2.x 複数インスタンスの作成で、複数のウォーターマークを追加できる

## 安装 | Install | インストール

```bash
npm i js-watermarker
# or
yarn add js-watermarker
```

---

## 使用 | Usage | 使い方

### v1.x

```js
import setWatermark from "js-watermarker";

setWatermark({
  content: "@码路工人",
});
```

### v2.x

key code:

```js
import watermarker from "js-watermarker";

// onMounted
marker = watermarker.init(watermarkRef);
marker.setOption(options);
```

In Vue3 project:

```vue
<template>
  <div ref="watermarkRef">
    <!-- maybe have some contents here -->
  </div>
</template>

<script>
import watermarker from "js-watermarker";

export default {
  name: "ComponentName",
  setup() {
    let marker = null;
    const states = reactive({
      watermarkRef: null,

      // could be no-reactive
      options: {
        // content could be String or Array
        content: ['Hello World', 'Wartermark Demo']
        // textStyle object
        textStyle: {
          left: 20,
          top: 100,
          rotate: -10,
          align: "left",
          fontSize: 16,
          lineHeight: 25,
          color: "#fee0b9",
          alpha: 1,
        },
        // imageStyle object
        imageStyle: {
          width: 400,
          height: 300,
          position: "left top",
          repeat: "repeat",
        },
      },
    });
  },
  onMounted(() => {
    marker = watermarker.init(states.watermarkRef);

    marker.setOption(states.options);
  })
};
</script>
```

## 配置对象 | API | 設定項目明細

> 详细设置项可参考 [Demo](https://codermonkie.github.io/js-watermarker) 页面中生成的配置 JSON
>
> For more details, see JSON generated in [Demo](https://codermonkie.github.io/js-watermarker) page.
>
> 設定項目明細は下記 オンライン サンプル ページ 参照:  
> [Demo](https://codermonkie.github.io/js-watermarker)

### Methods

| 方法名 Method | 说明 Description                                                          | 参数 Parameters             | 返回值 Returns                              |
| ------------- | ------------------------------------------------------------------------- | --------------------------- | ------------------------------------------- |
| init          | 初始化获取实例<br>Initialize to get instance                              | targetElement: HTMLElement  | Watermarker 实例<br>instance of Watermarker |
| setOption     | 设置或更新水印<br>show wartermark with options specified, also for update | [options](#options): Object | -                                           |
| clear         | 清除水印<br>remove watermark                                              | -                           | -                                           |

### options properties <a id="options"></a>

| 属性名 Property 属性                 | 说明 Note 　説明       | 类型 Type タイプ・型 | 是否必须　 Required 　必須 | 可选值 Values 設定値 | 默认值 Default デフォルト値 |
| ------------------------------------ | ---------------------- | -------------------- | -------------------------- | -------------------- | --------------------------- |
| content                              | 水印文字内容           | String / Array       | Required                   |                      |                             |
| ~~targetElement~~<br>(removed in v2) | ~~要加水印的对象元素~~ | null / HTMLElement   | Optional                   |                      | document.body               |
| [textStyle](#textStyle)              | 水印文字的相关属性     | Object               | Optional                   |                      |                             |
| [imageStyle](#imageStyle)            | 水印图片的相关属性     | Object               | Optional                   |                      |                             |
|                                      |                        |                      |                            |                      |

#### textStyle properties <a id="textStyle"></a>

| 属性名 Property 属性 | 说明 Note 　説明                                                                                            | 类型 Type タイプ・型 | 是否必须　 Required 　必須 | 可选值 Values 設定値 | 默认值 Default デフォルト値                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| left                 | 水印文字的起始横坐标                                                                                        | Integer              | Optional                   |                      | 20                                                                                                 |
| top                  | 水印文字的起始纵坐标<br/>当文字倾斜致显示切字时适当增大该值                                                 | Integer              | Optional                   |                      | 20                                                                                                 |
| color                | 水印文字的颜色<br/>当颜色使用`rgba`时已含透明度故无需`单独的透明度`设置(默认为 1)，如果同时设置将同时起作用 | String               | Optional                   |                      | rgba(150, 150, 150, .15)                                                                           |
| alpha                | 单独设置的透明<br/>若`color`使用了纯色，可单独设置该值控制透明度                                            | Float                | Optional                   |                      | 1                                                                                                  |
| align                | 文字排版                                                                                                    | String               | Optional                   | left/right/center    | left                                                                                               |
| fontFamily           | 字体                                                                                                        | String               | Optional                   |                      | "PingFang SC","Lantinghei SC","Microsoft YaHei",arial,"MS Gothic","\\5b8b\\4f53",sans-serif,tahoma |
| fontSize             | 字号                                                                                                        | Integer              | Optional                   |                      | 16                                                                                                 |
| rotate               | 文字倾斜                                                                                                    | Integer              | Optional                   |                      | 0                                                                                                  |
| lineHeight           | 多行文本时用于累加的行高                                                                                    | Integer              | Optional                   |                      | 25                                                                                                 |
|                      |                                                                                                             |                      |                            |                      |

#### imageStyle properties <a id="imageStyle"></a>

| 属性名 Property 属性 | 说明 Note 　説明 | 类型 Type タイプ・型 | 是否必须　 Required 　必須 | 可选值 Values 設定値         | 默认值 Default デフォルト値 |
| -------------------- | ---------------- | -------------------- | -------------------------- | ---------------------------- | --------------------------- |
| width                | 水印图片宽度     | Integer              | Optional                   |                              | 200                         |
| height               | 水印图片高度     | Integer              | Optional                   |                              | 200                         |
| position             | 水印图片排版     | String               | Optional                   | "x y" (x y：left/top/center) | "left top"                  |
| repeat               | 水印图片重复     | String               | Optional                   | repeat / no-repeat           | repeat                      |
|                      |                  |                      |                            |                              |

---

## 功能简介(特色) | Feature | 機能概要(特色)

添加水印  
Add watermark to page/element  
画面要素に ウォーターマーク を追加

- 可配置化，基本能满足多种样式需求
  - 可指定为页面元素添加水印
  - 默认添加到 body，也可指定其它页面元素（如图片）
  - 可指定文字内容，支持换行
  - 支持设置水印颜色、位置、倾斜角度及是否重复水印等
- 可实时动态修改水印配置
- 水印防删除
- 可在线(示例地址)查看调整效果
- v2.x 支持给多个元素分别设置不同水印

纯 js 实现，无任何其它依赖

## 查看 Demo | Example | サンプル

本地启动 | To develop | 起動

```bash
npm run dev
# or
yarn dev

# or 编译后启动 | start after build | ビルドしてからプレビューで起動
npm run preview
# or
yarn preview
```

![](https://gitee.com/Coding-Worker/picture/raw/master/2021-7-5/1625468749708-image.png)

在线示例 | demo online | オンライン Demo

[codermonkie.github.io/js-watermarker](https://codermonkie.github.io/js-watermarker/)

~~[coder-monkey.gitee.io/js-watermarker](https://coder-monkey.gitee.io/js-watermarker/)~~

## 版权 | License | ライセンス

MIT

---

TODO  
[x] refactor and multi-instance support in v2.0 (issue#2)  
[ ] query selector support for init method in v2.0 (issue#3)
