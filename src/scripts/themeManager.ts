// scripts/themeManager.ts

/**
 * 初始化主题
 * @param defaultTheme - 默认主题
 */
export function initTheme(defaultTheme: string) {
  const saved = localStorage.getItem('theme') || defaultTheme;
  document.documentElement.setAttribute('data-theme', saved);
}

/**
 * 主题切换函数
 * 切换页面的明暗主题，并保存到 localStorage
 */
export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // 防闪烁技巧
  const style = document.createElement('style');
  style.innerHTML = `*,*::before,*::after{transition:none!important}`;
  document.head.appendChild(style);
  document.documentElement.offsetHeight; // 强制重排
  
  // 切换主题
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // 移除防闪烁样式
  requestAnimationFrame(() => requestAnimationFrame(() =>
    document.head.removeChild(style)
  ));
}

/**
 * 同步 checkbox 状态与当前主题
 * @param checkboxSelector - checkbox 元素的选择器
 */
export function syncCheckboxState(checkboxSelector: string = '.theme-controller') {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const checkbox = document.querySelector(
    checkboxSelector
  ) as HTMLInputElement;

  if (checkbox) {
    // dark 模式时 checkbox 应该被选中
    const shouldBeChecked = currentTheme === 'dark';
    if (checkbox.checked !== shouldBeChecked) {
      checkbox.checked = shouldBeChecked;
    }
  }
}

/**
 * 绑定主题切换事件
 * @param checkboxSelector - checkbox 元素的选择器
 */
export function bindThemeToggleEvents(checkboxSelector: string = '.theme-controller') {
  const checkbox = document.querySelector(checkboxSelector);
  if (checkbox) {
    checkbox.addEventListener('change', toggleTheme);
  }
}

/**
 * 初始化主题切换功能
 * @param checkboxSelector - checkbox 元素的选择器
 */
export function initThemeToggle(checkboxSelector: string = '.theme-controller') {
  // 页面加载时立即同步
  syncCheckboxState(checkboxSelector);
  
  // 绑定事件
  bindThemeToggleEvents(checkboxSelector);

  // DOM 加载完成后再次确认
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      syncCheckboxState(checkboxSelector);
      bindThemeToggleEvents(checkboxSelector);
    });
  }

  // 监听主题变化，保持 checkbox 状态同步
  const observer = new MutationObserver(() => {
    syncCheckboxState(checkboxSelector);
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
}

// 暴露 toggleTheme 函数到全局，供其他组件使用
if (typeof window !== 'undefined') {
  window.toggleTheme = toggleTheme;
}
