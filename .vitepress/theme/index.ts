// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client"; //行内链接预览
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css"; //行内链接预览
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client"; //布局切换，聚光灯按钮
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css"; //布局切换，聚光灯按钮

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "nav-screen-content-after": () =>
        h(NolebaseEnhancedReadabilitiesScreenMenu), //布局切换，聚光灯按钮
      "nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu), //布局切换，聚光灯按钮
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.use(NolebaseInlineLinkPreviewPlugin); //行内链接预览
    // ...
  },
} satisfies Theme;
