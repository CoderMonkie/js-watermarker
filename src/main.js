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
      throw new Error(
        `targetElement (${options.targetElement}) is not HTMLElement`
      );
    }

    this.targetElement = targetElement;
    this.elementId = "watermarkElementId" + Math.random() * 10000;
    this.observer = null;
    this.watermark = null;
    this.options = null;
  }

  static init(targetElement = document.body) {
    return new Watermarker(targetElement);
  }

  setOption(options) {
    console.log("setOption", options);
    // 关闭观察器
    this.clearObserver();

    // 没有文字内容即不设置水印
    if (!options.content || !options.content.length) return;

    // 先检查旧水印，如果有就删除
    this.removeWatermark();

    // 合并配置内容
    this.options = mixOptions(
      { ...options, targetElement: this.targetElement },
      { ...defaultOptions }
    );

    const handleResize = () => {
      this.createAndAppend();
    };
    // 清除 resize 监听
    window.removeEventListener("resize", handleResize);

    this.createAndAppend();

    // 检测到窗口 resize 时重设
    window.addEventListener("resize", handleResize);
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

    // 添加到同级路径或默认的body下
    const container =
      this.targetElement === document.body
        ? document.body
        : this.targetElement.parentElement;
    container.appendChild(this.watermark);

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
        } else if (
          mutation.type === "attributes" &&
          mutation.target === this.watermark
        ) {
          console.log(
            "The " + mutation.attributeName + " attribute was modified."
          );
          this.createAndAppend();
          break;
        }
      }
    });

    // 观察器启动监视
    this.observer.observe(container, {
      attributes: true,
      childList: true,
      subtree: true,
    });
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
  }

  removeWatermark() {
    const targetElement = document.getElementById(this.elementId);
    if (targetElement) {
      targetElement.parentElement.removeChild(targetElement);
    }
    this.watermark = null;
  }
}

export default Watermarker;
