/*
 * @Description: 水印Element
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-01 10:10:12
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
 */
/** 水印Element */
class Watermark {
  constructor(options) {
    return this.createWatermark(options);
  }

  createWatermark(options) {
    // 创建一个画布
    const cvs = document.createElement("canvas");
    // 设置画布的长宽
    cvs.width = options.imageStyle.width;
    cvs.height = options.imageStyle.height;

    const ctx2d = cvs.getContext("2d");

    // 旋转角度
    options.textStyle.rotate &&
      ctx2d.rotate((options.textStyle.rotate * Math.PI) / 180);

    ctx2d.font = `${parseInt(options.textStyle.fontSize)}px ${
      options.textStyle.fontFamily
    }`;
    // 设置填充绘画的颜色、渐变或者模式
    ctx2d.globalAlpha = options.textStyle.alpha;
    ctx2d.fillStyle = options.textStyle.color;

    // 设置在绘制文本时使用的当前文本基线
    ctx2d.textBaseline = "Middle";

    // 设置文本内容的对齐方式
    ctx2d.textAlign = options.textStyle.align;

    let txtX = options.textStyle.left;
    let txtY = options.textStyle.top;
    if (options.textStyle.align === "right") {
      txtX = options.imageStyle.width - options.textStyle.left;
    }

    // 在画布上绘制填色的文本(text, x, y)
    if (typeof options.content === "string") {
      ctx2d.fillText(options.content, txtX, txtY);
    } else if (Array.isArray(options.content)) {
      options.content.forEach((txt) => {
        ctx2d.fillText(txt, txtX, txtY);
        txtY += options.textStyle.lineHeight;
      });
    }
    const dataURL = cvs.toDataURL("image/png");

    const div = document.createElement("div");
    div.id = options.elementId;
    div.style.pointerEvents = "none";
    div.style.position = "absolute";
    div.style.zIndex = "100000";

    // 完整覆盖指定对象
    div.style.width = options.targetElement.clientWidth + "px";
    div.style.height = options.targetElement.clientHeight + "px";
    div.style.top = options.targetElement.offsetTop + "px";
    div.style.left = options.targetElement.offsetLeft + "px";

    // 设置水印图片
    div.style.backgroundImage = `url(${dataURL})`;
    div.style.backgroundPosition = options.imageStyle.position;
    div.style.backgroundRepeat = options.imageStyle.repeat;

    return div;
  }
}

export default Watermark;
