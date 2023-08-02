import { useCurrentUser } from "./userUtils";
import { httpGet } from "./requests";
import { endpoints } from "./apis";
import { ref, watch } from "vue";
import { type Group } from "./dbModelTypes";

const { currentUser } = useCurrentUser();


const isCurrentUserGroupLoading = ref<boolean>(false);
const currentUserGroup = ref<Group | null>(null);

watch<number | null | undefined>(
  () => currentUser.value?.group_id,
  (newGroupId, oldGroupId) => {
    if (newGroupId !== undefined && newGroupId !== oldGroupId) {
      if (newGroupId === null) {
        currentUserGroup.value = null;
      } else {
        getGroupById(newGroupId);
      }
    }
  }
);

function getGroupById(groupId: number) {
  isCurrentUserGroupLoading.value = true;
  httpGet(endpoints.groups, { id: groupId }, (resp: any) => {
    if (resp.status === 200) {
      currentUserGroup.value = resp.data;
    } else {
      currentUserGroup.value = null;
    }
    isCurrentUserGroupLoading.value = false;
  });
}

export function useCurrentUserGroup() {
  return { isCurrentUserGroupLoading, currentUserGroup, getGroupById };
}

export function usePaginatedGroup() {
  const isGroupsLoading = ref<boolean>(false);
  const groups = ref<Group[]>([]);
  const totalGroups = ref<number>(0);
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(10);
  const totalPages = ref<number>(0);

  function getGroups(page: number, size: number) {
    isGroupsLoading.value = true;
    httpGet(endpoints.groups, { page: page, size: size }, (resp: any) => {
      groups.value = resp.data;
      totalGroups.value = resp.total;
      currentPage.value = resp.current_page;
      pageSize.value = resp.page_size;
      totalPages.value = resp.total_pages;
      isGroupsLoading.value = false;
    });
  }

  return {
    isGroupsLoading,
    groups,
    totalGroups,
    currentPage,
    pageSize,
    totalPages,
    getGroups,
  };
}
