/*
 * @Description: vite config
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-06-30 20:35:57
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
 */
import { defineConfig, mergeConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import { resolve } from "path";

export default ({ command, mode }) => {
  const baseConfig = {
    root: "./example",
    base: "./",
    plugins: [
      vue(),
      viteCompression({
        verbose: true,
        threshold: 1024 * 5,
        algorithm: "gzip",
        ext: ".gz",
        deleteOriginFile: true,
      }),
    ],
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
          name: "jswatermarker",
          formats: ["es", "cjs", "umd", "iife"],
        },
        outDir: "./dist",
      },
    });
  }

  return defineConfig(config);
};
