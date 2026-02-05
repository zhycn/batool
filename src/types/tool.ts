/**
 * 工具数据结构类型定义
 */
export interface Tool {
  /** 工具名称 */
  name: string;

  /** 工具描述 */
  description: string;

  /** 工具分类 */
  category: string;

  /** 工具链接 */
  url: string;

  /** 额外标签（可选） */
  tags?: string[];

  /** 图标（可选） */
  icon?: string;
}
