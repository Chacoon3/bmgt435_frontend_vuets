import useErrorUtil from "./errorUtils";
import axios, { type AxiosResponse } from "axios";
import { type Ref, type UnwrapRef, ref, watch, reactive } from "vue";
import { useCache } from "./cacheUtils";

const server = "http://127.0.0.1:8000/";
axios.defaults.headers["Content-Type"] = "text/plain";
axios.defaults.baseURL = server;
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (status) => status < 500;
axios.defaults.timeout = 7000;

const { setErrorContext } = useErrorUtil();

function triggerRequestError<T>(
  error: Error,
  endpoint: string,
  dataOrParams: T
) {
  setErrorContext(error, ` A request has failed with error: ${error.message}`);
  console.log(
    `Request to ${endpoint} failed with error: ${error.message ?? error}`
  );
  console.log(dataOrParams);
  console.log("logger ends -- -- -- -- -- -- -- --");
}

export function httpGet(url: string, params: any, onCompleted: any): void {
  try {
    axios
      .get(url, { params: params })
      .then(onCompleted)
      .catch((err: Error) => triggerRequestError(err, url, params));
  } catch (err: any) {
    triggerRequestError(err, url, params);
  }
}

export function useCachedHttpGet() {
  const { get, set, createKey, clear, clearAll } = useCache<AxiosResponse>();

  function cachedHttpGet(url: string, params: any, onCompleted: any): void {
    try {
      const key = createKey(url, params);
      const cachedResp = get(key);
      if (cachedResp) {
        onCompleted(cachedResp);
      } else {
        axios
          .get(url, { params: params })
          .then((resp) => {
            set(key, resp);
            onCompleted?.(resp);
          })
          .catch((err: Error) => triggerRequestError(err, url, params));
      }
    } catch (err: any) {
      triggerRequestError(err, url, params);
    }
  }

  return { cachedHttpGet, clearCacheByKey: clear, clearAll: clearAll };
}

export function httpPost<TData>(
  url: string,
  data: TData,
  onCompleted: any
): void {
  try {
    axios
      .post(url, data)
      .then(onCompleted)
      .catch((err: Error) => triggerRequestError(err, url, data));
  } catch (err: any) {
    triggerRequestError(err, url, data);
  }
}

export function httpPut<TData>(
  url: string,
  data: TData,
  onCompleted: any
): void {
  try {
    axios
      .put(url, data)
      .then(onCompleted)
      .catch((err: Error) => triggerRequestError(err, url, data));
  } catch (err: any) {
    triggerRequestError(err, url, data);
  }
}

export function httpDelete(url: string, params: any, onCompleted: any): void {
  try {
    axios
      .delete(url, { params: params })
      .then(onCompleted)
      .catch((err: Error) => triggerRequestError(err, url, params));
  } catch (err: any) {
    triggerRequestError(err, url, params);
  }
}

export function useHttpGet<TData>(
  endpoint: string,
  params: any,
  onCompleted: any
): GetDataResult<TData> {
  const isLoading = ref<boolean>(true);
  const data = ref<TData | null>(null);
  function httpGetter(fetchParams: any = params) {
    isLoading.value = true;
    httpGet(endpoint, fetchParams, (resp: AxiosResponse) => {
      isLoading.value = false;
      data.value = resp.status === 200 ? resp.data : null;
      onCompleted?.(resp);
    });
  }

  return { isLoading, data, httpGetter };
}

export function useHttpPost<TData>(
  endpoint: string,
  data: TData,
  onCompleted: any
): PostDataResult<TData> {
  const isLoading = ref<boolean>(true);
  const response = ref<AxiosResponse | null>(null);
  function httpPoster(postData: TData = data) {
    isLoading.value = true;
    httpPost(endpoint, postData, (resp: AxiosResponse) => {
      isLoading.value = false;
      response.value = resp;
      onCompleted?.(resp);
    });
  }

  return { isLoading, response, httpPoster };
}

export function usePaginatedGet<TData>(endpoint: string) {
  const pagerParams = reactive<PaginatedParams>({
    page: 1,
    size: 5,
    asc: 1,
    order: "id",
  });

  const isLoading = ref<boolean>(false);

  const data = ref<PaginatedResponse<TData> | null>(null);

  function fetchData(params: any = pagerParams) {
    isLoading.value = true;
    httpGet(
      endpoint,
      {
        page: params.page,
        size: params.size,
        asc: params.asc,
        order: params.order,
      },
      (resp: AxiosResponse) => {
        data.value = resp.status === 200 ? resp.data : null;
        isLoading.value = false;
      }
    );
  }

  watch<PaginatedParams>(pagerParams, fetchData, { deep: true });

  fetchData();

  return { isLoading, data, pagerParams, fetchData };
}

export function useCachedPaginatedGet<TData>(endpoint: string) {
  const { cachedHttpGet, clearAll, clearCacheByKey } = useCachedHttpGet();
  const pagerParams = reactive<PaginatedParams>({
    page: 1,
    size: 5,
    asc: 1,
    order: "id",
  });

  const isLoading = ref<boolean>(false);

  const data = ref<PaginatedResponse<TData> | null>(null);

  function getData(params: any = pagerParams) {
    isLoading.value = true;
    cachedHttpGet(
      endpoint,
      {
        page: params.page,
        size: params.size,
        asc: params.asc,
        order: params.order,
      },
      (resp: AxiosResponse) => {
        data.value = resp.status === 200 ? resp.data : null;
        isLoading.value = false;
      }
    );
  }

  watch<PaginatedParams>(pagerParams, getData, { deep: true });

  return { isLoading, data, pagerParams, getData, clearAll, clearCacheByKey };
}

export function useCachedCumulativeGet<TData extends object[]>(
  endpoint: string, batchSize:number = 5, order?: string,
) {
  const isLoading = ref<boolean>(false);
  const data = ref<TData>();
  const hasMore = ref<boolean>(true);
  const pagerParams = reactive<PaginatedParams>({
    page: 0,
    size: batchSize,
    asc: 1,
    order: order?? "id",
  });
  const { cachedHttpGet, clearAll: clearCache } = useCachedHttpGet();

  function getData()  {
    if (isLoading.value === true) {
      return;
    }

    isLoading.value = true;
    pagerParams.page++;
    cachedHttpGet(
      endpoint, {
        page: pagerParams.page,
        size: pagerParams.size,
        asc: pagerParams.asc,
        order: pagerParams.order,
      },
      (resp: AxiosResponse<PaginatedResponse<TData>>) => {
        if (resp.status === 200) {
          if (data.value) {
            data.value.concat(resp.data.data);
          } else {
            data.value = resp.data.data;
          }
          hasMore.value = resp.data.page < resp.data.totalPage;
        }
        else {
          pagerParams.page--;
          hasMore.value = false;
        }
        isLoading.value = false;
      }
  )}

  function clearData() {
    pagerParams.page = 0;
    data.value?.slice(0, 0);
    clearCache();
  }

  return { isLoading, data, getData, clearData };
}

export type PaginatedParams = {
  page: number;
  size: number;
  asc: 1 | 0; // 1 for true and 0 for false
  order: string | "id";
};

export type PaginatedResponse<TData> = {
  data: TData;
  page: number;
  totalPage: number;
};

export type GetDataResult<TData> = {
  isLoading: Ref<boolean>;
  data: Ref<UnwrapRef<TData> | null>;
  httpGetter: (params: any) => void;
};

export type PostDataResult<TPost> = {
  isLoading: Ref<boolean>;
  response: Ref<AxiosResponse | null>;
  httpPoster: (data: TPost) => void;
};
