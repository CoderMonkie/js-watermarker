/*
 * @Description:
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-06-30 20:35:57
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
 */
import defaultOptions from "./defaultOptions.js";
import { mixOptions } from "./utils.js";
import Watermark from "./Watermark.js";

const elementId = "watermarkElementId" + Math.random() * 10000;

const MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;

let observer = null;

const clearObserver = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
};

/**
 * 创建新水印并添加到指定容器
 */
const createAndAppend = (options) => {
  // 关闭观察器
  clearObserver();

  // 没有文字内容即不设置水印
  if (!options.content || !options.content.length) return;

  // 先检查旧水印，如果有就删除
  const targetElement = document.getElementById(elementId);
  if (targetElement) {
    targetElement.parentElement.removeChild(targetElement);
  }

  // 创建元素
  const wm = new Watermark({
    ...options,
    elementId,
  });
  // 添加到同级路径或默认的body下
  const container =
    options.targetElement === document.body
      ? document.body
      : options.targetElement.parentElement;
  container.appendChild(wm);

  // 重新 | 配置观察器
  observer = new MutationObserver((mutationsList, observer) => {
    for (let i = 0; i < mutationsList.length; i++) {
      const mutation = mutationsList[i];
      if (
        mutation.type === "childList" &&
        [].some.call(mutation.removedNodes, (n) => n.id === elementId)
      ) {
        console.log("The watermark node has been removed.");
        createAndAppend(options);
        break;
      } else if (
        mutation.type === "attributes" &&
        mutation.target.id === elementId
      ) {
        console.log(
          "The " + mutation.attributeName + " attribute was modified."
        );
        createAndAppend(options);
        break;
      }
    }
  });

  // 观察器启动监视
  observer.observe(wm.parentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });
};

/**
 * @description 设置水印
 * @param {Object} options 配置对象
 * @see defaultOptions.js
 */
export const setWatermark = (options) => {
  // 没有文字内容即不设置水印
  if (!options.content || !options.content.length) return;

  // 清除观察器
  clearObserver();

  // 合并配置内容
  const customOptions = mixOptions(options, { ...defaultOptions });

  // 检查添加位置
  if (!customOptions.targetElement) {
    customOptions.targetElement = document.body;
  } else if (!customOptions.targetElement instanceof HTMLElement) {
    throw new Error(
      `targetElement (${options.targetElement}) is not HTMLElement`
    );
  }

  createAndAppend(customOptions);
};

export default setWatermark;
