import { reactive } from "vue";

export function useCache<TData>() {
  const cacheDict = reactive<Map<string, Map<string, TData>>>(
    new Map<string, Map<string, TData>>()
  );

  function createKey(params?: any): string {
    return `${params ? `@${JSON.stringify(params)}` : ""}`;
  }

  function set(endpoint: string, param: any, data: TData): void {
    if (cacheDict.get(endpoint) == undefined) {
      cacheDict.set(endpoint, new Map<string, TData>());
    }
    cacheDict.get(endpoint)?.set(createKey(param), data);
  }

  function get(endpoint: string, param: any): TData | null {
    if (cacheDict.get(endpoint) == undefined) {
      return null;
    }
    return cacheDict.get(endpoint)?.get(createKey(param)) || null;
  }

  function clearCacheByEndpoint(endpoint: string): void {
    if (cacheDict.get(endpoint) == undefined) {
      return;
    }
    cacheDict.get(endpoint)?.clear();
  }

  function clearAllCache(): void {
    cacheDict.clear();
  }

  return { createKey, set, get, clearCacheByEndpoint, clearAllCache };
}
