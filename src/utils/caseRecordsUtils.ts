import {
  useCachedCumulatedGet,
  httpDownload,
  cachedHttpGet,
  clearCacheByEndpoint,
  type PaginatedData,
} from "@/utils/requests";
import { endpoints } from "@/utils/apis";
import { type CaseRecord } from "@/utils/backendTypes";
import type { AxiosResponse } from "axios";
import { reactive, ref } from "vue";

export function useCumulatedCaseRecords() {
  return useCachedCumulatedGet<CaseRecord>(
    endpoints.caseRecords.paginated,
    5,
    "create_time"
  );
}

export function useDownloadCaseRecord() {
  const isDownloading = ref<boolean>(false);

  function downloadCaseRecord(
    case_record_id: number,
    callback?: (resp: AxiosResponse) => void
  ) {
    if (isDownloading.value === true) return;

    isDownloading.value = true;
    httpDownload(
      endpoints.caseRecords.getFile,
      { id: case_record_id },
      (resp: AxiosResponse) => {
        isDownloading.value = false;
        if (resp.status === 200) {
          const blob = new Blob([resp.data], {
            type: "octet/stream",
          });
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.textContent = "Download";
          downloadLink.download  = "case_record.xlsx";
          document.body.appendChild(downloadLink);
          downloadLink.click();

          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(downloadLink.href);
        }
        callback?.(resp);
      }
    );
  }

  return { isDownloading, downloadCaseRecord };
}

export function useLeaderBoard(case_id: number) {
  const isLoading = ref<boolean>(false);
  const data = ref<CaseRecord[]>([]);
  const hasMore = ref<boolean>(true);
  const requestParams = {
    case_id: case_id, // hard coding
    page: 0,
    size: 10,
    asc: 0,
    order: "score",
  };

  function getData() {
    if (isLoading.value === true) {
      return;
    }
    isLoading.value = true;

    requestParams.page += 1;
    cachedHttpGet(
      endpoints.leaderboard.paginated,
      requestParams,
      (resp: AxiosResponse) => {
        isLoading.value = false;
        if (resp.status === 200) {
          const paginatedResp: PaginatedData<CaseRecord[]> = resp.data;
          data.value = data.value.concat(paginatedResp.data);
          hasMore.value = paginatedResp.page < paginatedResp.totalPage;
        }
      }
    );
  }

  return {
    isLoading,
    hasMore,
    data,
    getData,
    clearCache: () => clearCacheByEndpoint(endpoints.leaderboard.paginated),
  };
}
