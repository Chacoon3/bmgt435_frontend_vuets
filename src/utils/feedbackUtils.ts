import { httpPost, useCachedCumulatedGet } from "./requests";
import { endpoints } from "./apis";
import { type AxiosResponse } from "axios";
import { computed, ref } from "vue";

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
    feedback: Feedback,
    callback: (resp: AxiosResponse) => void
  ) {
    if (isSubmitting.value === true) return;

    isSubmitting.value = true;
    httpPost<Feedback>(
      endpoints.feedback.post,
      feedback,
      (resp: AxiosResponse) => {
        isSubmitting.value = false;
        callback?.(resp);
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
