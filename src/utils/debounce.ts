/**
 * 防抖函数 - 延迟执行函数直到指定时间后没有再次调用
 *
 * @param func - 要防抖的函数
 * @param wait - 等待时间(毫秒)，必须为正数
 * @param options - 配置选项
 * @param options.leading - 是否在开始时立即执行，默认为 false
 * @returns 防抖后的函数，包含 cancel 方法用于取消待执行的函数
 *
 * @example
 * ```ts
 * // 基本用法
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 300);
 *
 * debouncedSearch('hello');
 * debouncedSearch('hello world'); // 取消上一次调用
 *
 * // 立即执行模式
 * const debouncedSubmit = debounce((formData: FormData) => {
 *   console.log('Submitting:', formData);
 * }, 300, {
 *   leading: true
 * });
 *
 * // 取消防抖
 * debouncedSubmit.cancel();
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: {
    leading?: boolean;
  } = {},
): ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
  cancel: () => void;
} {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  if (typeof wait !== "number" || wait < 0) {
    throw new TypeError("Expected wait time to be a positive number");
  }

  const { leading = false } = options;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let result: ReturnType<T> | undefined;

  const debounced = function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    const context = this;
    const callNow = leading && !timeout;

    const later = () => {
      timeout = null;
      if (!leading) {
        result = func.apply(context, args);
      }
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
    }

    return result;
  };

  debounced.cancel = function (): void {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
