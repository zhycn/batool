// scripts/searchManager.ts
import type { Tool } from '../types/tool';
import type { SearchConfig } from './types';
import { debounce } from '../utils/debounce';

// 导入 Fuse.js（动态导入以减少初始加载时间）
let Fuse: any = null;
let fuseInstance: any = null;

// 搜索结果缓存
const searchCache = new Map<string, Tool[]>();

// 初始化 Fuse.js
export async function initFuse(tools: Tool[], config: SearchConfig) {
  if (!Fuse) {
    const { default: FuseModule } = await import('fuse.js');
    Fuse = FuseModule;
  }

  fuseInstance = new Fuse(tools, {
    keys: [
      { name: 'name', weight: config.FUSE_WEIGHTS.NAME },
      { name: 'description', weight: config.FUSE_WEIGHTS.DESCRIPTION },
      { name: 'category', weight: config.FUSE_WEIGHTS.CATEGORY },
      { name: 'tags', weight: config.FUSE_WEIGHTS.TAGS },
    ],
    threshold: config.FUSE_THRESHOLD,
    includeScore: false,
    shouldSort: true,
    minMatchCharLength: config.MIN_MATCH_CHAR_LENGTH,
    ignoreLocation: config.IGNORE_LOCATION,
  });
  
  // 清空缓存
  searchCache.clear();
}

// 执行搜索
export function search(query: string): Tool[] {
  const trimmedQuery = query.trim();
  
  if (!fuseInstance || !trimmedQuery) {
    return [];
  }
  
  // 检查缓存
  if (searchCache.has(trimmedQuery)) {
    return searchCache.get(trimmedQuery)!;
  }
  
  // 执行搜索
  const results = fuseInstance.search(trimmedQuery);
  const searchResults = results.map((result: any) => result.item);
  
  // 缓存结果
  searchCache.set(trimmedQuery, searchResults);
  
  return searchResults;
}

// 清除搜索缓存
export function clearSearchCache() {
  searchCache.clear();
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
