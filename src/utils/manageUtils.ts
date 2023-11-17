import { cachedHttpGet, httpPost, useCachedCumulatedGet } from "./requests";
import { useCache } from "./cacheUtils";
import { endpoints } from "./apis";
import {ref, type Ref } from "vue";
import { type User, type SystemStatus, type Semester, type Group, type ValidatedResponse } from "./backendTypes";
import type { AxiosResponse } from "axios";
import { type Feedback } from "./feedbackUtils";


const { clearCacheByEndpoint } = useCache();
export function useImportUsers() {
  const isLoading = ref<boolean>(false);

  function importUsers(csvUsers: File, semester_id: string, onSuccess: (resp: any) => void, onFail: (msg:string) => void) {
    if (isLoading.value === true) return;

    isLoading.value = true;
    csvUsers
      .stream()
      .getReader()
      .read()
      .then((bytes) => {
        httpPost(
          `${endpoints.manage.user.import}/semester/${semester_id}`,
          bytes.value,
          (resp: any) => {
            isLoading.value = false;
            clearCacheByEndpoint(endpoints.manage.user.view);
            if (resp.data.data) {
              onSuccess(resp.data.data);
            } else {
              onFail(resp.data.msg);
            }
          }
        );
      });
  }

  return { importUsers, isLoading,};
}

export function useUserMgnt() {
  return useCachedCumulatedGet<User>(endpoints.manage.user.view, 10);
}

export function useSystemMgnt() {
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

  return { isLoadingSystemState, systemState, getSystemState };
}

export function useSemesterMgnt() {

  const isLoading = ref<boolean>(false);
  const data = ref<Semester[]>([]);
  
  function getData() {
    if (isLoading.value === true) return;
  
    isLoading.value = true;
    cachedHttpGet(endpoints.manage.semester.all, null, (resp: ValidatedResponse<Semester[]>) => {
      isLoading.value = false;
      if (resp.data.data) {
        data.value = resp.data.data;
      } else {
        data.value = [];
      }
    });
  }
  
  function create(year: string, season: string, onSuccess: any, onFail: any) {
    httpPost(
      endpoints.manage.semester.create,
      { year: year, season: season },
      (resp: AxiosResponse) => {
        if (resp.data.data) {
          onSuccess(resp.data.data);
        }
        else {
          onFail(resp.data.msg);
        }
      }
    );
  }
  return {
    isLoading,
    data,
    getData,
    create,
    clearCache: () => clearCacheByEndpoint(endpoints.manage.semester.all),
  };
}

export function useGroupMgnt() {
  return useCachedCumulatedGet<Group>(endpoints.manage.group.viewPaginated);
}

export function useFeedbackMgnt() {
  return useCachedCumulatedGet<Feedback>(endpoints.manage.feedback.paginated);
}