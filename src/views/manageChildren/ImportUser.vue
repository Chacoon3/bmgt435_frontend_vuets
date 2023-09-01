<script setup lang="ts">
import { reactive } from 'vue';
import { useImportUsers} from '@/utils/manageUtils';
import InLineMsg from '@/components/InLineMsg.vue';

const contentMsgState = reactive({
    msg: "",
    show: false,
});
const { isLoading: isImporting,  importUsers } = useImportUsers();
function handleImportUser() {
    contentMsgState.show = false;
    const inputHandle = document.getElementById("importUserFile") as HTMLInputElement;
    const file = inputHandle.files?.[0];
    if (file) {
        importUsers(file, (resp:any) => {
            if (resp.status === 200) {
                contentMsgState.msg = "Import success";
            } else {
                contentMsgState.msg = resp.data ?? "Import failed";
            }
            contentMsgState.show = true;
        });
    }
}
</script>

<template>
    <div>
        <h3>Import User</h3>
        <p>Please select and upload a CSV file to import users</p>
        <p>The CSV file should contain the following columns: "user_first_name", "user_last_name", "directory_id"</p>
        <form @submit.prevent="handleImportUser">
            <div>
                <input id="importUserFile" type="file" accept=".csv" >
            </div>
            <div>
                <InLineMsg :content="contentMsgState.msg" :show="contentMsgState.show"></InLineMsg>
                <input type="submit" :disabled="isImporting === true" :value="isImporting === false ? 'Import Users': 'Importing'">
            </div>
        </form>
    </div>
</template>