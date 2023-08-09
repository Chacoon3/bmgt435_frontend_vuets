import { useCachedCumulativeGet } from '@/utils/requests';
import { endpoints } from '@/utils/apis';
import { type CaseRecord} from '@/utils/ORMTypes';


const { isLoading, data: records, clearData, getData } = useCachedCumulativeGet<CaseRecord[]>(endpoints.cases.caseRecordsPaginated, 5, "create_time");


export function useCaseRecords() {
    return { isLoading, records, clearData, getData };
}