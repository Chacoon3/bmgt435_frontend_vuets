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
  if (currentUser.value && currentUser.value.group_id !== null) {
    isCurrentGroupLoading.value = true;
    httpGet(
      endpoints.groups.get,
      { id: currentUser.value.group_id },
      (resp: any) => {
        if (resp.status === 200) {
          currentGroup.value = resp.data;
        } else {
          currentGroup.value = null;
        }
        isCurrentGroupLoading.value = false;
      }
    );
  } else {
    currentGroup.value = null;
    isCurrentGroupLoading.value = false;
  }
}

export function useCurrentGroup() {
  return { isCurrentGroupLoading, currentGroup, getCurrrentGroup };
}

export function useCachedPaginatedGroups() {
  return useCachedPaginatedGet<Group[]>(endpoints.groups.paginated);
}

export function useCachedCumulatedGroups() {
  return useCachedCumulatedGet<Group>(endpoints.groups.paginated);
}

export function useCreateGroup() {
  const isCreatingGroup = ref<boolean>(false);

  function createGroup(
    semesterId: string | number,
    numGroups?: string | number,
    callback: any = null
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
        callback?.(resp);
      }
    );
  }

  return { isCreatingGroup, createGroup };
}

export function useJoinGroup() {
  const isJoiningGroup = ref<boolean>(false);
  function joinGroup(groupId: number, callback: any = null) {
    isJoiningGroup.value = true;
    httpPost(endpoints.groups.join, { group_id: groupId }, (resp: any) => {
      isJoiningGroup.value = false;
      if (resp.status === 200) {
        if (currentUser.value !== null) {
          currentUser.value.group_id = resp.data.id;
        }
        currentGroup.value = resp.data;
        clearCacheByEndpoint(endpoints.groups.paginated);
      }
      callback?.(resp);
    });
  }

  return { isJoiningGroup, joinGroup };
}

export function useLeaveGroup() {
  const isLeavingGroup = ref<boolean>(false);
  function leaveGroup(callback: any = null) {
    isLeavingGroup.value = true;
    httpPost(endpoints.groups.leave, null, (resp: any) => {
      isLeavingGroup.value = false;
      if (resp.status === 200) {
        if (currentUser.value !== null) {
          currentUser.value.group_id = null;
        }
        currentGroup.value = null;
        clearCacheByEndpoint(endpoints.groups.paginated);
      }
      callback?.(resp);
    });
  }

  return { isLeavingGroup, leaveGroup };
}
