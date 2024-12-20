// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import "./style/index.css"; //导入自定义样式
import MyLayout from "./components/MyLayout.vue"; //导入自定义布局
import "virtual:group-icons.css"; //代码块图标 标题支持样式
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css"; //导入行内链接预览样式
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client' //基于git历史页面插件
import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client"; //导入行内链接预览


export default {
  extends: DefaultTheme,
  Layout: MyLayout, //切换到MyLayout，如果要使用其他插槽到MyLayout中使用

  enhanceApp({ app, router, siteData }) {
    app.use(NolebaseInlineLinkPreviewPlugin); //行内链接预览
    app.use(NolebaseGitChangelogPlugin)//基于git历史页面插件
    // ...
  },
} satisfies Theme;
