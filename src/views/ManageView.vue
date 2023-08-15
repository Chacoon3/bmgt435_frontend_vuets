<script setup lang="ts">
import { computed, ref } from 'vue';
import { type CustomSelectConfig } from '@/components/types';
import CustomSelect from '@/components/CustomSelect.vue';
import CaseMgnt from './manageChildren/CaseMgnt.vue'
import ImportUser from './manageChildren/ImportUser.vue'
import ViewUser from './manageChildren/ViewUser.vue';
import { useCumulatedCases } from '@/utils/caseUtils';

const { isLoading: isCasesLoading, data: cases, hasMore: hasMoreCases, getData: getCases } = useCumulatedCases();
getCases();
const caseOptions = computed<string[]>(() => {
    if (isCasesLoading.value === true) {
        return ["Loading..."];
    } else {
        return cases.value.map((caseItem) => {
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
    <div id="manageViewContainer">
        <div id="manageButtonContainer">
            <CustomSelect v-for="(item, index) in selectState" :key="index" :name="item.name" v-model:options="item.options"
                @input="(val: string) => { moduleState = val; }"></CustomSelect>
        </div>
        <hr class="lv2Hr">

        <div id="manageModuleContainer">
            <KeepAlive>
                <ImportUser v-if="moduleState === 'Import Users'"></ImportUser>
                <ViewUser v-else-if="moduleState === 'View Users'"></ViewUser>
                <CaseMgnt v-else-if="moduleState === 'Config Cases'"></CaseMgnt>
            </KeepAlive>
        </div>
    </div>
</template>

<style scoped>
#manageViewContainer {
    padding-right: var(--width-whitespace-right);
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