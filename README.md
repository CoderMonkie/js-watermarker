# js-watermarker

## 安装 | Install

```bash
npm i js-watermarker
# or
yarn add js-watermarker
```

---

## 使用 | Usage

```js
import setWatermark from "js-watermarker";

setWatermark({
  content: "@码路工人",
});
```

## 配置对象 | API

> 详细设置项可参考 [Demo](https://codermonkie.github.io/js-watermarker) 页面中生成的配置 JSON

### Properties

| 属性名                    | 说明               | 类型               | 是否必须 | 可选值 | 默认值        |
| ------------------------- | ------------------ | ------------------ | -------- | ------ | ------------- |
| content                   | 水印文字内容       | String / Array     | Required |        |               |
| targetElement             | 要加水印的对象元素 | null / HTMLElement | Optional |        | document.body |
| [textStyle](#textStyle)   | 水印文字的相关属性 | Object             | Optional |        |               |
| [imageStyle](#imageStyle) | 水印图片的相关属性 | Object             | Optional |        |               |
|                           |                    |                    |          |        |

#### textStyle<a id="textStyle"></a>

| 属性名     | 说明                                                                                                        | 类型    | 是否必须 | 可选值            | 默认值                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ------- | -------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| left       | 水印文字的起始横坐标                                                                                        | Integer | Optional |                   | 20                                                                                                 |
| top        | 水印文字的起始纵坐标<br/>当文字倾斜致显示切字时适当增大该值                                                 | Integer | Optional |                   | 20                                                                                                 |
| color      | 水印文字的颜色<br/>当颜色使用`rgba`时已含透明度故无需`单独的透明度`设置(默认为 1)，如果同时设置将同时起作用 | String  | Optional |                   | rgba(150, 150, 150, .15)                                                                           |
| alpha      | 单独设置的透明<br/>若`color`使用了纯色，可单独设置该值控制透明度                                            | Float   | Optional |                   | 1                                                                                                  |
| align      | 文字排版                                                                                                    | String  | Optional | left/right/center | left                                                                                               |
| fontFamily | 字体                                                                                                        | String  | Optional |                   | "PingFang SC","Lantinghei SC","Microsoft YaHei",arial,"MS Gothic","\\5b8b\\4f53",sans-serif,tahoma |
| fontSize   | 字号                                                                                                        | Integer | Optional |                   | 16                                                                                                 |
| rotate     | 文字倾斜                                                                                                    | Integer | Optional |                   | 0                                                                                                  |
| lineHeight | 多行文本时用于累加的行高                                                                                    | Integer | Optional |                   | 25                                                                                                 |
|            |                                                                                                             |         |          |                   |

#### imageStyle<a id="imageStyle"></a>

| 属性名   | 说明         | 类型    | 是否必须 | 可选值                       | 默认值     |
| -------- | ------------ | ------- | -------- | ---------------------------- | ---------- |
| width    | 水印图片宽度 | Integer | Optional |                              | 200        |
| height   | 水印图片高度 | Integer | Optional |                              | 200        |
| position | 水印图片排版 | String  | Optional | "x y" (x y：left/top/center) | "left top" |
| repeat   | 水印图片重复 | String  | Optional | repeat / no-repeat           | repeat     |
|          |              |         |          |                              |

---

## 功能简介(特色) | Feature

添加水印

- 可配置化，基本能满足多种样式需求
  - 可指定为页面元素添加水印
  - 可指定文字内容，支持换行
  - 支持设置水印颜色、位置、倾斜角度及是否重复水印等
- 可实时动态修改水印配置
- 水印防删除
- 可在线(示例地址)查看调整效果

纯 js 实现，无任何其它依赖

## 查看 Demo | Example

本地启动

```bash
npm run dev
# or
yarn dev

# or 编译后启动
npm run preview
# or
yarn preview
```

![](https://gitee.com/Coding-Worker/picture/raw/master/2021-7-5/1625414516479-image.png)

在线示例

[codermonkie.github.io/js-watermarker](https://codermonkie.github.io/js-watermarker/)

~~[coder-monkey.gitee.io/js-watermarker](https://coder-monkey.gitee.io/js-watermarker/)~~

## 版权 | License

MIT
