// scripts/theme.ts
export function initTheme(defaultTheme: string) {
  const saved = localStorage.getItem('theme') || defaultTheme;
  document.documentElement.setAttribute('data-theme', saved);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';

  // 防闪烁技巧（保留你的实现）
  const style = document.createElement('style');
  style.innerHTML = `*,*::before,*::after{transition:none!important}`;
  document.head.appendChild(style);
  document.documentElement.offsetHeight; // 强制重排

  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  requestAnimationFrame(() =>
    requestAnimationFrame(() => document.head.removeChild(style))
  );
}
