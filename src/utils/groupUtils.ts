import { useCurrentUser } from "./userUtils";
import { httpGet, httpPost, useCachedPaginatedGet, useCachedCumulatedGet, clearCacheByEndpoint } from "./requests";
import { endpoints } from "./apis";
import { ref, watch } from "vue";
import { type Group } from "./ORMTypes";


const { currentUser } = useCurrentUser();
const isCurrentGroupLoading = ref<boolean>(false);
const currentGroup = ref<Group | null>(null);

function getCurrrentGroup() {
  if (currentUser.value && currentUser.value.group_id !== null) {
    isCurrentGroupLoading.value = true;
    httpGet(endpoints.groups.groups, {id: currentUser.value.group_id}, (resp: any) => {
      if (resp.status === 200) {
        currentGroup.value = resp.data[0];
      } else {
        currentGroup.value = null;
      }
      isCurrentGroupLoading.value = false;
    });
  }
  else {
    currentGroup.value = null;
    isCurrentGroupLoading.value = false;
  }
}

watch(
  currentUser,
  (newCurrenUser) => {
    if (
      newCurrenUser === null ||
      newCurrenUser === undefined ||
      newCurrenUser.group_id === null
    ) {
      currentGroup.value = null;
      isCurrentGroupLoading.value = false;
    } else {
      getCurrrentGroup();
    }
  },
  { immediate: true }
);

export function useCurrentGroup() {
  return { isCurrentGroupLoading, currentGroup, getCurrrentGroup };
}

export function useCachedPaginatedGroups() {
  const { isLoading, data, getData, clearCache} = useCachedPaginatedGet<Group[]>(endpoints.groups.groupsPaginated);
  watch(currentGroup, () => {
    clearCache();
    getData();
  });

  return { isLoading, data, getData };
}

export function useCachedCumulatedGroups() {
  const { isLoading, data, getData, clearCache } = useCachedCumulatedGet<Group>(endpoints.groups.groupsPaginated);
  watch(currentGroup, () => {
    clearCache();
    getData();
  });

  return { isLoading, data, getData };
}

export function useCreateGroup() {
  const isCreatingGroup = ref<boolean>(false);
  function createGroup(callback: any = null) {
    isCreatingGroup.value = true;
    httpPost(endpoints.groups.create, null, (resp: any) => {
      isCreatingGroup.value = false;
      if (resp.status === 201) {
        if (currentUser.value !== null) {
          currentUser.value.group_id = resp.data.id;
        }
        currentGroup.value = resp.data;
        clearCacheByEndpoint(endpoints.groups.groupsPaginated);
      } else {
        currentGroup.value = null;
      }
      callback?.(resp);
    });
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
        clearCacheByEndpoint(endpoints.groups.groupsPaginated);
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
        clearCacheByEndpoint(endpoints.groups.groupsPaginated);
      }
      callback?.(resp);
    });
  }

  return { isLeavingGroup, leaveGroup };
}
