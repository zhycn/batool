# Batool

> **直达，即专注。**  
> 一个为行动者设计的工具入口。

Batool 不是一个工具大全，而是一个**极简、私有、极速**的工具启动面板。  
它不做推荐，不追热点，不堆功能——只确保你能在 **一秒内，从想法抵达行动**。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourname/batool)

## 🧠 为什么需要 Batool？

- 你收藏了上百个工具，却总在关键时刻找不到
- 你厌倦了充斥广告、过期链接的“AI 工具站”
- 你需要一个**干净、可靠、完全由你掌控**的入口

Batool 的答案很简单：  
**把工具列表交给你，把搜索速度交给 Fuse.js，把专注还给你自己。**

## ✨ 核心原则

- **极简**：无多余元素，只有工具名称、描述、分类与直达链接
- **极速**：静态生成 + 前端模糊搜索，毫秒响应
- **私有**：数据完全由 `tools.json` 驱动，不依赖任何后端
- **专注**：无推荐、无社交、无干扰 —— 只服务于“行动”本身

## 🛠️ 技术栈

- [Astro 5](https://astro.build/) – 内容优先的静态站点生成器
- [daisyUI](https://daisyui.com/) – 简洁优雅的 Tailwind 组件库
- [Fuse.js](https://fusejs.io/) – 轻量级模糊搜索，支持中文/拼音
- JSON 驱动 – 所有数据来自 `public/tools.json`

## 🚀 快速开始

```bash
git clone https://github.com/yourname/batool.git
cd batool
npm install
npm run dev
```

编辑 `public/tools.json`，填入你的工具列表：

```json
[
  {
    "name": "Ollama",
    "tagline": "Run LLMs locally",
    "description": "在本地运行大语言模型的开源框架",
    "category": "AI / 本地模型",
    "url": "https://ollama.com"
  }
]
```

然后访问 `http://localhost:4321`。

## 🌐 部署

一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourname/batool)

## 📜 收录标准（如果你公开维护）

我们只收录：
- **仍在活跃维护** 的工具（非 abandonware）
- **有明确用途与价值** 的工具（非营销页或玩具项目）
- **提供真实官网链接**（非 affiliate 或跳转页）

## 📎 定位说明

> Batool 不追求“最全”，只追求“值得”。  
> 因为真正的效率，始于专注。

---

MIT © [你的名字]
