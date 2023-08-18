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
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};
