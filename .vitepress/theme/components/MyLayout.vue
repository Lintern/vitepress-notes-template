<!-- .vitepress/theme/MyLayout.vue -->

<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide } from "vue";

// 获取当前的暗黑模式状态
const { isDark } = useData();

// 检查浏览器是否支持 View Transition API 和用户是否允许动态效果
const isTransitionsSupported = (): boolean =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

// 切换暗黑模式的函数
const toggleDarkMode = async (event: MouseEvent) => {
  // 如果不支持动画过渡或禁用了动态效果，直接切换模式
  if (!isTransitionsSupported()) {
    isDark.value = !isDark.value;
    return;
  }

  // 获取鼠标点击位置
  const { clientX: x, clientY: y } = event;
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // 定义动画路径
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${maxRadius}px at ${x}px ${y}px)`,
  ];

  // 执行过渡动画
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick(); // 等待视图更新
  }).ready;

  // 执行视图切换动画
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
};

// 提供切换暗黑模式的方法
provide("toggle-appearance", toggleDarkMode);

import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client"; //导入布局切换、聚光灯按钮
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css"; //导入布局切换、聚光灯按钮样式
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <NolebaseEnhancedReadabilitiesMenu />
      <!-- 为较宽的屏幕的导航栏插入布局切换、聚光灯按钮 -->
    </template>
    <template #nav-screen-content-after>
      <NolebaseEnhancedReadabilitiesScreenMenu />
      <!-- 为较窄的屏幕（通常是小于 iPad Mini）插入布局切换、聚光灯按钮 -->
    </template>

    <!-- 其他插槽内容 -->
  </DefaultTheme.Layout>
</template>

<style>
/* 设置 View Transition 动画的样式 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 在暗黑模式下，调整 View Transition 的 z-index */
::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

/* 调整切换按钮的样式 */
/* .VPSwitchAppearance {
  width: 22px !important;
} */

/* .VPSwitchAppearance .check {
  transform: none !important;
} */
</style>
