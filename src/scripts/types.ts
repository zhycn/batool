// scripts/types.ts
import type { Tool } from '../types/tool';

export interface UIConfig {
  DEFAULT_THEME: string;
  ITEMS_PER_PAGE: number;
  LARGE_DATA_THRESHOLD: number;
  INITIAL_LOAD_DELAY: number;
  ANIMATION: {
    FADE_IN_DURATION: number;
    STAGGER_DELAY: number;
    INITIAL_TRANSLATE_Y: number;
  };
  OBSERVER: {
    ROOT_MARGIN: string;
    THRESHOLD: number;
  };
  SHORTCUTS: {
    SEARCH: { key: string; requiresMeta: boolean };
    ESCAPE: string;
  };
}

export interface SearchConfig {
  DEBOUNCE_DELAY: number;
  FUSE_WEIGHTS: Record<string, number>;
  FUSE_THRESHOLD: number;
  MIN_MATCH_CHAR_LENGTH: number;
  IGNORE_LOCATION: boolean;
}

export interface AppState {
  allTools: Tool[];
  filteredTools: Tool[];
  displayedCount: number;
  isLoading: boolean;
  currentCategory: string;
  searchQuery: string;
}
