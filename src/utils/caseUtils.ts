import { ref } from "vue";
import { type Case, type CaseSubmissionParams, type CaseSubmissionResult, type FoodcenterCenterState, type FoodcenterParams } from "./backendTypes";
import { httpPost, useCachedCumulatedGet } from "./requests";
import { endpoints } from "./apis";
import { type AxiosResponse } from "axios";
import { useCumulatedCaseRecords } from "./caseRecordsUtils";

const { reset: clearCachedCaseRecords } = useCumulatedCaseRecords();
export function useFoodcenter() {
  const isSubmitting = ref(false);

  function convertUserInput(userInput: FoodcenterCenterState[]): CaseSubmissionParams<FoodcenterParams> {

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
    onSuccess: (res: CaseSubmissionResult) => void,
    onFail: (errMsg: string) => void
  ) {
    if (isSubmitting.value === true) {
      return;
    }
    
    isSubmitting.value = true;
    httpPost<CaseSubmissionParams<FoodcenterParams>>(
      endpoints.cases.submit,
      convertUserInput(userInput),
      (resp: AxiosResponse) => {
        isSubmitting.value = false;
        clearCachedCaseRecords();
        if (resp.data.data) {
          onSuccess(resp.data.data);
        } else {
          onFail(resp.data.msg);
        }
      }
    );
  }

  return { isSubmitting, submitCase };
}

export function useCumulatedCases() {
  return useCachedCumulatedGet<Case>(endpoints.cases.paginated);
}