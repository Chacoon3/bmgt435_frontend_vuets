import { useCurrentUser } from "./userUtils";
import {
  httpGet,
  httpPost,
  useCachedPaginatedGet,
  useCachedCumulatedGet,
  clearCacheByEndpoint,
} from "./requests";
import { endpoints } from "./apis";
import { ref } from "vue";
import { type Group } from "./backendTypes";
import type { AxiosResponse } from "axios";

const { currentUser } = useCurrentUser();
const isCurrentGroupLoading = ref<boolean>(false);
const currentGroup = ref<Group | null>(null);

function getCurrrentGroup() {
  if (isCurrentGroupLoading.value === true) {
    return;
  }

  if (currentUser.value && currentUser.value.group_id !== null) {
    isCurrentGroupLoading.value = true;
    httpGet(
      endpoints.groups.get,
      { id: currentUser.value.group_id },
      (resp: AxiosResponse) => {
        isCurrentGroupLoading.value = false;
        if (resp.data.data) {
        currentGroup.value = resp.data.data;
        }
        else {
          currentGroup.value = null;
        }
      }
    );
  } else {
    isCurrentGroupLoading.value = false;
    currentGroup.value = null;
  }
}

export function useCurrentGroup() {
  return { isCurrentGroupLoading, currentGroup, getCurrrentGroup };
}

export function useCachedPaginatedGroups() {
  return useCachedPaginatedGet<Group>(endpoints.groups.paginated);
}

export function useCachedCumulatedGroups() {
  return useCachedCumulatedGet<Group>(endpoints.groups.paginated);
}

export function useCreateGroup() {
  const isCreatingGroup = ref<boolean>(false);

  function createGroup(
    semesterId: string | number,
    numGroups?: string | number,
    onSuccess?: (msg: string) => void,
    onFail?: (errMsg: string) => void
  ) {
    if (isCreatingGroup.value === true) return;
    
    isCreatingGroup.value = true;
    httpPost(
      endpoints.manage.group.create,
      {
        semester_id: semesterId,
        size: numGroups,
      },
      (resp: AxiosResponse) => {
        isCreatingGroup.value = false;
        if (resp.data.data) {
          onSuccess?.(resp.data.data);
        }
        else{
          onFail?.(resp.data.errMsg);
        }
      }
    );
  }

  return { isCreatingGroup, createGroup };
}

export function useJoinGroup() {
  const isJoiningGroup = ref<boolean>(false);
  function joinGroup(groupId: number, onSuccess?: (group: Group) => void, onFail?: (errMsg: string) => void) {
    if (isJoiningGroup.value === true) return;

    isJoiningGroup.value = true;
    httpPost(endpoints.groups.join, { group_id: groupId }, (resp: AxiosResponse) => {
      isJoiningGroup.value = false;
      clearCacheByEndpoint(endpoints.groups.paginated);
      if (resp.data.data) {
        currentGroup.value =resp.data.data;
        onSuccess?.(resp.data.data);
      }
      else {
        currentGroup.value = null;
        onFail?.(resp.data.errMsg);
      }
    });
  }

  return { isJoiningGroup, joinGroup };
}

export function useLeaveGroup() {
  const isLeavingGroup = ref<boolean>(false);
  function leaveGroup(callback: (msg:string) => void) {
    if (isLeavingGroup.value === true) return;
    
    isLeavingGroup.value = true;
    httpPost(endpoints.groups.leave, null, 
      (resp: AxiosResponse) => {
      isLeavingGroup.value = false;
      if (resp.data.data) {
        if (currentUser.value !== null) {
          currentUser.value.group_id = null;
        }
        currentGroup.value = null;
        clearCacheByEndpoint(endpoints.groups.paginated);
        callback?.(resp.data.data);
      }
      else{
        callback?.(resp.data.errMsg);
      }
    }
  )}

    return { isLeavingGroup, leaveGroup };
  }
