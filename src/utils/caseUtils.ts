import { type Case} from "@/utils/ORMTypes";
import { ref } from "vue";
import { useCachedHttpGet, useHttpPost } from "./requests";
import { endpoints } from "./apis";


const {cachedHttpGet, clearAll: clearCachedCases} = useCachedHttpGet();

const isCasesLoading = ref(false);
const cases = ref<Case[]>([]);
function getCases() {
    isCasesLoading.value = true;
    cachedHttpGet(endpoints.cases.cases, null, (resp: any) => {
        console.log(resp);
        if (resp.status == 200) {
            cases.value = resp.data;
        }
        else {
            cases.value = [];
        }
        isCasesLoading.value = false;
    });
}

export function useRunCase(data:any, callback:any) {
    return useHttpPost(endpoints.cases.run, data, callback);
}

export function useCases(){
    return { isCasesLoading, cases, getCases, clearCachedCases };
}
