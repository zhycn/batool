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
  APP_DESCRIPTION:
    'Batool 是一个为开发者设计的极简工具入口。直达官网，零干扰。',

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
  SOCIAL_DESCRIPTION: '一个为开发者设计的极简工具入口。直达官网，零干扰。',
} as const;

// ==================== UI 配置 ====================

export const UI_CONFIG = {
  /** 每页显示的工具数量 */
  ITEMS_PER_PAGE: 20,

  /** 大数据量提示阈值 (超过此数量显示"建议搜索"提示) */
  LARGE_DATA_THRESHOLD: 200,

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
  return path
    ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
    : baseUrl;
};

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
