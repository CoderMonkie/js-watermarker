/*
 * @Description: vite config
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-06-30 20:35:57
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
 */
import { defineConfig, loadEnv, mergeConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default ({ command, mode }) => {
  const baseConfig = {
    root: "./example",
    base: "./",
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "e@": resolve(__dirname, "example/src"),
      },
    },
  };

  const isBuildLib = command === "build" && mode === "production";

  let config = { ...baseConfig };
  if (isBuildLib) {
    config = mergeConfig(baseConfig, {
      root: "",
      build: {
        lib: {
          entry: "./src/main.js",
          name: "watermark-js",
          formats: ["es", "cjs", "umd", "iife"],
        },
        outDir: "./dist",
      },
    });
  }

  return defineConfig(config);
};
