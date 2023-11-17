import useErrorUtil from "./errorUtils";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { type Ref, ref, watch, reactive, shallowReactive } from "vue";
import { useCache } from "./cacheUtils";


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.headers["Content-Type"] = "text/plain";
axios.defaults.baseURL = import.meta.env.VITE_BMGT435_SERVICE;
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (status) => status < 600;
axios.defaults.timeout = 10000;

const { setErrorContext } = useErrorUtil();

function raiseRequestError<T>(
  error: any,
  endpoint: string,
  dataOrParams: T
) {
  throw error;
  // setErrorContext(
  //   error,
  //   ` A request to server has failed with error. ${error.status ?? "", " ", error.message ?? ""}`
  // );
}

export function httpGet(url: string, params: any, onCompleted?: (resp:AxiosResponse) => void): void {
  try {
    axios
      .get(url, { params: params })
      .then(onCompleted)
      .catch((err: AxiosError) => raiseRequestError(err, url, params));
  } catch (err: any) {
    raiseRequestError(err, url, params);
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
        .catch((err: AxiosError) => raiseRequestError(err, endpoint, params));
    }
  } catch (err: any) {
    raiseRequestError(err, endpoint, params);
  }
}

export function httpDownload(endpoint: string, params: any, onCompleted: any) {
  try {
    axios
      .get(endpoint, { params: params, responseType: "arraybuffer" })
      .then(onCompleted)
      .catch((err: AxiosError) => raiseRequestError(err, endpoint, params));
  } catch (err: any) {
    raiseRequestError(err, endpoint, params);
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
      .catch((err: AxiosError) => raiseRequestError(err, url, data));
  } catch (err: any) {
    raiseRequestError(err, url, data);
  }
}

export function useCachedPaginatedGet<TData>(endpoint: string) {
  const pagerParams = reactive<PaginatedParams>({
    page: 1,
    size: 5,
    asc: 1,
    order: "id",
  });

  const isLoading = ref<boolean>(false);

  const data = shallowReactive<PaginatedData<TData> >({
    data: [],
    page: 0,
    totalPage: 0,
  });

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
        isLoading.value = false;
        if (resp.data.data) {
          data.page = resp.data.data.page;
          data.totalPage = resp.data.data.totalPage;
          data.data = resp.data.data.data;
        }
        else {
          data.page --;
        }
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
  size: number = 5,
  orderBy?: string,
  asc: 1 | 0 = 1
) {
  const isLoading = ref<boolean>(false);
  const data = ref<TData[]>([]) as Ref<TData[]>;
  const hasMore = ref<boolean>(false);
  const pagerParams: PaginatedParams = {
    page: 0,
    size: size,
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
      (resp: AxiosResponse) => {
        isLoading.value = false;
        if (resp.data.data) {
          const pageData:PaginatedData<TData> = resp.data.data;
          data.value.push(...pageData.data);
          hasMore.value =pageData.page < pageData.totalPage;
        } else {
          pagerParams.page--;
          hasMore.value = false;
        }
      }
    );
  }

  function reset() {
    data.value = [];
    pagerParams.page = 0;
    hasMore.value = true;
    clearCacheByEndpoint(endpoint);
  }

  return {
    isLoading,
    data,
    getData,
    hasMore,
    reset,
  };
}

export type PaginatedParams = {
  page: number;
  size: number;
  asc: 1 | 0; // 1 for true and 0 for false
  order: string | "id";
};

export type PaginatedData<TData> = {
  data: TData[];
  page: number;
  totalPage: number;
};