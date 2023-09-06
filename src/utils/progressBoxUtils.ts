import { computed, ref } from "vue";

const itemStack = ref<ProgressBoxConfig[]>([]);

const getitemStack = computed(() => itemStack.value);

function show(config: ProgressBoxConfig) {
  itemStack.value.push(config);
}

function close() {
  itemStack.value.pop();
}

export function useProgressBox() {
  return {
    getitemStack,
    show,
    close
  };
}

export type ProgressBoxConfig = {
    title?: string;
    message?: string;
  };
  