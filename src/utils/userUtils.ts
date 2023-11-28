import { endpoints } from "./apis";
import { httpPost, cachedHttpGet, clearCacheByEndpoint, clearAllCache } from "./requests";
import { type User, type ValidatedResponse } from "./backendTypes";
import { ref, watch } from "vue";

const isCurrentUserLoading = ref<boolean>(false);
const currentUser = ref<User | null>(null);

watch(currentUser, (newUser, oldUser) => {
  if (newUser !== oldUser) {
    clearAllCache();
  }
}, { immediate: true });

function getCurrentUser(onSuccess?: (resp: User) => void, onFail?: (resp: string) => void) {
  if (isCurrentUserLoading.value === true) {
    return;
  }

  isCurrentUserLoading.value = true;
  cachedHttpGet(endpoints.users.me, null, (resp: ValidatedResponse<User>) => {
    isCurrentUserLoading.value = false;
    if (resp.data.data) {
      currentUser.value = resp.data.data;
      onSuccess?.(currentUser.value as User);
      }
    else {
      currentUser.value = null;
      onFail?.(resp.data.errorMsg ?? "");
    }
  })
}

function isAdmin() {
  if (currentUser.value === null) {
    return false;
  } else {
    return currentUser.value.role === "admin";
  }
}

export function useCurrentUser() {
  return {
    isCurrentUserLoading,
    currentUser,
    getCurrentUser,
    isAdmin,
    clearUserCache: () => clearCacheByEndpoint(endpoints.users.me),
  };
}

const isSignInLoading = ref<boolean>(false);
function signIn(data: SignInForm, onSuccess?: (user: User) => void, onFail?: (errMsg: string) => void) {
  if (isSignInLoading.value === true) {
    return;
  }
  isSignInLoading.value = true;
  httpPost<SignInForm>(endpoints.auth.signIn, data, (resp: ValidatedResponse<User>) => {
      isSignInLoading.value = false;
      if (resp.data.data) {
        currentUser.value = resp.data.data;
        onSuccess?.(currentUser.value as User);
      } else {
        currentUser.value = null;
        onFail?.(resp.data.errorMsg ?? "");
      }
    });
  }

export function useSignIn() {
  return { isLoading: isSignInLoading, signIn };
}

const isSignUpLoading = ref<boolean>(false);
function signUp(data: SignUpForm, onSuccess?: (msg: string) => void, onFail?: (msg: string) => void) {
  if (isSignUpLoading.value === true) {
    return;
  }
  
  isSignUpLoading.value = true;
  httpPost<SignUpForm>(endpoints.auth.signUp, data, (resp: ValidatedResponse<string>) => {
    isSignUpLoading.value = false;
    if (resp.data.data) {
      onSuccess?.(resp.data.data);
    } else {
      onFail?.(resp.data.errorMsg ?? "");
    }
  });
}
export function useSignUp() {
  return { isLoading: isSignUpLoading, signUp };
}

const isSignOutLoading = ref<boolean>(false);
function signOut(callback?: (resp: ValidatedResponse) => void) {
  currentUser.value = null;
  isSignOutLoading.value = true;
  httpPost(endpoints.auth.signOut, null, (resp: ValidatedResponse) => {
    isSignOutLoading.value = false;
    callback?.(resp);
  });
}
export function useSignOut() {
  return { isLoading: isSignOutLoading, signOut };
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
