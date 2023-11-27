import { httpPost } from "./requests";
import { endpoints } from "./apis";
import { computed, ref } from "vue";
import type { ValidatedResponse } from "./backendTypes";

const isOpen = ref<boolean>(false);
const isFeedbackModalOpen = computed<boolean>(() => isOpen.value);

function openFeedbackModal() {
  isOpen.value = true;
}

function closeFeedbackModal() {
  isOpen.value = false;
}
export function useFeedbackModal() {
  return { isFeedbackModalOpen, openFeedbackModal, closeFeedbackModal };
}

export function useSubmitFeedback() {
  const isSubmitting = ref(false);

  function submitFeedback(
    content: string,
    onSuccess: (msg: string) => void,
    onFail: (errMsg: string) => void
  ) {
    if (isSubmitting.value === true) return;

    isSubmitting.value = true;
    httpPost(
      endpoints.feedback.post,
      {content: content},
      (resp: ValidatedResponse) => {
        isSubmitting.value = false;
        if (resp.data.data) {
          onSuccess(resp.data.data ?? "Thank you for submitting your feedback!");
        } else {
          onFail(resp.data.errorMsg ?? "Failed to submit feedback. Please try again later.");
        }
      }
    );
  }
  return { isSubmitting, submitFeedback };
}

export type Feedback = {
  id: number;
  user_id: number;
  create_time: string;
  user_name: string;
  content: string;
};
