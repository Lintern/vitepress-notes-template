<!--导航栏2-->
# 测试元素 1

> 更新时间：2024 年

## 超链接样式

- [未访问的链接](https://www.bilibili.html)
- [已访问的链接](https://www.bilibili.com)

## 代码块样式

### 基础

```css [.css]
/* 浅色模式下的代码块 */
.vp-code-block-title,
.vp-code-group {
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.4); /* 阴影 */
  border-radius: 10px; /* 圆角 */
}
```

### 标题

```sh [yarn]
#查询yarn版本
yarn -v
```

### 混合

::: code-group

```sh [vp-code-title.css]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```

:::

## Badge 样式

> [!info] info 注释
> 注释是灰色

> [!tip] 提示
> 提示是绿色

> [!warning] 警告
> 警告是橘色

> [!danger] 危险
> 危险是红色