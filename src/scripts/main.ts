// scripts/main.ts
import { initTheme, toggleTheme } from "./theme";
import { initFuse, search, createSearchHandler } from "./searchManager";
import { filterTools } from "./filterManager";
import { renderToolButtons, showEmptyState } from "./renderManager";
import { PaginationManager } from "./paginationManager";
import type { AppState, UIConfig, SearchConfig } from "./types";
import type { Tool } from "../types/tool";

// 从全局变量获取数据（由 Astro 注入）
const toolsData = window.__TOOLS__ as Tool[];
const uiConfig = window.__UI_CONFIG__ as UIConfig;
const searchConfig = window.__SEARCH_CONFIG__ as SearchConfig;

// 应用状态
const state: AppState = {
  allTools: [],
  filteredTools: [],
  displayedCount: 0,
  isLoading: false,
  currentCategory: "all",
  searchQuery: "",
};

// DOM 元素缓存（在 init 中赋值）
let elements: Record<string, HTMLElement | null> = {};
let paginationManager: PaginationManager | null = null;

async function init() {
  // 等待 DOM 加载完成
  if (document.readyState === 'loading') {
    await new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }
  
  // 缓存 DOM
  elements = {
    searchInput: document.getElementById("search-input"),
    clearSearchBtn: document.getElementById("clear-search"),
    toolsList: document.getElementById("tools-list"),
    emptyState: document.getElementById("empty-state"),
    skeleton: document.getElementById("skeleton-state"),
    loadingContainer: document.getElementById("loading-container"),
    loadingSentinel: document.getElementById("loading-sentinel"),
    loadingSpinner: document.getElementById("loading-spinner"),
    endMessage: document.getElementById("end-message"),
    totalCount: document.getElementById("total-count"),
  };

  console.log('DOM elements cached:', elements);

  // 初始化
  initTheme(uiConfig.DEFAULT_THEME);
  await initFuse(toolsData, searchConfig);
  state.allTools = toolsData;
  
  // 初始化分页管理器
  paginationManager = new PaginationManager(loadNextPage, uiConfig);
  
  // 绑定事件
  bindEvents();
  
  // 首次加载
  resetLoading();
}

function bindEvents() {
  // 搜索
  elements.searchInput?.addEventListener(
    "input",
    createSearchHandler(handleSearch, searchConfig.DEBOUNCE_DELAY)
  );
  
  // 清除搜索
  elements.clearSearchBtn?.addEventListener("click", clearSearch);
  
  // 分类按钮
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", handleCategoryClick);
  });
  
  // 快捷键
  document.addEventListener("keydown", handleKeydown);
  
  // 主题切换（暴露到 window）
  (window as any).toggleTheme = toggleTheme;
}

// 处理搜索
function handleSearch(query: string) {
  state.searchQuery = query;
  
  // 控制清除按钮显示
  if (elements.clearSearchBtn) {
    if (query.length > 0) {
      elements.clearSearchBtn.classList.remove("hidden");
    } else {
      elements.clearSearchBtn.classList.add("hidden");
    }
  }
  
  resetLoading();
}

// 清除搜索
function clearSearch() {
  if (elements.searchInput) {
    elements.searchInput.value = "";
  }
  state.searchQuery = "";
  if (elements.clearSearchBtn) {
    elements.clearSearchBtn.classList.add("hidden");
  }
  elements.searchInput?.focus();
  resetLoading();
}

// 处理分类点击
function handleCategoryClick(event: Event) {
  const target = event.currentTarget as HTMLElement;
  const category = target.getAttribute("data-category") || "all";
  state.currentCategory = category;
  
  // 更新分类按钮状态
  updateCategoryButtons();
  resetLoading();
}

// 更新分类按钮状态
function updateCategoryButtons() {
  document.querySelectorAll(".category-btn").forEach(btn => {
    const category = btn.getAttribute("data-category");
    if (category === state.currentCategory) {
      btn.className = "category-btn px-4 py-2 rounded-full bg-primary text-primary-content text-sm font-medium hover:bg-primary/90 transition-all duration-200 whitespace-nowrap border border-transparent";
    } else {
      btn.className = "category-btn px-4 py-2 rounded-full bg-base-content/5 text-base-content/70 text-sm font-medium hover:bg-base-content/10 hover:text-base-content transition-all duration-200 border border-base-content/10 whitespace-nowrap";
    }
  });
}

// 处理快捷键
function handleKeydown(event: KeyboardEvent) {
  // 搜索快捷键 (⌘K / Ctrl+K)
  if (
    uiConfig.SHORTCUTS.SEARCH.requiresMeta &&
    (event.metaKey || event.ctrlKey) &&
    event.key === uiConfig.SHORTCUTS.SEARCH.key
  ) {
    event.preventDefault();
    elements.searchInput?.focus();
    elements.searchInput?.select();
  }
  // Escape 清除搜索
  if (
    event.key === uiConfig.SHORTCUTS.ESCAPE &&
    document.activeElement === elements.searchInput
  ) {
    clearSearch();
  }
}

// 重置加载状态
function resetLoading() {
  state.displayedCount = 0;
  state.isLoading = false;
  
  // 清空工具列表
  if (elements.toolsList) {
    elements.toolsList.innerHTML = "";
  }
  
  // 过滤数据
  const searchedTools = state.searchQuery ? search(state.searchQuery) : null;
  state.filteredTools = filterTools(state.allTools, state.currentCategory, searchedTools);
  
  // 重置分页管理器
  if (paginationManager && elements.loadingSentinel) {
    paginationManager.init(elements.loadingSentinel);
  }
  
  // 处理空状态
  console.log('Filtered tools length:', state.filteredTools.length);
  console.log('Empty state element:', elements.emptyState);
  console.log('Skeleton element:', elements.skeleton);
  console.log('Tools list element:', elements.toolsList);
  console.log('Loading container element:', elements.loadingContainer);
  
  if (state.filteredTools.length === 0) {
    console.log('Showing empty state...');
    // 显示空状态
    if (elements.emptyState) {
      elements.emptyState.classList.remove("hidden");
    }
    if (elements.skeleton) {
      elements.skeleton.classList.add("hidden");
    }
    if (elements.toolsList) {
      elements.toolsList.classList.add("hidden");
    }
    if (elements.loadingContainer) {
      elements.loadingContainer.classList.add("hidden");
    }
  } else {
    // 有数据时，显示骨架屏并延迟加载
    if (elements.skeleton) {
      elements.skeleton.classList.remove("hidden");
    }
    if (elements.toolsList) {
      elements.toolsList.classList.add("hidden");
    }
    if (elements.emptyState) {
      elements.emptyState.classList.add("hidden");
    }
    if (elements.loadingContainer) {
      elements.loadingContainer.classList.remove("hidden");
    }
    
    // 延迟加载，模拟网络请求
    setTimeout(() => {
      loadNextPage();
    }, uiConfig.INITIAL_LOAD_DELAY);
  }
}

// 加载下一页
function loadNextPage() {
  if (state.isLoading) {
    return;
  }
  
  if (state.displayedCount >= state.filteredTools.length) {
    showEndState();
    return;
  }
  
  state.isLoading = true;
  
  // 隐藏骨架屏
  if (elements.skeleton) {
    elements.skeleton.classList.add("hidden");
  }
  if (elements.toolsList) {
    elements.toolsList.classList.remove("hidden");
  }
  
  const start = state.displayedCount;
  const end = Math.min(
    start + uiConfig.ITEMS_PER_PAGE,
    state.filteredTools.length
  );
  const newItems = state.filteredTools.slice(start, end);
  
  if (elements.toolsList) {
    renderToolButtons(elements.toolsList, newItems, start === 0, uiConfig);
  }
  
  state.displayedCount = end;
  state.isLoading = false;
  
  if (state.displayedCount >= state.filteredTools.length) {
    showEndState();
    if (paginationManager) {
      paginationManager.destroy();
    }
  }
}

// 显示已加载全部状态
function showEndState() {
  if (elements.loadingSpinner) {
    elements.loadingSpinner.classList.add("hidden");
  }
  
  // 如果没有数据，不显示消息
  if (state.displayedCount === 0) {
    if (elements.endMessage) {
      elements.endMessage.classList.add("hidden");
    }
    return;
  }
  
  // 如果数据量≥阈值，提示用户搜索
  if (elements.endMessage && elements.totalCount) {
    elements.endMessage.classList.remove("hidden");
    
    if (state.displayedCount >= uiConfig.LARGE_DATA_THRESHOLD) {
      elements.totalCount.innerHTML = `数据较多，建议使用搜索功能精确定位`;
      elements.totalCount.parentElement!.style.cursor = "pointer";
      elements.totalCount.parentElement!.onclick = () => {
        elements.searchInput?.focus();
        elements.searchInput?.select();
      };
    } else {
      // 正常显示"已加载全部"消息
      elements.totalCount.textContent = `已加载全部 ${state.displayedCount} 条数据`;
      elements.totalCount.parentElement!.style.cursor = "default";
      elements.totalCount.parentElement!.onclick = null;
    }
  }
}

// 启动
init().catch(console.error);
