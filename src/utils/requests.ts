import useErrorUtil from "./errorUtils";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { type Ref, type UnwrapRef, ref } from "vue";


const server = "http://127.0.0.1:8000/";
axios.defaults.baseURL = server;
axios.defaults.headers["Content-Type"] = "text/plain"; // for CORS
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (status) => status < 1000;
axios.defaults.timeout = 7000;

const { setErrorContext } = useErrorUtil();

function triggerRequestError<T>(
  error: AxiosError,
  endpoint: string,
  dataOrParams: T
) {
  setErrorContext(
    error,
    ` A request has failed with error: ${error.message} and code ${error.code}`,
  );
  console.log(`Request to ${endpoint} failed with error: ${error.message}`);
  console.log(dataOrParams);
  console.log('logger ends -- -- -- -- -- -- -- --')
}

export function httpGet(
  url: string,
  params: any | null = null,
  onCompleted: any = null
): void {
    axios
      .get(url, { params: params })
      .then(onCompleted)
      .catch((err: AxiosError) => triggerRequestError(err, url, params));
  }

export function httpPost<TData>(
  url: string,
  data: TData,
  onCompleted: any
): void {
    axios
      .post(url, data)
      .then(onCompleted)
      .catch((err: AxiosError) => triggerRequestError(err, url, data));
}

export function httpPut<TData>(
  url: string,
  data: TData,
  onCompleted: any
): void {
    axios
      .put(url, data)
      .then(onCompleted)
      .catch((err: AxiosError) => triggerRequestError(err, url, data));
}

export function httpDelete<TData>(
  url: string,
  params: TData | null,
  onCompleted: any
): void {
    axios
      .delete(url, { params: params })
      .then(onCompleted)
      .catch((err: AxiosError) => triggerRequestError(err, url, params));
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

  return { isLoading, data: data, httpGetUser: act };
}

export function usePost<TPost>(
  endpoint: string,
  data: TPost,
  onCompleted: any = null
): PostDataResult<TPost> {
  const isLoading = ref<boolean>(true);
  const response = ref<AxiosResponse | null>(null);
  function act(data: TPost) {
    isLoading.value = true;
    httpPost(endpoint, data, (resp: AxiosResponse) => {
      isLoading.value = false;
      response.value = resp;
      onCompleted?.(resp);
    });
  }
  act(data);

  return { isLoading, response: response, httpPoster: act };
}

export type GetDataResult<TData> = {
  isLoading: Ref<boolean>;
  data: Ref<UnwrapRef<TData> | null>;
  httpGetUser: (params: any) => void;
};

export type PostDataResult<TPost> = {
  isLoading: Ref<boolean>;
  response: Ref<AxiosResponse | null>;
  httpPoster: (data: TPost) => void;
};