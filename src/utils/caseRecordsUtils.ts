import { useCachedCumulatedGet } from '@/utils/requests';
import { endpoints } from '@/utils/apis';
import { type CaseRecord} from '@/utils/ORMTypes';


const { isLoading, data: records, clearCache: clearCachedRecords, getData } = useCachedCumulatedGet<CaseRecord>(endpoints.cases.caseRecordsPaginated, 5, "create_time");


export function useCumulatedCaseRecords() {
    return { isLoading, records, clearCachedRecords, getData };
}