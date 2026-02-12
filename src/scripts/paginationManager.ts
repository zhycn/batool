// scripts/paginationManager.ts
import type { UIConfig } from "./types";

export class PaginationManager {
  private observer: IntersectionObserver | null = null;
  private callback: () => void;
  private uiConfig: UIConfig;

  constructor(callback: () => void, uiConfig: UIConfig) {
    this.callback = callback;
    this.uiConfig = uiConfig;
  }

  init(sentinel: HTMLElement) {
    if (this.observer) this.observer.disconnect();
    
    this.observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && this.callback(),
      {
        rootMargin: this.uiConfig.OBSERVER.ROOT_MARGIN,
        threshold: this.uiConfig.OBSERVER.THRESHOLD,
      }
    );
    this.observer.observe(sentinel);
  }

  destroy() {
    this.observer?.disconnect();
  }
}