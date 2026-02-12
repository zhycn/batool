// scripts/renderManager.ts
import type { Tool } from '../types/tool';
import type { UIConfig } from './types';

export function renderToolButtons(
  container: HTMLElement,
  tools: Tool[],
  isFirstPage: boolean,
  uiConfig: UIConfig
) {
  // 清空容器（如果是第一页）
  if (isFirstPage) {
    container.innerHTML = '';
  }

  const fragment = document.createDocumentFragment();

  tools.forEach((tool, index) => {
    const a = document.createElement('a');
    a.href = tool.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    // DaisyUI 按钮样式 + 自定义样式（参考 Button.astro 设计，优化黑色主题效果）
    a.className = 'btn btn-lg flex min-h-12 w-full items-center justify-between rounded-full p-3 transition-colors duration-200 sm:p-4 bg-base-200 hover:bg-base-300';
    
    // 根据当前主题调整按钮样式
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      // 黑色主题下的特殊样式
      a.classList.add('bg-base-800', 'hover:bg-base-700');
      a.classList.remove('bg-base-200', 'hover:bg-base-300');
    }

    // 首页动画效果
    if (isFirstPage) {
      a.style.opacity = '0';
      a.style.transform = `translateY(${uiConfig.ANIMATION.INITIAL_TRANSLATE_Y}px)`;
      a.style.transition = `opacity ${uiConfig.ANIMATION.FADE_IN_DURATION}ms ease-out ${index * uiConfig.ANIMATION.STAGGER_DELAY}ms, transform ${uiConfig.ANIMATION.FADE_IN_DURATION}ms ease-out ${index * uiConfig.ANIMATION.STAGGER_DELAY}ms`;
    }

    // 按钮内容：工具名称 + 分类标签 + 外部链接图标（参考 Button.astro 设计）
    a.innerHTML = `
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <span class="text-base-content/50 hover:text-base-content/80 shrink-0 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 sm:size-6" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </span>
        <span class="text-base-content line-clamp-1 text-left text-sm font-medium sm:text-base">
          ${tool.name}
        </span>
      </div>
      
      <span class="bg-primary/10 text-primary border-primary/10 shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap">
        ${tool.category || '未分类'}
      </span>
    `;

    fragment.appendChild(a);
  });

  container.appendChild(fragment);

  // 触发动画
  if (isFirstPage) {
    requestAnimationFrame(() => {
      const items = container.querySelectorAll('#tools-list > a');
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
    });
  }
}

export function showEmptyState(
  emptyEl: HTMLElement,
  skeletonEl: HTMLElement,
  listEl: HTMLElement,
  loadingContainer: HTMLElement
) {
  skeletonEl.classList.add('hidden');
  listEl.classList.add('hidden');
  emptyEl.classList.remove('hidden');
  loadingContainer.classList.add('hidden');
}
