// 配置 VitePress 文档
// https://vitepress.dev/reference/site-config
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links"; //双向链接
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it"; //行内链接预览
import { GitChangelog, GitChangelogMarkdownSection, } from "@nolebase/vitepress-plugin-git-changelog/vite";
import { groupIconMdPlugin, groupIconVitePlugin, } from "vitepress-plugin-group-icons"; //代码块图标 标题支持
import { defineConfig } from "vitepress";
import { head } from "./configs";
// 引入侧边栏配置
import { sidebar, nav } from "./docsMetadata.json";

export default defineConfig({
  outDir: "./dist", //构建目录
  lang: "zh-CN",
  title: "Lintern | 个人自留地", //网页标签标题
  description: "Lintern | 个人自留地", //SEO
  lastUpdated: true, //页面更新时间
  // cleanUrls:true, //开启纯净链接无html

  //启用深色模式
  appearance: "dark",
  head,

  vite: {
    plugins: [
      groupIconVitePlugin(), //代码块图标 标题支持插件
      GitChangelog({
        // 基于 Git 的页面历史插件 填写在此处填写您的仓库链接
        repoURL: () => "https://github.com/Lintern/vitepress-notes-template",
        mapAuthors: [ 
          { 
            name: 'Lintern', 
            username: 'Lintern', 
            mapByEmailAliases: ['Mr.Yu_Ze@Outlook.com'],
            links:'https://github.com/Lintern',
          } 
        ] 
      }),
      GitChangelogMarkdownSection({
        exclude: (id) => id.endsWith('文件夹/index.md'),//为某个页面单独禁用插件(空则全部禁用)
        
      }),
    ],
  },

  //Markdown语法配置
  markdown: {
    lineNumbers: true, //行号显示
    config: (md) => {
      md.use(groupIconMdPlugin); //代码块图标 标题支持
      md.use(BiDirectionalLinks()); //双向链接
      md.use(InlineLinkPreviewElementTransform); //行内链接预览
    },
  },

  // 主题配置
  themeConfig: {
    siteTitle: "Lintern", //网站标题
    logo: "/logo.png", //标题图标
    nav,
    sidebar,

    //脚页配置
    footer: {
      copyright: `<a class="footer-cc-link" target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> © 2024 Lintern`, // 页脚版权信息
    },

    // 配置社交链接，显示在顶部导航栏中
    socialLinks: [
      { icon: "github", link: "https://github.com/Lintern" }, // GitHub 图标和链接
    ],

    

    search: {
      // 配置搜索功能
      provider: "local", // 使用本地搜索引擎
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: "搜索", buttonAriaLabel: "搜索" }, // 配置搜索按钮的文字
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
        },
      },
    },

    outline: {
      level: "deep",
      label: "页面大纲",
    },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    externalLinkIcon: true, //给外部链接加上箭头

    //页面更新时间
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short", // 可选值full、long、medium、short
        timeStyle: "medium", // 可选值full、long、medium、short
      },
    },
  },
});
