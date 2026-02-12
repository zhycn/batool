// scripts/filterManager.ts
import type { Tool } from '../types/tool';

export function filterTools(
  tools: Tool[],
  category: string,
  searchedTools: Tool[] | null
): Tool[] {
  let result =
    category === 'all'
      ? [...tools]
      : tools.filter((t) => t.category === category);

  if (searchedTools !== null) {
    const searchSet = new Set(searchedTools.map((t) => t.name));
    result = result.filter((t) => searchSet.has(t.name));
  }

  return result;
}
