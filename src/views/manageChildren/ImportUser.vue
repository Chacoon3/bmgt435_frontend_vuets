<script setup lang="ts">
import { reactive } from 'vue';
import { useImportUsers } from '@/utils/manageUtils';
import CustomDropdown from '@/components/CustomDropdown.vue';
import InLineMsg from '@/components/InLineMsg.vue';
import { ref } from 'vue';
import type { DropdownConfig, InLineMsgConfig } from '@/components/types';
import { useSemester } from '@/utils/manageUtils';

const contentMsgState = reactive<InLineMsgConfig>({
    content: "",
    show: false,
});
const { isLoading: isImporting, importUsers } = useImportUsers();
const { semesters } = useSemester();
function handleImportUser() {
    contentMsgState.show = false;
    const inputHandle = document.getElementById("importUserFile") as HTMLInputElement;
    const file = inputHandle.files?.[0];
    if (file) {
        importUsers(file, selectedSemesterId.value, (resp: any) => {
            if (resp.status === 200) {
                contentMsgState.content = "Import success";
            } else {
                contentMsgState.content = resp.data ?? "Import failed";
            }
            contentMsgState.show = true;
        });
    }
    else {
        contentMsgState.content = "Please select a file";
        contentMsgState.show = true;
    }
}

const semesterDropdownConfig: DropdownConfig =reactive({
    name: "Semester",
    options: semesters.value.map((item) => item.name),
    values: semesters.value.map((item) => item.id.toString()),
})
const selectedSemesterId = ref<string>(semesterDropdownConfig.values?.[0] ?? "");
</script>

<template>
    <div>
        <h3>Import User</h3>
        <p>Please select and upload a CSV file to import users</p>
        <p>The CSV file should contain the following columns: "user_first_name", "user_last_name", "directory_id"</p>
        <form @submit.prevent="handleImportUser">
            <div>
                <input id="importUserFile" type="file" accept=".csv">
            </div>
            <div>
                <CustomDropdown :config="semesterDropdownConfig" @update:value="(val) => selectedSemesterId = val"></CustomDropdown>
            </div>
            <div>
                <InLineMsg :config="contentMsgState"></InLineMsg>
                <input type="submit" :disabled="isImporting === true"
                    :value="isImporting === false ? 'Import Users' : 'Importing'">
            </div>
        </form>
    </div>
</template>