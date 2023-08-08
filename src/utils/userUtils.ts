import { endpoints } from "./apis";
import { httpPost, useCachedHttpGet } from "./requests";
import { type User } from "./ORMTypes";
import { type AxiosResponse } from "axios";
import { ref } from "vue";

const { cachedHttpGet, clearAll } = useCachedHttpGet();
const isCurrentUserLoading = ref<boolean>(false);
const currentUser = ref<User | null>(null);
function getCurrentUser(callback?: (resp: AxiosResponse) => void) {
  isCurrentUserLoading.value = true;
  cachedHttpGet(endpoints.users.me, null, (resp: AxiosResponse) => {
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
  return {
    isCurrentUserLoading,
    currentUser,
    getCurrentUser,
    setCurrentUser,
    clearUserCache: clearAll,
  };
}

export function useSignIn() {
  const isLoading = ref<boolean>(false);
  function signIn(data: SignInForm, callback?: (resp: AxiosResponse) => void) {
    isLoading.value = true;
    httpPost<SignInForm>(endpoints.auth.signIn, data, (resp: AxiosResponse) => {
      isLoading.value = false;
      setCurrentUser(resp.data);
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

export function formatUserName(user: User | null) {
  if (!user) {
    return "Anonymous";
  } else if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  } else if (user.first_name) {
    return user.first_name;
  } else if (user.last_name) {
    return user.last_name;
  } else {
    return "Anonymous";
  }
}

export type SignInForm = {
  did: string;
  password: string;
};

export type SignUpForm = SignInForm;
