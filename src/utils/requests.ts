import useErrorUtil from "./errorUtils";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { type Ref, ref, watch, reactive } from "vue";
import { useCache } from "./cacheUtils";


const server = "http://localhost:8000/";
axios.defaults.headers["Content-Type"] = "text/plain";
axios.defaults.baseURL = server;
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (status) => status < 500;
axios.defaults.timeout = 10000;

const { setErrorContext } = useErrorUtil();

function triggerRequestError<T>(
  error: AxiosError,
  endpoint: string,
  dataOrParams: T
) {
  setErrorContext(
    error,
    ` A request has failed with error: ${error.response?.data}`
  );
  // console.log(
  //   `Request to ${endpoint} failed with error: ${error.message ?? error}`
  // );
  // console.log(dataOrParams);
  // console.log("logger ends -- -- -- -- -- -- -- --");
}

export function httpGet(url: string, params: any, onCompleted: any): void {
  try {
    axios
      .get(url, { params: params })
      .then(onCompleted)
      .catch((err: AxiosError) => triggerRequestError(err, url, params));
  } catch (err: any) {
    triggerRequestError(err, url, params);
  }
}

export const {
  get,
  set,
  createKey,
  clearCacheByEndpoint: clearCacheByEndpoint,
  clearAllCache,
} = useCache<AxiosResponse>();
export function cachedHttpGet(
  endpoint: string,
  params: any,
  onCompleted: any
): void {
  try {
    const key = createKey(params);
    const cachedResp = get(endpoint, key);
    if (cachedResp) {
      onCompleted(cachedResp);
    } else {
      axios
        .get(endpoint, { params: params })
        .then((resp) => {
          set(endpoint, key, resp);
          onCompleted?.(resp);
        })
        .catch((err: AxiosError) => triggerRequestError(err, endpoint, params));
    }
  } catch (err: any) {
    triggerRequestError(err, endpoint, params);
  }
}

export function httpDownload(endpoint: string, params: any, onCompleted: any) {
  try {
    axios
      .get(endpoint, { params: params, responseType: "arraybuffer" })
      .then(onCompleted)
      .catch((err: AxiosError) => triggerRequestError(err, endpoint, params));
  } catch (err: any) {
    triggerRequestError(err, endpoint, params);
  }
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
      .catch((err: AxiosError) => triggerRequestError(err, url, data));
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
      .catch((err: AxiosError) => triggerRequestError(err, url, data));
  } catch (err: any) {
    triggerRequestError(err, url, data);
  }
}

export function httpDelete(url: string, params: any, onCompleted: any): void {
  try {
    axios
      .delete(url, { params: params })
      .then(onCompleted)
      .catch((err: AxiosError) => triggerRequestError(err, url, params));
  } catch (err: any) {
    triggerRequestError(err, url, params);
  }
}

export function usePaginatedGet<TData>(endpoint: string) {
  const pagerParams = reactive<PaginatedParams>({
    page: 1,
    size: 5,
    asc: 1,
    order: "id",
  });

  const isLoading = ref<boolean>(false);

  const data = ref<PaginatedData<TData> | null>(null);

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
  const pagerParams = reactive<PaginatedParams>({
    page: 1,
    size: 5,
    asc: 1,
    order: "id",
  });

  const isLoading = ref<boolean>(false);

  const data = ref<PaginatedData<TData> | null>(null);

  function getData(params: any = pagerParams) {
    if (isLoading.value === true) {
      return;
    }
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

  return {
    isLoading,
    data,
    pagerParams,
    getData,
    clearCache: () => clearCacheByEndpoint(endpoint),
  };
}

export function useCachedCumulatedGet<TData>(
  endpoint: string,
  batchSize: number = 5,
  orderBy?: string,
  asc: 1 | 0 = 1
) {
  const isLoading = ref<boolean>(false);
  const data = ref<TData[]>([]) as Ref<TData[]>;
  const hasMore = ref<boolean>(false);
  const pagerParams: PaginatedParams = {
    page: 0,
    size: batchSize,
    asc: asc,
    order: orderBy ?? "id",
  };

  function getData() {
    if (isLoading.value === true) {
      return;
    }

    isLoading.value = true;
    pagerParams.page++;
    cachedHttpGet(
      endpoint,
      {
        page: pagerParams.page,
        size: pagerParams.size,
        asc: pagerParams.asc,
        order: pagerParams.order,
      },
      (resp: AxiosResponse<PaginatedData<TData[]>>) => {
        isLoading.value = false;
        if (resp.status === 200) {
          data.value = data.value.concat(resp.data.data);
          hasMore.value = resp.data.page < resp.data.totalPage;
        } else {
          pagerParams.page--;
          hasMore.value = false;
        }
      }
    );
  }

  return {
    isLoading,
    data,
    getData,
    hasMore,
    clearCache: () => clearCacheByEndpoint(endpoint),
  };
}

export type PaginatedParams = {
  page: number;
  size: number;
  asc: 1 | 0; // 1 for true and 0 for false
  order: string | "id";
};

export type PaginatedData<TData> = {
  data: TData;
  page: number;
  totalPage: number;
};

// export type GetDataResult<TData> = {
//   isLoading: Ref<boolean>;
//   data: Ref<UnwrapRef<TData> | null>;
//   httpGetter: (params: any, callback: any) => void;
// };

// export type PostDataResult<TPost> = {
//   isLoading: Ref<boolean>;
//   response: Ref<AxiosResponse | null>;
//   httpPoster: (data: TPost, callback: any) => void;
// };
