<script setup lang="ts">
import { computed, ref } from 'vue';
import { type CustomSelectConfig } from '@/components/types';
import CustomSelect from '@/components/CustomSelect.vue';
import FoodcenterConfig from './manageChildren/FoodcenterConfig.vue'
import ImportUser from './manageChildren/ImportUser.vue'
import ViewUser from './manageChildren/ViewUser.vue';
import { useCumulatedCases } from '@/utils/caseUtils';
import { type Case } from '@/utils/backendTypes';

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
const selectState = computed<CustomSelectConfig[]>(() => [
    {
        name: "User Management",
        options: ["View Users", "Import Users"],
    },
    {
        name: "Case Management",
        options: caseOptions.value,
    },
    {
        name: "System Management",
        options: ["Config"],
    }
])

const moduleState = ref<string>("")

</script>

<template>
    <div id="manageViewContainer" class="contentViewContainer">
        <div id="manageButtonContainer">
            <CustomSelect v-for="(item, index) in selectState" :key="index" :name="item.name" v-model:options="item.options"
                @input="(newVal: string) => { moduleState = newVal; }"></CustomSelect>
        </div>
        <hr class="lv2Hr">

        <div id="manageModuleContainer">
            <KeepAlive>
                <ImportUser v-if="moduleState === 'Import Users'"></ImportUser>
                <ViewUser v-else-if="moduleState === 'View Users'"></ViewUser>
                <FoodcenterConfig v-else-if="moduleState === 'Food center'"></FoodcenterConfig>
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