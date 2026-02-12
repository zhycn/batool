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

    // DaisyUI 按钮样式 + 自定义样式
    a.className = 'btn btn-xl rounded-full flex items-center justify-between';

    // 首页动画效果
    if (isFirstPage) {
      a.style.opacity = '0';
      a.style.transform = `translateY(${uiConfig.ANIMATION.INITIAL_TRANSLATE_Y}px)`;
      a.style.transition = `opacity ${uiConfig.ANIMATION.FADE_IN_DURATION}ms ease-out ${index * uiConfig.ANIMATION.STAGGER_DELAY}ms, transform ${uiConfig.ANIMATION.FADE_IN_DURATION}ms ease-out ${index * uiConfig.ANIMATION.STAGGER_DELAY}ms`;
    }

    // 按钮内容：工具名称 + 分类标签 + 外部链接图标
    a.innerHTML = `
      <div class="flex-1 min-w-0 flex items-center gap-2 sm:gap-3">
        <span class="flex-shrink-0 text-base-content/30 hover:text-base-content/60 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </span>
        <span class="line-clamp-1 text-sm sm:text-base text-left font-medium text-base-content/90">
          ${tool.name}
        </span>
      </div>
      
      <div class="flex-1 min-w-0 flex items-center justify-end gap-3">
        <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary whitespace-nowrap border border-primary/10">
            ${tool.category || '未分类'}
          </span>
      </div>
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
