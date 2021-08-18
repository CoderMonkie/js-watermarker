/*
 * @Description:
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-01 09:47:20
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
 */
/** 默认配置 */
const defaultOptions = (isImage = false) => {
  return {
    /** 水印的内容（文字），可为数组 */
    content: [],
    targetElement: document.body,
    textStyle: {
      /** fillText 的位置 */
      top: 20,
      left: 20,
      /** 可以是颜色，也可以是渐变等（@see canvas.fillStyle） */
      color: "rgba(150, 150, 150, .15)",
      /** 当指定的颜色已包含 alpha 值时，需将这里的 alpha 设为 1 */
      alpha: 1,
      align: "left",
      /** 字体相关 */
      fontFamily:
        '"PingFang SC","Lantinghei SC","Microsoft YaHei",arial,"MS Gothic","\\5b8b\\4f53",sans-serif,tahoma',
      fontSize: 16,
      /** 倾斜 */
      rotate: isImage ? 0 : -20,
      /** 多行文本时用于累加的行高 */
      lineHeight: 25,
    },
    imageStyle: {
      /** 水印图片/canvas 的尺寸大小 */
      width: 200,
      height: 200,
      position: "left top",
      repeat: isImage ? "no-repeat" : "repeat",
    },
  };
};

export default defaultOptions;
