// 配置 VitePress 文档
// https://vitepress.dev/reference/site-config
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links"; //双向链接
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it"; //行内链接预览

import { defineConfig } from "vitepress";
import { head, nav } from "./configs";

export default defineConfig({
  outDir: "./dist", //构建目录
  lang: "zh-CN",
  title: "Lintern | 个人自留地", //网页标签标题
  description: "Lintern | 个人自留地", //SEO
  ignoreDeadLinks: true, // 忽略死链接检测
  head,
  //Markdown语法配置
  markdown: {
    config: (md) => {
      md.use(BiDirectionalLinks()); //双向链接
      md.use(InlineLinkPreviewElementTransform); //行内链接预览
    },
  },

  // 主题配置
  themeConfig: {
    siteTitle: "Lintern", //网站标题
    // logo: "/logo.png",//标题图标

    nav,

    /* 右侧大纲配置 */
    outline: {
      level: "deep",
      label: "目录",
    },

    //脚页配置
    footer: {
      copyright: `<a class="footer-cc-link" target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> © 2024 Lintern`, // 页脚版权信息
    },

    // 配置侧边栏
    // sidebar: {}

    // 配置社交链接，显示在顶部导航栏中
    socialLinks: [
      { icon: "github", link: "https://github.com/Lintern" }, // GitHub 图标和链接
    ],
  },
});
