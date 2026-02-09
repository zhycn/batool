/**
 * 防抖函数 - 延迟执行函数直到指定时间后没有再次调用
 *
 * @param func - 要防抖的函数
 * @param wait - 等待时间(毫秒)
 * @returns 防抖后的函数
 *
 * @example
 * ```ts
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 300);
 *
 * debouncedSearch('hello');
 * debouncedSearch('hello world'); // 取消上一次调用
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
