import { ref } from "vue";
import { type CaseRecord, type Case } from "./backendTypes";
import { httpPost, useCachedCumulatedGet } from "./requests";
import { endpoints } from "./apis";
import { type AxiosResponse } from "axios";
import { useCumulatedCaseRecords } from "./caseRecordsUtils";

const { reset: clearCachedCaseRecords } = useCumulatedCaseRecords();
export function useFoodcenter() {
  const isSubmitting = ref(false);

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


  function submitCase(
    userInput: FoodcenterCenterState[],
    callback: (resp: AxiosResponse) => void
  ) {
    isSubmitting.value = true;

    httpPost<CaseSubmissionParams<FoodcenterParams>>(
      endpoints.cases.submit,
      convertUserInput(userInput),
      (resp: AxiosResponse) => {
        isSubmitting.value = false;
        clearCachedCaseRecords();
        callback?.(resp);
      }
    );
  }

  return { isSubmitting, submitCase };
}

export function useCumulatedCases() {
  return useCachedCumulatedGet<Case>(endpoints.cases.paginated);
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

export type FoodCenterSummary = {
  perf_metric: number;
  total_revenue: number;
  total_shortage_count: number;
  total_shortage_amount: number;
  total_holding_cost: number;
  total_fixed_cost: number;
}

export type SubmissionResult<TSummary> = {
  case_record_id: number;
  summary:TSummary;
};