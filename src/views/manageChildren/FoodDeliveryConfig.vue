<script setup lang="ts">
import ObjectView from '@/components/ObjectView.vue';
import type { TableConfig } from '@/components/types';
import { useCaseMgnt, useSemesterMgnt } from '@/utils/manageUtils';
import CustomDropdown from '@/components/CustomDropdown.vue';
import { computed, ref } from 'vue';
import { useModal } from '@/utils/modalUtils';

const modal = useModal();

const caseMgnt = useCaseMgnt();
caseMgnt.getConfig();
const caseConfigTable = computed<TableConfig>(() => {
    return {
        title: "Current configuration", 
        headers:
            [
                {
                    elementType: "text",
                    value: "created time"
                },
                {
                    elementType: "text",
                    value: "last modified"
                },
                {
                    elementType: "text",
                    value: "configuration value"
                }
            ],
        rows: caseMgnt.configData.value.map((item) => [
            {
                elementType: "text",
                value: item.create_time
            },
            {
                elementType: "text",
                value: item.edited_time,
            },
            {
                elementType: "text",
                value: item.config_json.toString()
            }
        ])
    }
});

const semesterMgnt = useSemesterMgnt();
semesterMgnt.getData();
const semesterSelected = ref<string>(semesterMgnt.semesterData.value[0].id.toString());
const semesterDropdownConfig = {
    name: "Semester",
    options: semesterMgnt.semesterData.value.map((item) => item.name),
    values: semesterMgnt.semesterData.value.map((item) => item.id.toString())
}

const centerMap = ref<Map<string, string>>(new Map([
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"]
]));

const centerMapAsArray = computed(() => Array.from(centerMap.value).map((item) => [item[0], item[1]]));

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleRemap() {
    const oldMap = Array.from(centerMap.value).map((item) => item[1]);
    const newMap = shuffleArray(oldMap);
    const keyIterator = centerMap.value.keys();
    for (let i = 0; i < newMap.length; i++) {
        const k = keyIterator.next().value;
        centerMap.value.set(k, newMap[i]);
    }
}

function handleCreate() {
    modal.showModal({
        title: "Alter configuration",
        message: "Are you sure to create this configuration?",
        onConfirm: () => {
            caseMgnt.updateFoodDeliveryConfig(
                centerMapAsArray.value,
                +semesterSelected.value,
                (msg: string) => {
                    caseMgnt.resetConfigData();
                    caseMgnt.getConfig();
                    modal.showModal(
                        {
                            title: "Success",
                            message: msg,
                            onConfirm: () => { modal.closeModal() }
                        }
                    )
                },
                (msg: string) => {
                    modal.showModal(
                        {
                            title: "Error",
                            message: msg,
                            onConfirm: () => { modal.closeModal() }
                        }
                    )
                }
            );
            modal.closeModal();
        },
        onCancel: () => { modal.closeModal() }
    });
}
</script>

<template>
    <div>
        <h3>Alter configuration</h3>
        <div>
            <!-- <CustomDropdown :config="semesterDropdownConfig" @update:value="(val) => semesterSelected = val">
            </CustomDropdown> -->
            <div v-for="item in centerMap" :key="item[0]">
                <span>Center {{ item[0] }}: </span>
                <input type="number" :value="item[1]" @input="centerMap.set(item[0], $event.target?.value)" />
            </div>
        </div>
        <div>
            <button class="normalButton" @click="handleRemap">Remap</button>
            <button class="normalButton" @click="handleCreate">Apply</button>
        </div>
    </div>
    <hr>
    <div>
        <ObjectView :config="caseConfigTable" :is-loading="caseMgnt.isLoadingConfig.value"
            :disable-get-data="caseMgnt.hasMoreConfig.value === false"></ObjectView>
    </div>
</template>

<style scoped>
input[type=number] {
    width: 50px;
    text-align: center;
}
</style>