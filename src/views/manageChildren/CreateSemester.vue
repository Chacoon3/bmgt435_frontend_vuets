<script setup lang="ts">
import { useSemesterMgnt } from '@/utils/manageUtils';
import CustomDropdown from '@/components/CustomDropdown.vue';
import type { DropdownConfig, InLineMsgConfig } from '@/components/types';
import InLineMsg from '@/components/InLineMsg.vue';
import { reactive, ref } from 'vue';
import type { AxiosResponse } from 'axios';

const { create: createSemester, clearCache, getData: getSemesters } = useSemesterMgnt();
const date = new Date();
const validYears = Array.from({ length: 3 }, (_, i) => date.getFullYear() + i);
const yearDropdownConfig: DropdownConfig = {
    name: "Year",
    options: validYears.map((year) => year.toString()),
}
const validSeasons = [
    "Spring",
    "Summer",
    "Fall",
]
const seasonDropdownConfig: DropdownConfig = {
    name: "Season",
    options: validSeasons,
}

const yearSelected = ref<string>(yearDropdownConfig.options[0]);
const seasonSelected = ref<string>(seasonDropdownConfig.options[0]);
const lineMsgState = reactive<InLineMsgConfig>({
    content: "",
    show: false,
    textAlign:"left"
})

function handleCreateSemester() {
    createSemester(yearSelected.value, seasonSelected.value, (resp:AxiosResponse) => {
            lineMsgState.show = true;
        if (resp.status === 200) {
            lineMsgState.content = "Create semester success";
        }
        else {
            lineMsgState.content = resp.data ?? "Create semester failed";   
        }
    });
    clearCache();
    getSemesters();
}
</script>

<template>
    <div>
        <h4>Create a semester</h4>
        <form @submit.prevent="handleCreateSemester">
            <CustomDropdown :config="yearDropdownConfig" @update:value="(val) => yearSelected = val"></CustomDropdown>
            <CustomDropdown :config="seasonDropdownConfig" @update:value="(val) => seasonSelected = val"></CustomDropdown>
            <InLineMsg :config="lineMsgState"></InLineMsg>
            <div>
                <input type="submit" value="Create semester">
            </div>
        </form>
    </div>
</template>