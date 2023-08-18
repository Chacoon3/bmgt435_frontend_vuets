import { useCachedCumulatedGet } from '@/utils/requests';
import { endpoints } from '@/utils/apis';
import { type CaseRecord} from '@/utils/backendTypes';


export function useCumulatedCaseRecords() {
    return useCachedCumulatedGet<CaseRecord>(endpoints.cases.caseRecordsPaginated, 5, "create_time");
}