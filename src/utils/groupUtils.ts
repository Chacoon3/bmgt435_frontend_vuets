import { endpoints } from "./apis";
import { useGet } from "./requests";
import { type Group } from "../ormTypes";

const {isLoading, data, httpGetter} = useGet<Group[]>(endpoints.groups, null)
export function useGroups() {
  httpGetter(null);
  return {isLoading, data, httpGetter}
}