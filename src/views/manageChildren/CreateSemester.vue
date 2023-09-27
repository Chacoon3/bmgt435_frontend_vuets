<script setup lang="ts">
import { useSemester } from '@/utils/manageUtils';
import CustomDropdown from '@/components/CustomDropdown.vue';
import type { DropdownConfig } from '@/components/types';
import { ref } from 'vue';

const { createSemester, clearCache, getSemesters } = useSemester();
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

function handleCreateSemester() {
    createSemester(yearSelected.value, seasonSelected.value, null);
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
            <div>
                <input type="submit" value="Create semester">
            </div>
        </form>
    </div>
</template>