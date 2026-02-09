/**
 * Batool 统一配置文件
 *
 * 所有可配置项集中管理,便于定制和维护
 * 修改此文件后需重新构建项目
 */

// ==================== 应用基础配置 ====================

export const APP_CONFIG = {
  /** 应用语言 */
  APP_LANG: 'zh-CN',

  /** 应用名称 */
  APP_NAME: 'Batool',

  /** 应用标题 */
  APP_TITLE: 'Batool – 开发者的极简工具入口',

  /** 应用描述 */
  APP_DESCRIPTION: 'Batool：开发者的极简工具入口。直达官网，零干扰。',

  /** 应用 URL */
  APP_URL: 'https://batool-delta.vercel.app/',

  /** 应用主题颜色 */
  THEME_COLOR: '#fafafa',

  /** 默认主题 (light | dark) */
  DEFAULT_THEME: 'light',

  /** 应用 GitHub 仓库地址 */
  GITHUB_REPO: 'https://github.com/zhycn/batool',

  /** 社交媒体标题 */
  SOCIAL_TITLE: 'Batool – 开发者的极简工具入口',

  /** 社交媒体描述 */
  SOCIAL_DESCRIPTION: 'Batool：开发者的极简工具入口。直达官网，零干扰。',
} as const;


// ==================== UI 配置 ====================

export const UI_CONFIG = {

  /** 每页显示的工具数量 */
  ITEMS_PER_PAGE: 20,

  /** 大数据量提示阈值 (超过此数量显示"建议搜索"提示) */
  LARGE_DATA_THRESHOLD: 200,

  /** 骨架屏显示数量 */
  SKELETON_COUNT: 5,

  /** 初始加载延迟 (毫秒,用于显示骨架屏) */
  INITIAL_LOAD_DELAY: 300,

  /** 快捷键配置 */
  SHORTCUTS: {
    /** 搜索快捷键 (metaKey | ctrlKey) + key */
    SEARCH: {
      key: 'k',
      requiresMeta: true,
    },

    /** 清除/失焦快捷键 */
    ESCAPE: 'Escape',
  } as const,

  /** 占位符文本 */
  PLACEHOLDERS: {
    SEARCH: '搜索工具...',
    EMPTY_STATE_MESSAGE: '没有找到匹配的工具',
    EMPTY_STATE_DESCRIPTION: '尝试调整搜索词或选择其他分类',
  } as const,

  /** 动画配置 */
  ANIMATION: {
    /** 列表项逐个显示延迟 (毫秒) */
    STAGGER_DELAY: 15,

    /** 列表项淡入时长 (毫秒) */
    FADE_IN_DURATION: 200,

    /** 列表项初始位移 (px) */
    INITIAL_TRANSLATE_Y: 6,
  } as const,

  /** Intersection Observer 配置 */
  OBSERVER: {
    /** 根边距 (提前触发加载的距离) */
    ROOT_MARGIN: '100px',

    /** 相交阈值 (0-1) */
    THRESHOLD: 0.1,
  } as const,
} as const;


/**
 * 获取完整的应用 URL
 */
export const getFullUrl = (path: string = ''): string => {
  const baseUrl = APP_CONFIG.APP_URL.replace(/\/$/, '');
  return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl;
};

// ==================== End ====================




// ==================== 搜索配置 ====================

export const SEARCH_CONFIG = {
  /** Fuse.js 搜索权重配置 */
  FUSE_WEIGHTS: {
    /** 名称权重 */
    NAME: 2,

    /** 描述权重 */
    DESCRIPTION: 1.5,

    /** 分类权重 */
    CATEGORY: 1,

    /** 标签权重 */
    TAGS: 1.2,
  } as const,

  /** Fuse.js 匹配阈值 (0-1, 越小越精确) */
  FUSE_THRESHOLD: 0.4,

  /** 最小匹配字符数 */
  MIN_MATCH_CHAR_LENGTH: 1,

  /** 是否忽略位置 (提升中文搜索效果) */
  IGNORE_LOCATION: true,

  /** 搜索输入防抖延迟 (毫秒) */
  DEBOUNCE_DELAY: 300,
} as const;



// ==================== 分类配置 ====================

export const CATEGORY_CONFIG = {
  /** "全部" 分类的显示名称 */
  ALL_CATEGORY_NAME: '全部',

  /** 未分类工具的分类名称 */
  UNCATEGORY_NAME: '未分类',

  /** 分类按钮激活状态样式类 */
  ACTIVE_CLASS: 'px-3.5 py-1.5 rounded-md bg-base-content text-base-100 text-xs font-medium hover:opacity-90 transition-opacity',

  /** 分类按钮非激活状态样式类 */
  INACTIVE_CLASS: 'px-3.5 py-1.5 rounded-md bg-base-content/5 text-base-content/70 text-xs font-medium hover:bg-base-content/8 hover:text-base-content transition-all border border-base-content/5',
} as const;

// ==================== 工具列表配置 ====================

export const TOOL_LIST_CONFIG = {
  /** 工具链接打开方式 */
  LINK_TARGET: '_blank' as const,

  /** 链接 rel 属性 (安全性和 SEO) */
  LINK_REL: 'noopener noreferrer' as const,

  /** 容器边框样式 */
  CONTAINER_BORDER: 'border-base-content/8',

  /** 容器背景样式 */
  CONTAINER_BG: 'bg-base-100/30 backdrop-blur-sm',

  /** 列表项边框样式 */
  ITEM_BORDER: 'border-base-content/5',

  /** 列表项 hover 背景样式 */
  ITEM_HOVER_BG: 'hover:bg-base-content/[0.02]',

  /** 列表项激活背景样式 */
  ITEM_ACTIVE_BG: 'active:bg-base-content/[0.04]',
} as const;

// ==================== 导出所有配置的汇总类型 ====================

export const SETTINGS = {
  APP: APP_CONFIG,
  SEARCH: SEARCH_CONFIG,
  UI: UI_CONFIG,
  CATEGORY: CATEGORY_CONFIG,
  TOOL_LIST: TOOL_LIST_CONFIG,
} as const;

// ==================== 类型导出 ====================

export type Settings = typeof SETTINGS;
export type AppConfig = typeof APP_CONFIG;
export type SearchConfig = typeof SEARCH_CONFIG;
export type UiConfig = typeof UI_CONFIG;
export type CategoryConfig = typeof CATEGORY_CONFIG;
export type ToolListConfig = typeof TOOL_LIST_CONFIG;

// ==================== 辅助函数 ====================

/**
 * 获取 Fuse.js 配置对象
 */
export function getFuseConfig() {
  return {
    keys: [
      { name: 'name', weight: SEARCH_CONFIG.FUSE_WEIGHTS.NAME },
      { name: 'description', weight: SEARCH_CONFIG.FUSE_WEIGHTS.DESCRIPTION },
      { name: 'category', weight: SEARCH_CONFIG.FUSE_WEIGHTS.CATEGORY },
      { name: 'tags', weight: SEARCH_CONFIG.FUSE_WEIGHTS.TAGS },
    ],
    threshold: SEARCH_CONFIG.FUSE_THRESHOLD,
    includeScore: false,
    shouldSort: true,
    minMatchCharLength: SEARCH_CONFIG.MIN_MATCH_CHAR_LENGTH,
    ignoreLocation: SEARCH_CONFIG.IGNORE_LOCATION,
  };
}
