# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Batool 是一个基于 Astro 构建的个人工具索引站,提供快速搜索和分类筛选功能,帮助用户管理和访问常用工具链接。

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器 (localhost:4321)
pnpm dev

# 构建生产版本到 ./dist/
pnpm build

# 预览构建后的站点
pnpm preview

# 运行 Astro CLI 命令
pnpm astro ...
```

## 技术栈

- **框架**: Astro 5.17+ (静态站点生成器)
- **样式**: Tailwind CSS 4.x + DaisyUI 5.x (通过 Vite 插件集成)
- **搜索**: Fuse.js 7.x (客户端模糊搜索)
- **包管理器**: pnpm
- **TypeScript**: 严格模式配置 (`astro/tsconfigs/strict`)

## 架构设计

### 数据流架构

项目采用**服务端渲染 + 客户端交互**的混合架构:

1. **服务端阶段** (Astro 构建时):
   - 从 `public/tools.json` 加载工具数据
   - 生成分类统计信息
   - 渲染静态 HTML 结构
   - 通过 `<script define:vars={{ tools }}>` 将服务端数据传递到客户端

2. **客户端阶段** (浏览器运行时):
   - 使用 Fuse.js 实现模糊搜索
   - 动态过滤和渲染工具列表
   - 处理用户交互(搜索输入、分类筛选、快捷键)

### 关键实现模式

**服务端到客户端的数据传递** (src/pages/index.astro:109-111):
```astro
<script define:vars={{ tools }}>
  window.__TOOLS__ = tools;
</script>
```

**客户端动态导入 Fuse.js** (src/pages/index.astro:130-145):
- 使用 `import()` 动态导入减小初始包体积
- 配置多字段搜索权重(name: 2, description: 1.5, tags: 1.2)
- 阈值 0.4 平衡准确性和模糊匹配

## 项目结构

```
src/
├── layouts/Layout.astro    # 主布局,包含 SEO 元标签和全局样式
├── pages/index.astro       # 首页,核心搜索和筛选逻辑
├── styles/global.css       # Tailwind + DaisyUI 入口
├── types/tool.ts           # Tool 接口定义
└── components/             # 可复用组件(当前为 Welcome 示例)

public/
└── tools.json              # 工具数据源(需要保持此格式)
```

## 数据模型

工具数据结构 (`src/types/tool.ts`):

```typescript
interface Tool {
  name: string;        // 工具名称
  description: string; // 工具描述
  category: string;    // 工具分类
  url: string;         // 工具链接
  tags?: string[];     // 可选标签数组
  icon?: string;       // 可选图标(预留)
}
```

**数据管理规则**:
- 主数据源: `public/tools.json`
- 添加/修改工具时直接编辑 JSON 文件
- 分类通过 `category` 字段自动识别并生成筛选按钮
- 所有字段为必填(除 `tags` 和 `icon`)

## 样式系统

**Tailwind CSS 4.x 集成方式**:
- 通过 `@tailwindcss/vite` Vite 插件引入(astro.config.mjs:3,8)
- DaisyUI 作为 Tailwind 插件使用(`@plugin "daisyui"` in global.css)
- 使用 DaisyUI 语义化组件(`btn`, `badge`, `card`, `input` 等)

**主题系统**:
- 基于 DaisyUI 的 `data-theme` 属性切换
- 当前使用默认主题的 `primary/secondary/accent/base-content` 语义变量
- 渐变效果: `bg-gradient-to-r from-primary via-secondary to-accent`

## 性能优化

1. **按需导入**: Fuse.js 通过动态 import() 延迟加载
2. **动画优化**: 使用 CSS `transform` 和 `opacity` 动画(避免触发重排)
3. **SEO 优化**: 完整的 Open Graph 和 Twitter Card 元标签
4. **无障碍**: 搜索框有 `sr-only` label,外部链接添加 `aria-label`

## 快捷键

- **⌘K / Ctrl+K**: 聚焦搜索框
- **Escape**: 清空搜索并失焦

## 开发注意事项

### 修改工具数据
- 直接编辑 `public/tools.json`
- 保持 JSON 格式正确(可通过 `pnpm build` 验证)
- 分类会自动更新,无需手动维护

### 添加新页面
- 在 `src/pages/` 创建 `.astro` 文件
- 使用 `Layout.astro` 作为基础布局
- 继承相同的全局样式和主题配置

### 样式定制
- 优先使用 DaisyUI 语义化类名
- 自定义样式使用 Tailwind 工具类
- 避免硬编码颜色值,使用主题变量

### 搜索功能调整
- 搜索权重配置在 `src/pages/index.astro:134-139`
- `threshold` 值越小匹配越精确(0.0 = 完全匹配,1.0 = 匹配所有)
- `minMatchCharLength` 控制最小匹配字符数
