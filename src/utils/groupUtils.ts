import { useCurrentUser } from "./userUtils";
import { httpGet, httpPost, usePaginatedGet } from "./requests";
import { endpoints } from "./apis";
import { ref, watch } from "vue";
import { type Group } from "./ORMTypes";

const { currentUser } = useCurrentUser();
const isCurrentGroupLoading = ref<boolean>(false);
const currentGroup = ref<Group | null>(null);

function getGroupById(groupId: number, callback: any = null) {
  httpGet(endpoints.groups.groups, { id: groupId }, (resp: any) => {
    callback?.(resp);
  });
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
      isCurrentGroupLoading.value = true;
      getGroupById(newCurrenUser.group_id, (resp: any) => {
        if (resp.status === 200) {
          currentGroup.value = resp.data[0];
        } else {
          currentGroup.value = null;
        }
        isCurrentGroupLoading.value = false;
      });
    }
  },
  { immediate: true }
);

export function useCurrentGroup() {
  return { isCurrentGroupLoading, currentGroup };
}

export function usePaginatedGroups() {
  return usePaginatedGet<Group[]>(endpoints.groups.groupsPaginated);
}

export function useCreateGroup() {
  const isCreatingGroup = ref<boolean>(false);
  function createGroup(callback: any = null) {
    isCreatingGroup.value = true;
    httpPost(endpoints.groups.groups, null, (resp: any) => {
      isCreatingGroup.value = false;
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
      callback?.(resp);
    });
  }

  return { isLeavingGroup, leaveGroup };
}
