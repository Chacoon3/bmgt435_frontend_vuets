import { cachedHttpGet,  httpPost, useCachedCumulatedGet, clearCacheByEndpoint } from "./requests";
import { endpoints } from "./apis";
import {ref, type Ref } from "vue";
import { type User, type Semester, type Group, type ValidatedResponse, type CaseConfig } from "./backendTypes";
import { type Feedback } from "./feedbackUtils";

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
              onSuccess(resp.data.data ?? "Import succeeded!");
            } else {
              onFail(resp.data.errorMsg ?? "Import failed!");
            }
          }
        );
      });
  }

  return { importUsers, isLoading,};
}

const userMgnt = useCachedCumulatedGet<User>(endpoints.manage.user.view, 10);
export function useUserMgnt() {
  return {
    ...userMgnt,
  };

}

  const isLoading = ref<boolean>(false);
  const semesterData = ref<Semester[]>([]) as Ref<Semester[]>;
  
  function getData() {
    if (isLoading.value === true) return;
  
    isLoading.value = true;
    cachedHttpGet(endpoints.manage.semester.all, null, (resp: ValidatedResponse<Semester[]>) => {
      isLoading.value = false;
      if (resp.data.data) {
        semesterData.value = resp.data.data;
      } else {
        semesterData.value = [];
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
          onFail(resp.data.errorMsg ?? "Failed to create semesters!");
        }
      }
    );
  }

  function resetSemesterData() {
    clearCacheByEndpoint(endpoints.manage.semester.all);
    semesterData.value = [];
  }

  function deleteSemesters(arr_semester_id: number[], onSuccess: (msg: string) => void, onFail: (msg: string) => void) {
    httpPost(
      endpoints.manage.semester.delete,
      { arr_semester_id: arr_semester_id },
      (resp: ValidatedResponse) => {
        resetSemesterData();
        if (resp.data.data) {
          onSuccess(resp.data.data);
        }
        else {
          onFail(resp.data.errorMsg ?? "Failed to delete semesters!");
        }
      }
    );
  }

export function useSemesterMgnt() {
  return {
    isLoading,
    semesterData,
    getData,
    create,
    deleteSemesters,
    resetSemesterData
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


const {isLoading: isLoadingConfig, data: configData, getData:getConfig, hasMore: hasMoreConfig, reset:resetConfigData } = useCachedCumulatedGet<CaseConfig<string[][]>>(endpoints.manage.foodDelivery.viewConfig, 10);
export function useCaseMgnt() {

  const isLoadingUpdate = ref<boolean>(false);
  function updateFoodDeliveryConfig(
    config: string[][],
    semester_id: number,
    onSuccess: (msg: string) => void,
    onFail: (msg: string) => void
  ) {
      httpPost(
        endpoints.manage.foodDelivery.updateConfig,
        {
          config:config,
          semester_id: semester_id,
        },
        (resp: ValidatedResponse) => {
        if (resp.data.data) {
          onSuccess(resp.data.data ?? "Update succeeded!");
        } else {
          onFail(resp.data.errorMsg ?? "Update failed!");
        }
      }
    );
  }

  return {
    isLoadingConfig,
    configData,
    getConfig,
    hasMoreConfig,
    resetConfigData,
    isLoadingUpdate,
    updateFoodDeliveryConfig,
  };
}

export type FoodDeliveryConfig = {
  center_map: Map<number, number>;
}