import { useCurrentUser } from "./userUtils";
import { httpGet } from "./requests";
import { endpoints } from "./apis";
import { ref, watch } from "vue";
import { type GroupInfo } from "./dbModelTypes";

const { currentUser } = useCurrentUser();
const isCurrentGroupInfoLoading = ref<boolean>(false);
const currentGroupInfo = ref<GroupInfo | null>(null);

watch<number | null | undefined>(
  () => currentUser.value?.group_id,
  (newGroupId, oldGroupId) => {
    if (newGroupId !== oldGroupId) {
      if (newGroupId === null || newGroupId === undefined) {
        currentGroupInfo.value = null;
      } else {
        getGroupById(newGroupId);
      }
    }
  }
);

function getGroupById(groupId: number) {
  isCurrentGroupInfoLoading.value = true;
  httpGet(endpoints.groups, { id: groupId }, (resp: any) => {
    if (resp.status === 200) {
      currentGroupInfo.value = resp.data;
    } else {
      currentGroupInfo.value = null;
    }
    isCurrentGroupInfoLoading.value = false;
  });
}

export function useCurrentGroupInfo() {
  return { isCurrentGroupInfoLoading: isCurrentGroupInfoLoading, currentGroupInfo: currentGroupInfo, getGroupById };
}

export function usePaginatedGroupInfo() {
  const isGroupInfoLoading = ref<boolean>(false);
  const groupInfo = ref<GroupInfo[]>([]);
  const totalGroups = ref<number>(0);
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(10);
  const totalPages = ref<number>(0);

  function getGroupsPaginated(page: number, size: number) {
    isGroupInfoLoading.value = true;
    httpGet(endpoints.groups, { page: page, size: size }, (resp: any) => {
      groupInfo.value = resp.data;
      totalGroups.value = resp.total;
      currentPage.value = resp.current_page;
      pageSize.value = resp.page_size;
      totalPages.value = resp.total_pages;
      isGroupInfoLoading.value = false;
    });
  }

  return {
    isGroupsLoading: isGroupInfoLoading,
    groupInfo: groupInfo,
    totalGroups,
    currentPage,
    pageSize,
    totalPages,
    getGroupsPaginated: getGroupsPaginated,
  };
}
