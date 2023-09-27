import { cachedHttpGet, get, httpPost, useCachedCumulatedGet } from "./requests";
import { useCache } from "./cacheUtils";
import { endpoints } from "./apis";
import { ref, type Ref } from "vue";
import type { User, SystemStatus, ImportUserData, Semester } from "./backendTypes";
import type { AxiosResponse } from "axios";

const { clearCacheByEndpoint } = useCache();
export function useImportUsers() {
  const isLoading = ref<boolean>(false);

  function importUsers(csvUsers: File, semester_name: string, callback: any) {
    if (isLoading.value === true) return;

    isLoading.value = true;
    csvUsers
      .stream()
      .getReader()
      .read()
      .then((bytes) => {
        httpPost<ImportUserData>(
          endpoints.manage.user.import,
          { file_stream: bytes.value, meta: { semester_name: semester_name } },
          (resp: any) => {
            isLoading.value = false;
            if (resp.status === 200) {
              clearCacheByEndpoint(endpoints.manage.user.view);
            }
            callback?.(resp);
          }
        );
      });
  }

  return { importUsers, isLoading };
}

export function useCachedCumulatedUsers() {
  return useCachedCumulatedGet<User>(endpoints.manage.user.view, 10);
}

export function useSystemState() {
  const isLoadingSystemState = ref<boolean>(false);
  const systemState: Ref<SystemStatus | null> = ref<SystemStatus | null>(null);

  function getSystemState() {
    if (isLoadingSystemState.value === true) return;

    isLoadingSystemState.value = true;
    cachedHttpGet(
      endpoints.manage.system.state,
      null,
      (resp: AxiosResponse) => {
        isLoadingSystemState.value = false;
        if (resp.status === 200) {
          systemState.value = resp.data;
        } else {
          systemState.value = null;
        }
      }
    );
  }

  function setSystemState() {}

  function clearSystem() {}

  return { isLoadingSystemState, systemState, getSystemState };
}

const isLoadingSemesters = ref<boolean>(false);
const semesters = ref<string[]>([]);

function getSemesters() {
  if (isLoadingSemesters.value === true) return;

  isLoadingSemesters.value = true;
  cachedHttpGet(endpoints.manage.semester.all, null, (resp: AxiosResponse) => {
    isLoadingSemesters.value = false;
    if (resp.status === 200) {
      const data: Semester[] = resp.data;
      semesters.value = data.map((s) => s.name);
    } else {
      semesters.value = [];
    }
  });
}

function createSemester(year: string, season: string, callback: any) {
  httpPost(
    endpoints.manage.semester.create,
    { year: year, season: season },
    (resp: AxiosResponse) => {
      callback?.(resp);
    }
  );
}

getSemesters();
export function useSemester() {
  return {
    isLoadingSemesters,
    semesters,
    getSemesters,
    createSemester,
    clearCache: () => clearCacheByEndpoint(endpoints.manage.semester.all),
  };
}
