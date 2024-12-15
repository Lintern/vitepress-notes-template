// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import "./style/index.css"; //导入自定义样式

import MyLayout from "./components/MyLayout.vue"; //导入自定义模块

import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client"; //导入行内链接预览
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css"; //导入行内链接预览样式

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(MyLayout, null, {
      //....
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.use(NolebaseInlineLinkPreviewPlugin); //行内链接预览
    // ...
  },
} satisfies Theme;
