<div align="center">

# Batool

### ⚡ 一个为开发者设计的极简工具入口。直达官网，零干扰。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org)
[![Astro Version](https://img.shields.io/badge/Astro-5.17%2B-orange)](https://astro.build)

[在线演示](https://batool-delta.vercel.app/) • [快速开始](#-快速开始) • [配置指南](#-配置说明) • [部署](#-部署)

</div>

---

## 📖 简介

> **"直达，即专注。"**

Batool 是一个为开发者设计的极简工具入口。直达官网，零干扰。

**核心理念:**

- ✅ **一秒直达** - 从想法到行动，只需一次搜索
- ✅ **完全私有** - 数据本地化，无追踪，无广告
- ✅ **毫秒响应** - 静态生成 + Fuse.js 模糊搜索
- ✅ **高度可定制** - JSON 驱动，几分钟搭建专属工具站

### 🎯 为什么选择 Batool？

- 🔖 **收藏夹混乱** —— 工具太多，关键时刻反而找不到？  
- 🚫 **工具站噪音大** —— 厌倦了充斥广告、链接失效、内容注水的“AI 工具大全”？  
- 🔒 **数据不自主** —— 不想把常用工具列表交给第三方平台？  
- ⚡ **追求零摩擦** —— 需要一个干净、快速、完全由你掌控的入口？  

> Batool 官方维护一份**精选开发者工具集**，确保链接有效、分类清晰。  
> 欢迎通过 Issue 或 PR 提交优质工具 —— 我们只收录真正值得信赖的项目。

**Batool 的答案很简单：**

> 把工具列表交给你，把搜索速度交给 Fuse.js，把专注还给你自己。

## ✨ 核心特性

**🔍 智能模糊搜索**

- 基于 [Fuse.js](https://fusejs.io/) 的强大搜索引擎
- 支持中文、拼音、英文混合搜索
- 可配置的多字段权重(name > description > tags)
- 毫秒级响应，零延迟体验

**🎨 优雅设计**

- 基于 [DaisyUI](https://daisyui.com/) 的现代化 UI
- 响应式布局，完美适配移动端和桌面端
- Linear 风格设计，简洁而不简单
- 语义化组件，易于定制主题

**⚡ 极速性能**

- [Astro 5](https://astro.build/) 静态站点生成
- 零运行时依赖，超快首屏加载
- 按需导入，Fuse.js 动态加载
- Lighthouse 满分性能优化

**🔒 数据私有**

- 完全本地化部署，无任何第三方追踪
- 所有工具数据存储在 `tools.json`
- 支持私有仓库部署，数据完全掌控
- 无广告、无推荐、无干扰

**⌨️ 键盘友好**

- `⌘K` / `Ctrl+K` - 快速聚焦搜索框
- `Escape` - 清空搜索并失焦
- 流畅的键盘导航体验

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Astro](https://astro.build/) | 5.17+ | 静态站点生成器 |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | 原子化 CSS 框架 |
| [DaisyUI](https://daisyui.com/) | 5.x | 组件库与主题系统 |
| [Fuse.js](https://fusejs.io/) | 7.x | 模糊搜索引擎 |
| [TypeScript](https://www.typescriptlang.org/) | Strict | 类型安全 |

## 🚀 快速开始

### 环境要求

- **Node.js** >= 22.0.0
- **pnpm** (推荐) 或 npm/yarn

### 1. 克隆项目

```bash
git clone https://github.com/zhycn/batool.git
cd batool
```

### 2. 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:4321` 查看效果。

### 4. 添加你的工具

编辑 `public/tools.json`：

```json
[
  {
    "name": "ChatGPT",
    "description": "OpenAI 开发的对话式 AI 助手，强大的自然语言理解和生成能力。",
    "category": "AI 工具",
    "url": "https://chat.openai.com",
    "tags": ["聊天", "GPT", "助手"]
  },
  {
    "name": "GitHub",
    "description": "全球最大的代码托管平台，版本控制，开源项目聚集地。",
    "category": "开发工具",
    "url": "https://github.com",
    "tags": ["Git", "版本控制", "开源"]
  }
]
```

### 5. 构建生产版本

```bash
pnpm build
```

构建产物将输出到 `./dist/` 目录。

## 🔧 配置说明

### 自定义工具数据

所有工具数据存储在 `public/tools.json`，支持以下字段：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | ✅ | 工具名称 |
| `description` | string | ✅ | 工具描述 |
| `category` | string | ✅ | 工具分类 |
| `url` | string | ✅ | 工具链接 |
| `tags` | string[] | ❌ | 标签数组，用于搜索 |

**示例：**

```json
{
  "name": "Ollama",
  "description": "本地运行大语言模型，简单易用，开发者友好。",
  "category": "AI 工具",
  "url": "https://ollama.com",
  "tags": ["LLM", "本地部署", "开源"]
}
```

### 统一配置文件

Batool 采用统一的配置文件 `src/types/settings.ts` 管理所有可配置项。

**配置结构:**

```typescript
// 应用基础配置
APP_CONFIG = {
  APP_NAME: 'Batool',
  APP_DESCRIPTION: '极简 • 私有 • 极速的开发者工具启动面板',
  APP_URL: 'https://batool-delta.vercel.app/',
  GITHUB_REPO: 'https://github.com/zhycn/batool',
}

// 搜索配置
SEARCH_CONFIG = {
  FUSE_WEIGHTS: {
    NAME: 2,           // 名称权重
    DESCRIPTION: 1.5,  // 描述权重
    CATEGORY: 1,       // 分类权重
    TAGS: 1.2,         // 标签权重
  },
  FUSE_THRESHOLD: 0.4,         // 匹配阈值 (0-1, 越小越精确)
  MIN_MATCH_CHAR_LENGTH: 1,    // 最小匹配字符数
  DEBOUNCE_DELAY: 300,         // 搜索防抖延迟 (毫秒)
}

// UI 配置
UI_CONFIG = {
  DEFAULT_THEME: 'light',       // 默认主题
  ITEMS_PER_PAGE: 20,           // 每页显示数量
  LARGE_DATA_THRESHOLD: 200,    // 大数据量提示阈值
  PLACEHOLDERS: {
    SEARCH: '搜索工具...',      // 搜索框占位符
    EMPTY_STATE: '没有找到匹配的工具',
  },
  SHORTCUTS: {
    SEARCH: { key: 'k', requiresMeta: true },  // ⌘K / Ctrl+K
    ESCAPE: 'Escape',                          // 清除搜索
  },
  ANIMATION: {
    STAGGER_DELAY: 15,          // 列表项逐个显示延迟
    FADE_IN_DURATION: 200,      // 淡入动画时长
  },
}

// SEO 配置
SEO_CONFIG = {
  KEYWORDS: ['工具索引', '工具导航', '开发者工具', 'AI工具'],
  THEME_COLOR: '#6366f1',
  LANG: 'zh-CN',
}
```

**自定义配置:**

只需编辑 `src/types/settings.ts`,修改对应配置项即可:

```typescript
// 例如: 修改每页显示 30 个工具
export const UI_CONFIG = {
  ITEMS_PER_PAGE: 30,  // 改为 30
  // ... 其他配置保持不变
}

// 例如: 调整搜索权重,更重视标签
export const SEARCH_CONFIG = {
  FUSE_WEIGHTS: {
    NAME: 1.5,
    TAGS: 2.5,  // 提高标签权重
  },
  // ...
}

// 例如: 修改默认主题为暗色
export const UI_CONFIG = {
  DEFAULT_THEME: 'dark' as const,
  // ...
}
```

**配置生效:**

修改配置后需要重新构建项目:

```bash
pnpm build
```

### 自定义主题

除了在 `settings.ts` 中配置默认主题,你也可以通过 CSS 自定义颜色变量:

编辑 `src/styles/global.css`:

```css
:root {
  --primary: #6366f1;      /* 主色调 */
  --secondary: #ec4899;    /* 次要色 */
  --accent: #8b5cf6;       /* 强调色 */
}
```

**可用主题:**

DaisyUI 提供 30+ 预设主题:
- `light`, `dark`, `cupcake`, `cyberpunk`
- `synthwave`, `retro`, `corporate`, `winter`
- 以及更多...

在 `settings.ts` 中修改 `UI_CONFIG.DEFAULT_THEME` 即可切换。

## 🌐 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/zhycn/batool)

1. 点击上方按钮
2. 导入你的 Git 仓库
3. Vercel 自动检测 Astro 并配置
4. 点击 **Deploy**

### Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 构建项目
pnpm build

# 部署
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. 在 `astro.config.mjs` 中配置 `base`：

```javascript
export default defineConfig({
  base: '/batool',  // 你的仓库名
  // ...
})
```

1. 构建并推送：

```bash
pnpm build
# 将 dist 目录内容推送到 gh-pages 分支
```

### Cloudflare Pages

```bash
# 使用 Wrangler CLI
npm install -g wrangler
wrangler pages publish dist --project-name=batool
```

### 其他平台

Batool 是纯静态站点，可部署到任何支持静态网站的平台：

- **AWS Amplify**
- **Google Firebase Hosting**
- **Azure Static Web Apps**
- **自托管服务器** (Nginx/Apache)

## 🔍 开发指南

### 本地开发

```bash
# 启动开发服务器(热重载)
pnpm dev

# 类型检查
pnpm astro check

# 构建生产版本
pnpm build

# 预览构建后的站点
pnpm preview
```

### 添加新页面

在 `src/pages/` 创建 `.astro` 文件：

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="页面标题">
  <main>
    <h1>新页面</h1>
  </main>
</Layout>
```

### 添加新组件

在 `src/components/` 创建 `.astro` 文件：

```astro
---
// src/components/MyComponent.astro
const { title } = Astro.props;
---

<div class="card">
  <h2>{title}</h2>
  <slot />  <!-- 插槽内容 -->
</div>
```

## ❓ 常见问题

### <strong>Q: 为什么选择 Batool 而非书签管理器？</strong>

**A:** Batool 专注于**快速检索**而非简单存储。通过模糊搜索，你可以一秒找到工具，无需翻阅多层文件夹。同时支持标签、分类等多维度筛选。

### <strong>Q: 是否支持多语言？</strong>

**A:** 当前界面为中文，但数据结构完全支持任何语言。搜索功能兼容英文、中文和拼音混合查询。

### <strong>Q: 如何备份我的工具数据？</strong>

**A:** 只需备份 `public/tools.json` 文件即可。所有工具数据都存储在这一个文件中，建议将其纳入版本控制。

### <strong>Q: 搜索速度如何？</strong>

**A:** Fuse.js 在客户端运行，即使有 1000+ 工具，搜索响应也在 10ms 以内。静态生成确保首屏加载极快。

### <strong>Q: 可以离线使用吗？</strong>

**A:** 可以。构建后的 `dist/` 目录是完全自包含的静态文件，可部署到内网服务器或本地文件系统。

## 🤝 贡献指南

我们欢迎各种形式的贡献！

### 报告问题

请在 [Issues](https://github.com/zhycn/batool/issues) 中报告 Bug 或提出功能请求。

### 提交代码

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

**提交规范：**

- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `style:` - 代码格式调整
- `refactor:` - 代码重构
- `perf:` - 性能优化
- `test:` - 测试相关
- `chore:` - 构建/工具链相关

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

---

<div align="center">

**[⬆ 返回顶部](#batool)**

Made with ❤️ by [zhycn](https://github.com/zhycn)

</div>
