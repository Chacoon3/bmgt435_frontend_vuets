import { endpoints } from "./apis";
import { httpGet, httpPost } from "./requests";
import { type User } from "./ORMTypes";
import { type AxiosResponse } from "axios";
import { ref } from "vue";

export function useSignIn() {
  const isLoading = ref<boolean>(false);
  function signIn(data: SignInForm, callback?: (resp: AxiosResponse) => void) {
    isLoading.value = true;
    httpPost<SignInForm>(endpoints.auth.signIn, data, (resp: AxiosResponse) => {
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
    httpPost<SignUpForm>(endpoints.auth.signUp, data, (resp: AxiosResponse) => {
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
  httpGet(endpoints.users.me, null, (resp: AxiosResponse) => {
    isCurrentUserLoading.value = false;
    if (resp.status === 200) {
      currentUser.value = resp.data;
    } else {
      currentUser.value = null;
    }
    callback?.(resp);
  });
}

function setCurrentUser(user: User) {
  currentUser.value = user;
}

export function useCurrentUser() {
  return { isCurrentUserLoading, currentUser, httpGetUser, setCurrentUser };
}

export function useSignOut() {
  const isLoading = ref<boolean>(false);
  function signOut(callback?: (resp: AxiosResponse) => void) {
    currentUser.value = null;
    isLoading.value = true;
    httpPost(endpoints.auth.signOut, null, (resp: AxiosResponse) => {
      isLoading.value = false;
      callback?.(resp);
    });
  }
  return { isLoading, signOut };
}

export function formatUserName(user: User) {
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  } else if (user.first_name) {
    return user.first_name;
  } else if (user.last_name) {
    return user.last_name;
  } else {
    throw new Error("User has no name");
  }
}

export type SignInForm = {
  did: string;
  password: string;
};

export type SignUpForm = SignInForm;
