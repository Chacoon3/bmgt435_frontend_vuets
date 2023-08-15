import { ref } from "vue";
import { type Case } from "./ORMTypes";
import { httpGet, httpPost, useCachedCumulatedGet } from "./requests";
import { endpoints } from "./apis";
import { type AxiosResponse } from "axios";

export function useFoodcenter() {
  const isLoading = ref(false);
  const result = ref<FoodcenterResult | null>(null);

  function convertUserInput(
    userInput: FoodcenterCenterState[]
  ): FoodcenterParams {
    const centers: string[] = [];
    const policies: number[][] = [];
    for (let i = 0; i < userInput.length; i++) {
      const center = userInput[i];
      if (center.isOn) {
        centers.push((i + 1).toString());
        policies.push([center.smallS, center.bigS]);
      }
    }
    return { centers, policies };
  }

  function tryGetResult(
    caseRecordId: number,
    callback: (resp: AxiosResponse) => void
  ) {
    httpGet(
      endpoints.cases.caseRecords,
      { id: caseRecordId },
      (resp: AxiosResponse) => {
        if (resp.status === 200) {
          isLoading.value = false;
          result.value = resp.data;
          callback?.(resp);
        } else {
          setTimeout(() => {
            tryGetResult(caseRecordId, callback);
          }, 1000);
        }
      }
    );
  }

  function submitCase(
    userInput: FoodcenterCenterState[],
    callback: (resp: AxiosResponse) => void
  ) {
    isLoading.value = true;

    httpPost<FoodcenterResult>(
      endpoints.cases.submit,
      convertUserInput(userInput),
      (resp: AxiosResponse) => {
        if (resp.status == 200) {
          tryGetResult(resp.data.case_id, callback);
        } else {
          isLoading.value = false;
          callback?.(resp);
        }
      }
    );
  }

  function runCase(
    userInput: FoodcenterCenterState[],
    callback: (resp: AxiosResponse) => void
  ) {
    httpPost<FoodcenterResult>(
      endpoints.cases.run,
      convertUserInput(userInput),
      (resp: AxiosResponse) => {
        isLoading.value = false;
        callback?.(resp);
      }
    );
  }

  return { isLoading, result, runCase, submitCase };
}

export function useCumulatedCases() {
  return useCachedCumulatedGet<Case>(endpoints.cases.casesPaginated);
}

export type FoodcenterParams = {
  centers: string[];
  policies: number[][];
};

export type FoodcenterCenterState = {
  isOn: boolean;
  name: string;
  smallS: number;
  bigS: number;
};

export type RunCaseParams<CaseParams> = {
  case_id: number;
  gruop_id: number;
  caseParams: CaseParams;
};

export type FoodcenterResult = {};
