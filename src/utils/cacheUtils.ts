import { reactive } from "vue";

export function useCache<TData>() {
  const cacheDict = reactive<Map<string, TData>>(new Map<string, TData>());
  function set(cacheId: string, data: TData):void {
    cacheDict.set(cacheId, data);
  }

  function get(key: string): TData | null {
    return cacheDict.get(key) ?? null;
  }

  function clear(key: string): void {
    cacheDict.delete(key);
  }

  function clearAll(): void {
    cacheDict.clear();
  }

  function createKey(endpoint: string, params?: any): string {
    return `${endpoint}${params ? `@${JSON.stringify(params)}` : ""}`;
  }

  return { createKey, set, get, clear, clearAll };
}
