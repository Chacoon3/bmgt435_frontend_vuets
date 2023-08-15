import { httpPost, useCachedCumulatedGet } from "./requests";
import { endpoints } from "./apis";
import { ref } from "vue";
import { type User } from "./ORMTypes";

export function useImportUsers() {
    const isLoading = ref<boolean>(false);
    

    function importUsers(csvUsers:File, callback: any) {
        if (isLoading.value === true) return;
        
        
        isLoading.value = true;
        csvUsers.stream().getReader().read().then((bytes) => {
            console.log(bytes);
            if (bytes) {
                httpPost(endpoints.manage.importUsers, bytes.value, (resp: any) => { 
                    isLoading.value = false;
                    callback?.(resp);
                });
            }
            else {
                isLoading.value = false;
                callback(new Response("Empty file"))
            }
        });
    }

    return { importUsers, isLoading };
}   


export function useCachedCumulatedUsers() {
    return useCachedCumulatedGet<User>(endpoints.manage.viewUsers, 10);
}