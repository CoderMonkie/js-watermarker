/*
 * @Description:
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-06-30 20:35:57
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
 */
import defaultOptions from "./defaultOptions.js";
import { mixOptions } from "./utils.js";
import Watermark from "./Watermark.js";

const MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;

class Watermarker {
  constructor(targetElement) {
    // TODO #3 querySelector support
    if (!targetElement instanceof HTMLElement) {
      throw new Error(`targetElement (${targetElement}) is not HTMLElement`);
    }

    this.targetElement = targetElement;

    // 添加到同级路径或默认的body下
    this.container =
      this.targetElement === document.body
        ? document.body
        : this.targetElement.parentElement;

    this.elementId = "watermarkElementId" + Math.random() * 10000;
    this.observer = null;
    this.watermark = null;
    this.options = null;
  }

  static init(targetElement = document.body) {
    return new Watermarker(targetElement);
  }

  setForImage(options, reset) {
    // 备份原始图片
    if (reset) {
      this.targetElement.dataset.watermark = "";
    } else if (this.targetElement.dataset.watermark === "marked") {
      return;
    } else {
      this.__src__ = this.targetElement.src.toString();
      this.__img__ = this.targetElement.cloneNode(true);
    }

    // 合并配置内容
    this.options = mixOptions(
      { ...options, targetElement: this.targetElement },
      { ...defaultOptions(true) }
    );

    const tempImg = new Image();
    tempImg.crossOrigin = "anonymous";

    tempImg.onerror = (e) => {
      this.setForMask(options);
      tempImg.onerror = null;
    };

    tempImg.src = this.__src__;
    tempImg.onload = (e) => {
      let cvs = document.createElement("canvas");
      cvs.width = this.options.imageStyle.width;
      cvs.height = this.options.imageStyle.height;

      const wmWidth = parseInt(this.options.imageStyle.width);
      const wmHeight = parseInt(this.options.imageStyle.height);

      cvs.width = this.targetElement.clientWidth;
      cvs.height = this.targetElement.clientHeight;

      let ctx2d = cvs.getContext("2d");
      ctx2d.drawImage(this.__img__, 0, 0);

      // 旋转角度
      this.options.textStyle.rotate &&
        ctx2d.setTransform(
          1,
          (this.options.textStyle.rotate * Math.PI) / 180,
          0,
          1,
          0,
          0
        );

      ctx2d.font = `${parseInt(this.options.textStyle.fontSize)}px ${
        this.options.textStyle.fontFamily
      }`;
      // 设置填充绘画的颜色、渐变或者模式
      ctx2d.globalAlpha = this.options.textStyle.alpha;
      ctx2d.fillStyle = this.options.textStyle.color;

      // 设置在绘制文本时使用的当前文本基线
      ctx2d.textBaseline = "Middle";

      // 设置文本内容的对齐方式
      ctx2d.textAlign = this.options.textStyle.align;

      let txtX = 0;
      let txtY = 0;

      const contentArr = Array.isArray(this.options.content)
        ? this.options.content
        : [this.options.content];

      if (this.options.imageStyle.repeat === "repeat") {
        for (let i = 0; i < cvs.width; i += wmWidth) {
          txtX = i + this.options.textStyle.left;
          for (let j = 0; j < cvs.height; j += wmHeight) {
            txtY = j + this.options.textStyle.top;
            contentArr.forEach((n) => {
              ctx2d.fillText(n, txtX, txtY);
              txtY += this.options.textStyle.lineHeight;
            });
          }
        }
      } else {
        txtX =
          cvs.width -
          this.options.imageStyle.width -
          this.options.textStyle.left;
        txtY =
          cvs.height -
          this.options.imageStyle.height -
          this.options.textStyle.top;

        contentArr.forEach((n) => {
          ctx2d.fillText(n, txtX, txtY);
          txtY += this.options.textStyle.lineHeight;
        });
      }

      this.targetElement.setAttribute("data-watermark", "marked");

      const newSrc = cvs.toDataURL("image/png");
      this.targetElement.src = newSrc;
      ctx2d = cvs = null;
    };
  }

  // handleResize() {
  //   this.createAndAppend();
  // }

  setForMask(options) {
    // 关闭观察器
    this.clearObserver();

    // 没有文字内容即不设置水印
    if (!options.content || !options.content.length) return;

    // 先检查旧水印，如果有就删除
    this.removeWatermark();

    // 合并配置内容
    this.options = mixOptions(
      { ...options, targetElement: this.targetElement },
      { ...defaultOptions() }
    );

    this.createAndAppend();
  }

  setOption(options, reset = false) {
    console.log(options);
    if (this.targetElement instanceof HTMLImageElement) {
      this.setForImage(options, reset);
    } else {
      this.setForMask(options);
    }
  }

  createAndAppend() {
    // 关闭观察器
    this.clearObserver();

    // 没有文字内容即不设置水印
    if (!this.options.content || !this.options.content.length) return;

    // 先检查旧水印，如果有就删除
    this.removeWatermark();

    // 创建元素
    this.watermark = new Watermark({
      ...this.options,
      elementId: this.elementId,
    });

    this.container.appendChild(this.watermark);

    // 重新 | 配置观察器
    this.observer = new MutationObserver((mutationsList, observer) => {
      for (let i = 0; i < mutationsList.length; i++) {
        const mutation = mutationsList[i];
        if (
          mutation.type === "childList" &&
          [].some.call(mutation.removedNodes, (n) => n === this.watermark)
        ) {
          console.log("The watermark node has been removed.");
          this.createAndAppend();
          break;
        } else if (mutation.type === "attributes") {
          console.log(
            "The " + mutation.attributeName + " attribute was modified."
          );
          this.createAndAppend();
          break;
        }
      }
    });

    // 观察器启动监视
    this.observer.observe(this.container, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // 检测到窗口 resize 时重设
    // window.addEventListener("resize", this.handleResize.bind(this));
  }

  clear() {
    this.clearObserver();
    this.removeWatermark();
  }

  clearObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // 清除 resize 监听
    // window.removeEventListener("resize", this.handleResize);
  }

  removeWatermark() {
    if (this.watermark && this.watermark.parentElement) {
      this.watermark.parentElement.removeChild(this.watermark);
      this.watermark = null;
    }
  }
}

export default Watermarker;
