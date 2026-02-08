# Header 组件增强设计文档

**日期**: 2026-02-08
**组件**: `src/components/Header.astro`
**状态**: 设计完成，待实施

---

## 概述

对 Header.astro 组件进行三项增强，提升用户体验和视觉交互效果：

1. **Brand 区域按钮化**：将品牌标识（Logo + 名称）作为整体按钮样式
2. **主题切换动画**：使用 DaisyUI swap 组件实现太阳/月亮旋转切换
3. **滚动边线**：页面滚动时动态显示底部边线

---

## 功能需求

### 1. Brand 按钮化

**当前状态**：
- 简单的链接结构（`<a>`）
- 无明显的按钮视觉特征

**目标**：
- 保持链接行为（`<a>` 标签）
- 添加明显的按钮样式：边框、背景、阴影
- 增强悬停和点击反馈

**实现方式**：
```astro
<a href="/"
   class="inline-flex items-center gap-2.5 px-3 py-2 rounded-lg
          border border-base-content/10 bg-base-content/5
          hover:bg-base-content/10 hover:border-base-content/20
          hover:shadow-sm transition-all duration-300 group">
  <!-- Logo + 文本 -->
</a>
```

### 2. 主题切换使用 Swap 组件

**当前状态**：
- 普通 button + SVG 图标
- 无动画效果

**目标**：
- 使用 DaisyUI swap 组件
- 太阳/月亮图标旋转切换
- 平滑的过渡动画

**实现方式**：
```astro
<label class="swap swap-rotate text-base-content/60 hover:text-base-content/80
             transition-colors duration-300 cursor-pointer">
  <input type="checkbox" id="theme-toggle" onchange="toggleTheme()" />

  <!-- 太阳图标（light 模式） -->
  <svg class="swap-off fill-current w-5 h-5">...</svg>

  <!-- 月亮图标（dark 模式） -->
  <svg class="swap-on fill-current w-5 h-5">...</svg>
</label>
```

**关键技术点**：
- `swap swap-rotate`：DaisyUI 组件类名
- `swap-on`/`swap-off`：控制显示状态
- checkbox `checked` 属性控制 swap 状态

### 3. 滚动边线

**当前状态**：
- 固定的底部边框（`border-b border-base-content/10`）

**目标**：
- 默认无边框
- 页面滚动时显示边线（scrollY > 0）
- 平滑的出现/消失动画

**实现方式**：
```astro
<header id="main-header"
        class="... transition-all duration-300">
  <!-- 内容 -->
</header>

<script>
  const header = document.getElementById('main-header');
  let ticking = false;

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 0) {
      header.classList.add('border-b', 'border-base-content/10');
    } else {
      header.classList.remove('border-b', 'border-base-content/10');
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = true;
      });
    }
  }, { passive: true });
</script>
```

---

## 技术架构

### 组件结构

```
Header.astro
├── Astro frontmatter（组件文档）
├── Header 元素（fixed 定位）
│   ├── Brand 区域（按钮样式链接）
│   │   ├── Logo 图标
│   │   └── 站点名称
│   └── 操作区域
│       ├── 主题切换（swap 组件）
│       └── GitHub 链接
└── 脚本块
    ├── 滚动监听逻辑
    └── 主题同步逻辑
```

### 数据流

#### 主题切换流程

```
用户点击 checkbox
  ↓
onchange 事件触发
  ↓
toggleTheme() 函数执行（全局函数）
  ↓
data-theme 属性改变
  ↓
MutationObserver 检测到变化
  ↓
同步 checkbox.checked 状态
  ↓
Swap 组件自动更新显示
```

#### 滚动边线流程

```
用户滚动页面
  ↓
scroll 事件触发
  ↓
requestAnimationFrame 调度
  ↓
handleScroll() 执行
  ↓
判断 scrollY > 0
  ↓
添加/移除 border-b 类
  ↓
CSS transition 处理动画
```

---

## 性能优化

### 1. 滚动监听优化

**问题**：scroll 事件触发频繁，直接操作 DOM 会影响性能

**解决方案**：
- **requestAnimationFrame**：利用浏览器刷新周期，避免丢帧
- **ticking 标志**：节流优化，防止同一帧多次执行
- **passive: true**：告知浏览器不会调用 preventDefault()，提升滚动性能

### 2. 主题同步优化

**问题**：主题可能在多个地方切换，需要保持状态同步

**解决方案**：
- **MutationObserver**：监听 `data-theme` 属性变化，而不是轮询
- **attributeFilter**：只监听特定属性，减少不必要的回调

### 3. CSS 动画优化

**方案**：使用 CSS transition 而非 JavaScript 动画

**优势**：
- 浏览器原生优化
- 不占用 JS 线程
- 自动硬件加速（transform/opacity）

---

## 可访问性

### ARIA 标签

- Brand 按钮：`aria-label="返回首页"`
- 主题切换：`aria-label="切换明暗主题"`
- GitHub 链接：`aria-label="访问项目 GitHub 仓库（新窗口打开）"`

### 键盘导航

- 所有交互元素可聚焦（按钮、链接、label）
- 保留 GitHub 链接的 focus-visible 样式

### 语义化 HTML

- 使用 `<header>` 标签
- 使用 `<label>` 包裹 swap 组件（语义正确）
- 保留 `<a>` 链接结构（非按钮劫持）

---

## 测试要点

### 功能测试

- [ ] Brand 按钮点击可返回首页
- [ ] 主题切换正常工作（light ↔ dark）
- [ ] Swap 组件旋转动画流畅
- [ ] 滚动时边线正确显示/隐藏
- [ ] GitHub 链接在新标签页打开

### 兼容性测试

- [ ] Chrome/Edge（Chromium）
- [ ] Firefox
- [ ] Safari（需要测试 requestAnimationFrame）
- [ ] 移动端浏览器（触摸滚动）

### 性能测试

- [ ] 滚动帧率保持 60fps
- [ ] 无内存泄漏（事件监听器）
- [ ] 页面加载时无闪烁

### 可访问性测试

- [ ] 屏幕阅读器正确朗读 aria-label
- [ ] Tab 键可遍历所有交互元素
- [ ] 颜色对比度符合 WCAG 标准

---

## 实施计划

1. **备份当前版本**：创建 git commit
2. **一次性重构**：按照设计文档完整替换 Header.astro
3. **本地测试**：运行 `pnpm dev` 验证所有功能
4. **跨浏览器测试**：在主流浏览器中测试
5. **提交代码**：创建规范的 commit message

---

## 未来改进方向

1. **主题持久化**：考虑使用 localStorage 记住用户偏好
2. **系统主题检测**：支持 `prefers-color-scheme` 媒体查询
3. **移动端优化**：考虑在移动端隐藏部分元素
4. **组件提取**：将主题切换逻辑提取为独立组件

---

**设计文档版本**: 1.0
**最后更新**: 2026-02-08
