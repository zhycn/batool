// scripts/searchManager.ts
import type { Tool } from "../types/tool";
import type { SearchConfig } from "./types";

// 导入 Fuse.js（动态导入以减少初始加载时间）
let Fuse: any = null;
let fuseInstance: any = null;

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 初始化 Fuse.js
export async function initFuse(tools: Tool[], config: SearchConfig) {
  if (!Fuse) {
    const { default: FuseModule } = await import("fuse.js");
    Fuse = FuseModule;
  }

  fuseInstance = new Fuse(tools, {
    keys: [
      { name: "name", weight: config.FUSE_WEIGHTS.NAME },
      { name: "description", weight: config.FUSE_WEIGHTS.DESCRIPTION },
      { name: "category", weight: config.FUSE_WEIGHTS.CATEGORY },
      { name: "tags", weight: config.FUSE_WEIGHTS.TAGS },
    ],
    threshold: config.FUSE_THRESHOLD,
    includeScore: false,
    shouldSort: true,
    minMatchCharLength: config.MIN_MATCH_CHAR_LENGTH,
    ignoreLocation: config.IGNORE_LOCATION,
  });
}

// 执行搜索
export function search(query: string): Tool[] {
  if (!fuseInstance || !query.trim()) {
    return [];
  }
  const results = fuseInstance.search(query);
  return results.map((result: any) => result.item);
}

// 创建搜索事件处理器
export function createSearchHandler(
  callback: (query: string) => void,
  delay: number
) {
  return debounce((e: Event) => {
    const target = e.target as HTMLInputElement;
    callback(target.value);
  }, delay);
}
