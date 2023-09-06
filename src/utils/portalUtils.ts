import { ref } from "vue";

export type PortalViewState = "signIn" | "signUp" | "passwordReset";

const portalState = ref<PortalViewState>("signIn");

function setPortalState(newState: PortalViewState) {
  portalState.value = newState;
}

export function usePortalState() {
  return { portalState, setPortalState };
}
