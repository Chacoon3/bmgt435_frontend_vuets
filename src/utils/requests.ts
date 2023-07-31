import axios, { type AxiosError, type AxiosResponse } from "axios";
import { type Ref, type UnwrapRef, ref } from "vue";

const server = "http://127.0.0.1:8000/";
axios.defaults.baseURL = server;
axios.defaults.headers["Content-Type"] = "text/plain"; // for CORS
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = () => true;
axios.defaults.timeout = 5000;

function requestErrorHandler<TData>(error: any, endpoint: string, data: TData) {
  console.log("error at endpont" + endpoint);
  console.log("error data" + data);
  console.log(error);
  // should route to error page
  // throw new Error("request error handler not implemented");
}

export function httpGet(
  url: string,
  params: any | null,
  onCompleted: any
): void {
  axios
    .get(url, { params: params })
    .then(onCompleted)
    .catch((err: AxiosError) => requestErrorHandler(err, url, params));
}

export function httpPost<TData>(
  url: string,
  data: TData,
  onCompleted: any
): void {
  axios
    .post(url, data)
    .then(onCompleted)
    .catch((err: AxiosError) => requestErrorHandler(err, url, data));
}

export function httpPut<TData>(
  url: string,
  data: TData,
  onCompleted: any
): void {
  axios
    .put(url, data)
    .then(onCompleted)
    .catch((err: AxiosError) => requestErrorHandler(err, url, data));
}

export function httpDelete<TData>(
  url: string,
  params: TData | null,
  onCompleted: any
): void {
  axios
    .delete(url, { params: params })
    .then(onCompleted)
    .catch((err: AxiosError) => requestErrorHandler(err, url, params));
}

export function useGet<TData>(
  endpoint: string,
  params: any = null,
  onCompleted: any = null
): GetDataResult<TData> {
  const isLoading = ref<boolean>(true);
  const data = ref<TData | null>(null);
  function act(fetchParams: any = params) {
    isLoading.value = true;
    httpGet(endpoint, fetchParams, (resp: AxiosResponse) => {
      isLoading.value = false;
      data.value = resp.data;
      onCompleted?.(resp);
    });
  }
  act(params);

  return { isLoading, data: data, act: act };
}

export function usePost<TData>(
  endpoint: string,
  data: TData,
  onCompleted: any = null
): PostDataResult<TData> {
  const isLoading = ref<boolean>(true);
  const response = ref<AxiosResponse | null>(null);
  function act(data: TData) {
    isLoading.value = true;
    httpPost(endpoint, data, (resp: AxiosResponse) => {
      isLoading.value = false;
      response.value = resp;
      onCompleted?.(resp);
    });
  }
  act(data);

  return { isLoading, response: response, act: act };
}

export type GetDataResult<TData> = {
  isLoading: Ref<boolean>;
  data: Ref<UnwrapRef<TData> | null>;
  act: (params: any) => void;
};

export type PostDataResult<TData> = {
  isLoading: Ref<boolean>;
  response: Ref<AxiosResponse | null>;
  act: (data: TData) => void;
};

export default { httpGet, httpPost, httpPut, httpDelete, useGet };
