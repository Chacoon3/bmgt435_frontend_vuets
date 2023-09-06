import { httpPost, useCachedCumulatedGet } from "./requests";
import { useCache } from "./cacheUtils";
import { endpoints } from "./apis";
import { ref } from "vue";
import { type User } from "./backendTypes";


const { clearCacheByEndpoint } = useCache();
export function useImportUsers() {
  const isLoading = ref<boolean>(false);

  function importUsers(csvUsers: File, callback: any) {
    if (isLoading.value === true) return;

    isLoading.value = true;
    csvUsers
      .stream()
      .getReader()
      .read()
      .then((bytes) => {
        httpPost(endpoints.manage.importUsers, bytes.value, (resp: any) => {
          isLoading.value = false;
          if (resp.status === 200) {
            clearCacheByEndpoint(endpoints.manage.viewUsers)
          }
          callback?.(resp);
        });
      });
  }

  return { importUsers, isLoading };
}

export function useCachedCumulatedUsers() {
  return useCachedCumulatedGet<User>(endpoints.manage.viewUsers, 10);
}
