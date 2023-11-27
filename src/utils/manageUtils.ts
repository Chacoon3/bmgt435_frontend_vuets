import { cachedHttpGet, httpPost, useCachedCumulatedGet, useCachedPaginatedGet } from "./requests";
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
          (resp: ValidatedResponse) => {
            isLoading.value = false;
            clearCacheByEndpoint(endpoints.manage.user.view);
            if (resp.data.data) {
              onSuccess(resp.data.data);
            } else {
              onFail(resp.data.errorMsg ?? "");
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
  
  function create(year: string, season: string, onSuccess: any, onFail: (msg: string) => void) {
    httpPost(
      endpoints.manage.semester.create,
      { year: year, season: season },
      (resp: ValidatedResponse) => {
        if (resp.data.data) {
          onSuccess(resp.data.data);
        }
        else {
          onFail(resp.data.errorMsg ?? "");
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


  const components = useCachedCumulatedGet<Group>(endpoints.manage.group.viewPaginated, 10);

  const isDeleting = ref<boolean>(false);
  function batchDeleteGroups(groupIds: number[], onSuccess: (msg: string) => void, onFail: (msg: string) => void) {
    if (isDeleting.value === true) {
      return;
    }

    isDeleting.value = true;
    const data = {
      arr_group_id: groupIds,
    };
    httpPost(
      endpoints.manage.group.delete,
      data,
      (resp: ValidatedResponse) => {
        isDeleting.value = false;
        if (resp.data.data) {
          components.reset();
          onSuccess?.(resp.data.data ?? "Batch deletion succeeded!");  
        }
        else {
          onFail?.(resp.data.errorMsg ?? "Batch deletion failed!");
        }
      }
    );
  }
  
export function useGroupMgnt() {  
  return {
    ...components,
    isDeleting,
    batchDeleteGroups,
  };
}

export function useFeedbackMgnt() {
  return useCachedCumulatedGet<Feedback>(endpoints.manage.feedback.paginated, 10);
}