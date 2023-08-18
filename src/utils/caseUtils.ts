import { ref } from "vue";
import {type  CaseRecord, type Case } from "./backendTypes";
import { httpGet, httpPost, useCachedCumulatedGet } from "./requests";
import { endpoints } from "./apis";
import { type AxiosResponse } from "axios";


export function useFoodcenter() {
  const isSubmitting = ref(false);
  const submissionResult = ref<FoodcenterResult | null>(null);

  function convertUserInput(
    userInput: FoodcenterCenterState[]
  ): CaseSubmissionParams<FoodcenterParams> {

    const centers: string[] = [];
    const policies: number[][] = [];
    for (let i = 0; i < userInput.length; i++) {
      const center = userInput[i];
      if (center.isOn) {
        centers.push((i + 1).toString());
        policies.push([center.smallS, center.bigS]);
      }
    }
    return { case_id: 1, case_params: { centers, policies }};
  }

  function tryGetSubmissionResult(
    caseRecordId: number,
    callback: (resp: AxiosResponse) => void
  ) {
    httpGet(
      endpoints.cases.caseRecords,
      { id: caseRecordId },
      (resp: AxiosResponse) => {
        if (resp.status === 200) {
          isSubmitting.value = false;
          submissionResult.value = resp.data;
          callback?.(resp);
        } else {
          setTimeout(() => {
            tryGetSubmissionResult(caseRecordId, callback);
          }, 10000);
        }
      }
    );
  }

  function submitCase(
    userInput: FoodcenterCenterState[],
    callback: (resp: AxiosResponse) => void
  ) {
    isSubmitting.value = true;

    httpPost<FoodcenterResult>(
      endpoints.cases.submit,
      convertUserInput(userInput),
      (resp: AxiosResponse) => {
        isSubmitting.value = false;
        if (resp.status == 200) {
          // const caseRecord: CaseRecord = resp.data;
          // tryGetSubmissionResult(caseRecord.id, callback);
        } else {
          //
        }
        callback?.(resp);
      }
    );
  }

  return { isSubmitting, submissionResult, submitCase };
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

export type CaseSubmissionParams<CaseParams> = {
  case_id: number;
  case_params: CaseParams;
};

export type FoodcenterResult = {};
