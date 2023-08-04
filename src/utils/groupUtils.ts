import { useCurrentUser } from "./userUtils";
import { httpGet, httpPost, usePaginatedGet } from "./requests";
import { endpoints } from "./apis";
import { ref, watch } from "vue";
import { type Group } from "./ORMTypes";

const { currentUser } = useCurrentUser();
const isCurrentGroupLoading = ref<boolean>(false);
const currentGroup = ref<Group>();

function getGroupById(groupId: number) {
  isCurrentGroupLoading.value = true;
  httpGet(endpoints.groups.groups, { id: groupId }, (resp: any) => {
    if (resp.status === 200) {
      currentGroup.value = resp.data;
    } else {
      currentGroup.value = undefined;
    }
    isCurrentGroupLoading.value = false;
  });
}

watch<number | null | undefined>(
  () => currentUser.value?.group_id,
  (newGroupId, oldGroupId) => {
    if (newGroupId !== oldGroupId) {
      if (newGroupId === null || newGroupId === undefined) {
        currentGroup.value = undefined;
      } else {
        getGroupById(newGroupId);
      }
    }
  }
);

export function useCurrentGroup() {
  return { isCurrentGroupLoading, currentGroup };
}

export function usePaginatedGroups() {
  return usePaginatedGet<Group[]>(endpoints.groups.groupsPaginated);
}

export function useCreateGroup() {
  const isCreatingGroup = ref<boolean>(false);
  function createGroup(groupName: string, callback: any = null) {
    isCreatingGroup.value = true;
    httpPost(endpoints.groups.groups, { name: groupName, }, (resp: any) => {
      isCreatingGroup.value = false;
      callback?.(resp);
    });
  }

  return { isCreatingGroup, createGroup };
}
