// 全局类型声明
declare global {
  interface Window {
    toggleTheme: () => void;
    __TOOLS__: import('../types/tool').Tool[];
    __UI_CONFIG__: typeof import('../types/settings').UI_CONFIG;
    __SEARCH_CONFIG__: typeof import('../types/settings').SEARCH_CONFIG;
  }
}

export {};
