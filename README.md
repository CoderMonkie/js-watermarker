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
