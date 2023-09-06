import { computed, ref } from "vue";

const modalStack = ref<ModalConfig[]>([]);

const getModalStack = computed(() => modalStack.value);

function showModal(config: ModalConfig) {
  modalStack.value.push(config);
}

function closeModal() {
  modalStack.value.pop();
}

export function useModal() {
  return {
    getModalStack,
    showModal,
    closeModal
  };
}

export type ModalConfig = {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  confirmText?: string;
  // on  cancel part is rendered only when the two feilds below are provided
  onCancel?: () => void;
  cancelText?: string;
};
