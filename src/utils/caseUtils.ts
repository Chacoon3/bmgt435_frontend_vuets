import { type Case} from "@/utils/dbModelTypes";
import { ref, watch } from "vue";
import { httpGet } from "./requests";
import { endpoints } from "./apis";
import { useCurrentUser } from "./userUtils";


const {currentUser} = useCurrentUser();
const isCasesLoading = ref<boolean>(false);
const cases = ref<Case[]>([]);
function getCasesByRole(roleId: number) {
    isCasesLoading.value = true;
    httpGet(endpoints.cases, { role_id: roleId}, (resp: any) => {
        cases.value = resp.data;
        isCasesLoading.value = false;
    })
}

function getAllCases() {
    isCasesLoading.value = true;
    httpGet(endpoints.cases, null, (resp: any) => {
        cases.value = resp.data;
        isCasesLoading.value = false;
    })
}

watch<number | null | undefined>(() => currentUser.value?.role_id, (newRoleId, oldRoleId) => {
    if (newRoleId !== undefined && newRoleId !== null && newRoleId !== oldRoleId) {
        getCasesByRole(newRoleId);
    } else {
        cases.value = [];
    }
})


export function useCases() {
    return { isCasesLoading, cases, getCasesByRole, getAllCases };
}