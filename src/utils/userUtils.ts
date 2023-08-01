import { endpoints } from "./apis";
import {
  useGet,
  usePost,
  type GetDataResult,
  type PostDataResult,
} from "./requests";
import { type User } from "../ormTypes";


export function signIn(
  data: SignInForm,
  onCompleted: any = null
): PostDataResult<SignInForm> {
  return usePost<SignInForm>(endpoints.signIn, data, onCompleted);
}

export function signUp(
  data: SignUpForm,
  onCompleted: any = null
): PostDataResult<SignUpForm> {
  return usePost<SignUpForm>(endpoints.signUp, data, onCompleted);
}


const {isLoading, data, httpGetter} = useGet<User>(endpoints.me, null)
export function useCurrentUser():GetDataResult<User> {
  httpGetter(null);
  return {isLoading, data, httpGetter}
}

export type SignInForm = {
  did: string;
  password: string;
};

export type SignUpForm = SignInForm;
