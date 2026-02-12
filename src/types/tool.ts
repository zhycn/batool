/**
 * 工具数据结构类型定义
 */
export interface Tool {
  /** 工具名称（必填） */
  name: string;
  /** 工具链接（必填，应为完整有效的 HTTPS URL） */
  url: string;
  /** 工具描述（可选，用于 Tooltip 文字提示） */
  description?: string;
  /** 工具分类（可选，建议使用预定义类别） */
  category?: string;
  /** 额外标签（可选） */
  tags?: string[];
  /** 图标（可选，支持 URL 或图标库标识符如 'mdi:github'） */
  icon?: string;
}
