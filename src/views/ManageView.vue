<script setup lang="ts">
import { computed, ref } from 'vue';
import { type CustomSelectConfig } from '@/components/types';
import { useCumulatedCases } from '@/utils/caseUtils';
import { type Case } from '@/utils/backendTypes';
import CustomSelectGroup from '@/components/CustomSelectGroup.vue';
import FoodcenterConfig from './manageChildren/FoodcenterConfig.vue'
import ImportUser from './manageChildren/ImportUser.vue'
import ViewUser from './manageChildren/ViewUser.vue';
import CreateSemester from './manageChildren/CreateSemester.vue';
import CreateGroup from './manageChildren/CreateGroup.vue';

const { isLoading: isCasesLoading, data: cases, hasMore: hasMoreCases, getData: getCases } = useCumulatedCases();
getCases();
const caseOptions = computed<string[]>(() => {
    if (isCasesLoading.value === true) {
        return ["Loading..."];
    } else {
        return cases.value.map((caseItem: Case) => {
            return caseItem.name;
        })
    }
})
const selectConfig = computed<CustomSelectConfig[]>(() => [
    {
        name: "User",
        options: ["View users", "Import users"],
    },
    {
        name: "Group",
        options: ["View groups", "Create groups"],
    },
    {
        name: "Case",
        options: caseOptions.value,
    },
    {
        name: "Semester",
        options: ["Create semester"],
    },
    {
        name: "System",
        options: ["Config"],
    }
])

const moduleState = ref<string>("")

</script>

<template>
    <div id="manageViewContainer" class="contentViewContainer">

        <div id="manageButtonContainer">
            <CustomSelectGroup :select-configs="selectConfig" flexDir="row" @update:value="(val:string) => { moduleState = val}"></CustomSelectGroup>
        </div>
        <hr class="lv2Hr">

        <div id="manageModuleContainer">
            <KeepAlive>
                <ImportUser v-if="moduleState === 'Import users'"></ImportUser>
                <ViewUser v-else-if="moduleState === 'View users'"></ViewUser>
                <FoodcenterConfig v-else-if="moduleState === 'Food center'"></FoodcenterConfig>
                <CreateSemester v-else-if="moduleState === 'Create semester'"></CreateSemester>
                <CreateGroup v-else-if="moduleState === 'Create groups'"></CreateGroup>
            </KeepAlive>
        </div>
    </div>
</template>

<style scoped>
#manageViewContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#manageButtonContainer {
    margin: 1em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

[buttonIsOn="true"] {
    background: var(--color-red-umd-light);
    width: 150px;
    height: 30px;
    margin: 10px;
}

[buttonIsOn="false"] {
    width: 150px;
    height: 30px;
    margin: 10px;
}

#manageModuleContainer {
    display: block;
}
</style>