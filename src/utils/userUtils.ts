import { endpoints } from "./apis";
import { httpGet, httpPost } from "./requests";
import { type User } from "./dbModelTypes";
import { type AxiosResponse } from "axios";
import { ref } from "vue";

export function useSignIn() {
  const isLoading = ref<boolean>(false);
  function signIn(data: SignInForm, callback?: (resp: AxiosResponse) => void) {
    isLoading.value = true;
    httpPost<SignInForm>(endpoints.signIn, data, (resp: AxiosResponse) => {
      isLoading.value = false;
      callback?.(resp);
    });
  }
  return { isLoading, signIn };
}

export function useSignUp() {
  const isLoading = ref<boolean>(false);
  function signUp(data: SignUpForm, callback?: (resp: AxiosResponse) => void) {
    isLoading.value = true;
    httpPost<SignUpForm>(endpoints.signUp, data, (resp: AxiosResponse) => {
      isLoading.value = false;
      callback?.(resp);
    });
  }
  return { isLoading, signUp };
}

const isCurrentUserLoading = ref<boolean>(false);
const currentUser = ref<User | null>(null);
function httpGetUser(callback?: (resp: AxiosResponse) => void) {
  isCurrentUserLoading.value = true;
  httpGet(endpoints.me, null, (resp: AxiosResponse) => {
    isCurrentUserLoading.value = false;
    currentUser.value = resp.data;
    callback?.(resp);
  });
}

function setCurrentUser(user: User) {
  currentUser.value = user;
}

export function useCurrentUser() {
  return { isCurrentUserLoading, currentUser, httpGetUser, setCurrentUser };
}

export type SignInForm = {
  did: string;
  password: string;
};

export type SignUpForm = SignInForm;
