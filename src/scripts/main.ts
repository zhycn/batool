// scripts/main.ts
import { initTheme, toggleTheme } from './themeManager';
import { initFuse, search, createSearchHandler } from './searchManager';
import { filterTools } from './filterManager';
import { renderToolButtons, showEmptyState } from './renderManager';
import { PaginationManager } from './paginationManager';
import type { AppState, UIConfig, SearchConfig } from './types';
import type { Tool } from '../types/tool';

/**
 * 应用管理器类
 * 封装应用状态和逻辑，提高代码的可维护性和可测试性
 */
class AppManager {
  // 应用状态
  private state: AppState;
  // DOM 元素缓存
  private elements: Record<string, HTMLElement | null>;
  // 分页管理器
  private paginationManager: PaginationManager | null;
  // 配置
  private uiConfig: UIConfig;
  private searchConfig: SearchConfig;
  private toolsData: Tool[];

  constructor(tools: Tool[], uiConfig: UIConfig, searchConfig: SearchConfig) {
    this.toolsData = tools;
    this.uiConfig = uiConfig;
    this.searchConfig = searchConfig;
    
    // 初始化状态
    this.state = {
      allTools: [],
      filteredTools: [],
      displayedCount: 0,
      isLoading: false,
      currentCategory: 'all',
      searchQuery: '',
    };
    
    this.elements = {};
    this.paginationManager = null;
  }

  /**
   * 初始化应用
   */
  async init() {
    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
      await new Promise((resolve) => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    // 缓存 DOM
    this.cacheDOM();

    // 初始化
    initTheme(this.uiConfig.DEFAULT_THEME);
    await initFuse(this.toolsData, this.searchConfig);
    this.state.allTools = this.toolsData;

    // 初始化分页管理器
    this.paginationManager = new PaginationManager(() => this.loadNextPage(), this.uiConfig);

    // 绑定事件
    this.bindEvents();

    // 首次加载
    this.resetLoading();
  }

  /**
   * 缓存 DOM 元素
   */
  private cacheDOM() {
    this.elements = {
      searchInput: document.getElementById('search-input'),
      clearSearchBtn: document.getElementById('clear-search'),
      toolsList: document.getElementById('tools-list'),
      emptyState: document.getElementById('empty-state'),
      skeleton: document.getElementById('skeleton-state'),
      loadingContainer: document.getElementById('loading-container'),
      loadingSentinel: document.getElementById('loading-sentinel'),
      loadingSpinner: document.getElementById('loading-spinner'),
      endMessage: document.getElementById('end-message'),
      totalCount: document.getElementById('total-count'),
    };
  }

  /**
   * 绑定事件
   */
  private bindEvents() {
    // 搜索
    this.elements.searchInput?.addEventListener(
      'input',
      createSearchHandler((query) => this.handleSearch(query), this.searchConfig.DEBOUNCE_DELAY)
    );

    // 清除搜索
    this.elements.clearSearchBtn?.addEventListener('click', () => this.clearSearch());

    // 分类按钮 - 使用事件委托减少事件监听器
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const categoryBtn = target.closest('.category-btn') as HTMLElement | null;
      if (categoryBtn) {
        this.handleCategoryClick(categoryBtn);
      }
    });

    // 快捷键
    document.addEventListener('keydown', (event) => this.handleKeydown(event));

    // 主题切换（暴露到 window）
    (window as any).toggleTheme = toggleTheme;
  }

  /**
   * 处理搜索
   */
  private handleSearch(query: string) {
    this.state.searchQuery = query;

    // 控制清除按钮显示
    if (this.elements.clearSearchBtn) {
      if (query.length > 0) {
        this.elements.clearSearchBtn.classList.remove('hidden');
      } else {
        this.elements.clearSearchBtn.classList.add('hidden');
      }
    }

    this.resetLoading();
  }

  /**
   * 清除搜索
   */
  private clearSearch() {
    if (this.elements.searchInput) {
      this.elements.searchInput.value = '';
    }
    this.state.searchQuery = '';
    if (this.elements.clearSearchBtn) {
      this.elements.clearSearchBtn.classList.add('hidden');
    }
    this.elements.searchInput?.focus();
    this.resetLoading();
  }

  /**
   * 处理分类点击
   */
  private handleCategoryClick(categoryBtn: HTMLElement) {
    const category = categoryBtn.getAttribute('data-category') || 'all';
    this.state.currentCategory = category;

    // 更新分类按钮状态
    this.updateCategoryButtons();
    this.resetLoading();
  }

  /**
   * 更新分类按钮状态
   */
  private updateCategoryButtons() {
    document.querySelectorAll('.category-btn').forEach((btn) => {
      const category = btn.getAttribute('data-category');
      if (category === this.state.currentCategory) {
        btn.className =
          'category-btn px-4 py-2 rounded-full bg-primary text-primary-content text-sm font-medium hover:bg-primary/90 transition-all duration-200 whitespace-nowrap border border-transparent';
      } else {
        btn.className =
          'category-btn px-4 py-2 rounded-full bg-base-content/5 text-base-content/70 text-sm font-medium hover:bg-base-content/10 hover:text-base-content transition-all duration-200 border border-base-content/10 whitespace-nowrap';
      }
    });
  }

  /**
   * 处理快捷键
   */
  private handleKeydown(event: KeyboardEvent) {
    // 搜索快捷键 (⌘K / Ctrl+K)
    if (
      this.uiConfig.SHORTCUTS.SEARCH.requiresMeta &&
      (event.metaKey || event.ctrlKey) &&
      event.key === this.uiConfig.SHORTCUTS.SEARCH.key
    ) {
      event.preventDefault();
      this.elements.searchInput?.focus();
      this.elements.searchInput?.select();
    }
    // Escape 清除搜索
    if (
      event.key === this.uiConfig.SHORTCUTS.ESCAPE &&
      document.activeElement === this.elements.searchInput
    ) {
      this.clearSearch();
    }
  }

  /**
   * 重置加载状态
   */
  private resetLoading() {
    this.state.displayedCount = 0;
    this.state.isLoading = false;

    // 清空工具列表
    if (this.elements.toolsList) {
      this.elements.toolsList.innerHTML = '';
    }

    // 过滤数据
    const searchedTools = this.state.searchQuery ? search(this.state.searchQuery) : null;
    this.state.filteredTools = filterTools(
      this.state.allTools,
      this.state.currentCategory,
      searchedTools
    );

    // 重置分页管理器
    if (this.paginationManager && this.elements.loadingSentinel) {
      this.paginationManager.init(this.elements.loadingSentinel);
    }

    // 处理空状态
    this.handleEmptyState();
  }

  /**
   * 处理空状态
   */
  private handleEmptyState() {
    if (this.state.filteredTools.length === 0) {
      // 显示空状态
      if (this.elements.emptyState) {
        this.elements.emptyState.classList.remove('hidden');
      }
      if (this.elements.skeleton) {
        this.elements.skeleton.classList.add('hidden');
      }
      if (this.elements.toolsList) {
        this.elements.toolsList.classList.add('hidden');
      }
      if (this.elements.loadingContainer) {
        this.elements.loadingContainer.classList.add('hidden');
      }
    } else {
      // 有数据时，显示骨架屏并延迟加载
      if (this.elements.skeleton) {
        this.elements.skeleton.classList.remove('hidden');
      }
      if (this.elements.toolsList) {
        this.elements.toolsList.classList.add('hidden');
      }
      if (this.elements.emptyState) {
        this.elements.emptyState.classList.add('hidden');
      }
      if (this.elements.loadingContainer) {
        this.elements.loadingContainer.classList.remove('hidden');
      }

      // 延迟加载，模拟网络请求
      setTimeout(() => {
        this.loadNextPage();
      }, this.uiConfig.INITIAL_LOAD_DELAY);
    }
  }

  /**
   * 加载下一页
   */
  private loadNextPage() {
    if (this.state.isLoading) {
      return;
    }

    if (this.state.displayedCount >= this.state.filteredTools.length) {
      this.showEndState();
      return;
    }

    this.state.isLoading = true;

    // 隐藏骨架屏
    if (this.elements.skeleton) {
      this.elements.skeleton.classList.add('hidden');
    }
    if (this.elements.toolsList) {
      this.elements.toolsList.classList.remove('hidden');
    }

    const start = this.state.displayedCount;
    const end = Math.min(
      start + this.uiConfig.ITEMS_PER_PAGE,
      this.state.filteredTools.length
    );
    const newItems = this.state.filteredTools.slice(start, end);

    if (this.elements.toolsList) {
      renderToolButtons(this.elements.toolsList, newItems, start === 0, this.uiConfig);
    }

    this.state.displayedCount = end;
    this.state.isLoading = false;

    if (this.state.displayedCount >= this.state.filteredTools.length) {
      this.showEndState();
      if (this.paginationManager) {
        this.paginationManager.destroy();
      }
    }
  }

  /**
   * 显示已加载全部状态
   */
  private showEndState() {
    if (this.elements.loadingSpinner) {
      this.elements.loadingSpinner.classList.add('hidden');
    }

    // 如果没有数据，不显示消息
    if (this.state.displayedCount === 0) {
      if (this.elements.endMessage) {
        this.elements.endMessage.classList.add('hidden');
      }
      return;
    }

    // 如果数据量≥阈值，提示用户搜索
    if (this.elements.endMessage && this.elements.totalCount) {
      this.elements.endMessage.classList.remove('hidden');

      if (this.state.displayedCount >= this.uiConfig.LARGE_DATA_THRESHOLD) {
        this.elements.totalCount.innerHTML = `数据较多，建议使用搜索功能精确定位`;
        this.elements.totalCount.parentElement!.style.cursor = 'pointer';
        this.elements.totalCount.parentElement!.onclick = () => {
          this.elements.searchInput?.focus();
          this.elements.searchInput?.select();
        };
      } else {
        // 正常显示"已加载全部"消息
        this.elements.totalCount.textContent = `已加载全部 ${this.state.displayedCount} 条数据`;
        this.elements.totalCount.parentElement!.style.cursor = 'default';
        this.elements.totalCount.parentElement!.onclick = null;
      }
    }
  }
}

/**
 * 从全局变量初始化应用
 * @returns AppManager实例
 */
export function initAppFromGlobal(): AppManager {
  // 从全局变量获取数据（由 Astro 注入）
  const toolsData = (window as any).__TOOLS__ as Tool[];
  const uiConfig = (window as any).__UI_CONFIG__ as UIConfig;
  const searchConfig = (window as any).__SEARCH_CONFIG__ as SearchConfig;

  // 初始化应用
  const appManager = new AppManager(toolsData, uiConfig, searchConfig);
  appManager.init().catch(console.error);
  
  return appManager;
}

// 自动初始化应用
if (typeof window !== 'undefined' && (window as any).__TOOLS__) {
  initAppFromGlobal();
}
