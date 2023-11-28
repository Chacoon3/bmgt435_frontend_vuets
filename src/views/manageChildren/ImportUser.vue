<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useImportUsers } from '@/utils/manageUtils';
import CustomDropdown from '@/components/CustomDropdown.vue';
import InLineMsg from '@/components/InLineMsg.vue';
import { ref } from 'vue';
import type { DropdownConfig, InLineMsgConfig } from '@/components/types';
import { useSemesterMgnt } from '@/utils/manageUtils';

const importMsgState = reactive<InLineMsgConfig>({
    content: "",
    show: false,
});
const semesterDropdownMsgState = reactive<InLineMsgConfig>({
    content: "Please create a semester first",
    show: false,
});
const { isLoading: isImporting, importUsers } = useImportUsers();
const { semesterData, getData: getSemesters } = useSemesterMgnt();
getSemesters();
watch(semesterData, (newVal) => {
    semesterDropdownMsgState.show = newVal === undefined || newVal.length === 0;
}, { immediate: true })

function handleImportUser() {
    importMsgState.show = false;
    semesterDropdownMsgState.show = false;
    const inputHandle = document.getElementById("importUserFile") as HTMLInputElement;
    const fileObj = inputHandle.files?.[0];

    if (selectedSemesterId.value === "") {
        semesterDropdownMsgState.show = true;
        return;
    }

    if (fileObj) {
        importUsers(fileObj, selectedSemesterId.value,
            (msg: any) => {
                importMsgState.content = msg ?? "Import failed";
            },
            (msg: string) => {
                importMsgState.content = msg ?? "Import failed";
                importMsgState.show = true;
            });
    }
    else {
        importMsgState.content = "Please select a file";
        importMsgState.show = true;
    }
}

const semesterDropdownConfig: DropdownConfig = reactive({
    name: "Semester",
    options: semesterData.value.map((item) => item.name),
    values: semesterData.value.map((item) => item.id.toString()),
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
                <CustomDropdown :config="semesterDropdownConfig" @update:value="(val) => selectedSemesterId = val">
                </CustomDropdown>
                <InLineMsg :config="semesterDropdownMsgState"></InLineMsg>
            </div>
            <div>
                <InLineMsg :config="importMsgState"></InLineMsg>
                <input type="submit" :disabled="isImporting === true"
                    :value="isImporting === false ? 'Import Users' : 'Importing'">
            </div>
        </form>
    </div>
</template>