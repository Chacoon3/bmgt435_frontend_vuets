<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useSemesterMgnt, useGroupMgnt } from '@/utils/manageUtils';
import { useCreateGroup } from '@/utils/groupUtils';
import CustomDropdown from '@/components/CustomDropdown.vue';
import type { DropdownConfig } from '@/components/types';
import CustomInputfield from '@/components/CustomInputfield.vue';
import type { CustomInputConfig } from '@/components/types';
import StatefulButton from '@/components/StatefulButton.vue';
import type { ButtonConfig } from '@/components/types';
import InLineMsg from '@/components/InLineMsg.vue';
import type { InLineMsgConfig } from '@/components/types';

const { semesterData, getData: getSemesters } = useSemesterMgnt();
getSemesters();
const { createGroup, isCreatingGroup } = useCreateGroup();
const {reset: resetGroupData, getData: getGroups} = useGroupMgnt();

const semesterDropdownConfig: DropdownConfig = {
    name: "Semester",
    options: semesterData.value.map((semester) => {
        return semester.name;
    }),
    values: semesterData.value.map((semester) => {
        return semester.id.toString();
    })
}
const inputConfig: CustomInputConfig = {
    label: "Number of groups",
    type: "text",
    placeholder: "Number of groups",
    defaultValue: "10",
}

const btnText = computed<string>(() => {
    if (isCreatingGroup.value === true) {
        return 'Creating...';
    } else {
        return 'Create';
    }
})
const buttonConfig: ButtonConfig = {
    text: btnText.value,
    disabled: () => {
        return isCreatingGroup.value === true;
    },
    htmlClass: "normalButton",
    onClick: () => {
        createGroup(formData.semesterId, formData.numberOfGroups,
            (msg: any) => {
                resetGroupData();
                getGroups();
                msgConfig.content = msg ?? "Groups created successfully";
                msgConfig.show = true;
            },
            (msg: any) => {
                resetGroupData();
                msgConfig.content = msg ?? "Error creating groups";
                msgConfig.show = true;
            }
        );
    }
}
const formData = reactive({
    semesterId: semesterData.value?.[0]?.id.toString(),
    numberOfGroups: inputConfig.defaultValue
})
const msgConfig = reactive<InLineMsgConfig>({
    content: "",
    type: "error",
    show: false,
})
</script>

<template>
    <div>
        <h3>Create Group</h3>
        <CustomDropdown :config="semesterDropdownConfig" @update:value="(id) => formData.semesterId = id"></CustomDropdown>
        <CustomInputfield :config="inputConfig" @update:value="(num) => formData.numberOfGroups = num"></CustomInputfield>
        <InLineMsg :config="msgConfig"></InLineMsg>
        <StatefulButton :config="buttonConfig"></StatefulButton>
    </div>
</template>