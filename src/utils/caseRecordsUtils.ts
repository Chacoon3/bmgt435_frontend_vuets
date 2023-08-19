import { useCachedCumulatedGet, cachedHttpDownload } from "@/utils/requests";
import { endpoints } from "@/utils/apis";
import { type CaseRecord } from "@/utils/backendTypes";
import type { AxiosResponse } from "axios";
import { ref } from "vue";

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
    cachedHttpDownload(
      endpoints.caseRecords.get,
      { id: case_record_id },
      (resp: AxiosResponse) => {
        isDownloading.value = false;
        if (resp.status === 200) {
          //
          const blob = new Blob([resp.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
        }
        callback?.(resp);
      }
    );
  }

  return { isDownloading, downloadCaseRecord };
}
