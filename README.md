# watermark

## 安装

```bash
npm i watermarker
# or
yarn add watermarker
```

---

## 使用

```js
import setWatermark from "watermarker";

setWatermark({
  content: "@码路工人",
});
```

---

## 功能简介(特色)

添加水印

- 可配置化，基本能满足多种样式需求
  - 可指定为页面元素添加水印
  - 可指定文字内容，支持换行
  - 支持水印颜色、位置、倾斜角度及是否重复水印等
- 可实时动态修改水印配置
- 水印防删除

## 查看 Demo

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

在线示例  
[coder-monkey.gitee.io/watermarker](https://coder-monkey.gitee.io/watermarker)
