<script setup lang="ts">
import { computed, ref } from 'vue';
import { type CustomSelectConfig, type TableConfig } from '@/components/types';
import { useCumulatedCases } from '@/utils/caseUtils';
import { type Case, type Group } from '@/utils/backendTypes';
import CustomSelectGroup from '@/components/CustomSelectGroup.vue';
import FoodcenterConfig from './manageChildren/FoodcenterConfig.vue'
import ImportUser from './manageChildren/ImportUser.vue'
import ObjectView from './manageChildren/ObjectView.vue';
import CreateSemester from './manageChildren/CreateSemester.vue';
import CreateGroup from './manageChildren/CreateGroup.vue';
import { useUserMgnt, useGroupMgnt, useSemesterMgnt, useFeedbackMgnt } from '@/utils/manageUtils';
import { formatUserName } from '@/utils/userUtils';
import { useModal } from '@/utils/modalUtils';

const { showModal, closeModal } = useModal();

const { isLoading: isCasesLoading, data: cases, getData: getCases } = useCumulatedCases();
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

const { isLoading: isLoadingGroups, data: groups, getData: getGroups, hasMore: hasMoreGroups } = useGroupMgnt();
getGroups();
const groupTableState = computed<TableConfig>((): TableConfig => {
    return {
        title: "Groups",
        headers: ["Name", "Members"],
        rows: groups.value.map((group: Group) => {
            return [{
                elementType: "text",
                value: group.name,
            }, {
                elementType: "text",
                value: group.users.length.toString(),
            }];
        }
        )
    };
});

const { isLoading: isLoadingUsers, data: users, getData: getUsers, reset, hasMore: hasMoreUsers } = useUserMgnt();
getUsers();
const userTableState = computed<TableConfig>((): TableConfig => {
    return {
        title: "Users",
        headers: ["Name", "Directory ID", "Group", "Role"],
        rows: users.value.map((user) => {
            return [{
                elementType: "text",
                value: formatUserName(user),
            }, {
                elementType: "text",
                value: user.did,
            }, {
                elementType: "text",
                value: user.group_name ?? "",
            }, {
                elementType: "text",
                value: user.role,
            }];
        }
        )
    };
});

const { isLoading: isLoadingSemesters, data: semesters, getData: getSemesters } = useSemesterMgnt();
getSemesters();
const semesterTableState = computed<TableConfig>((): TableConfig => {
    return {
        title: "Semesters",
        headers: ["Name",],
        rows: semesters.value.map((semester) => {
            return [{
                elementType: "text",
                value: semester.name,
            },];
        }
        )
    };
});

const { isLoading: isLoadingFeedbacks, data: feedbacks, getData: getFeedbacks, hasMore: hasMoreFeedback } = useFeedbackMgnt();
getFeedbacks();
const feedbackTableState = computed<TableConfig>((): TableConfig => {
    return {
        title: "Feedbacks",
        headers: ["User", "Time", "Content"],
        rows: feedbacks.value.map((feedback) => {
            return [
                {
                    elementType: "text",
                    value: feedback.user_name,
                }, {
                    elementType: "text",
                    value: feedback.create_time,
                },
                {
                    elementType: "text",
                    value: feedback.content.length > 20 ? feedback.content.slice(0, 20) + "..." : feedback.content,
                },
                {
                    elementType: "button",
                    value: "View detail",
                    onClick: () => {
                        showModal({
                            title: "Feedback detail",
                            message: feedback.content,
                            onConfirm: closeModal,
                        })
                    }
                }];
        }
        )
    };
});

const moduleState = ref<string>("");

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
        options: ["View semesters", "Create semester",],
    },
    {
        name: "System",
        options: ["Config", "View feedback"],
    }
])
</script>

<template>
    <div id="manageViewContainer" class="contentViewContainer">

        <div id="manageButtonContainer">
            <CustomSelectGroup :select-configs="selectConfig" flexDir="row"
                @update:value="(val: string) => { moduleState = val }"></CustomSelectGroup>
        </div>
        <hr class="lv2Hr">

        <div id="manageModuleContainer">
            <KeepAlive>
                <ObjectView v-if="moduleState === 'View users'" :config="userTableState" :is-loading="isLoadingUsers"
                :disable-get-data="!hasMoreUsers" @get-data="getUsers"></ObjectView>
                <ObjectView v-else-if="moduleState === 'View groups'" :config="groupTableState"
                :is-loading="isLoadingGroups" :disable-get-data="hasMoreGroups === false" @get-data="getGroups">
                </ObjectView>
                <ObjectView v-else-if="moduleState === 'View semesters'" :config="semesterTableState"
                :is-loading="isLoadingSemesters" :disable-get-data="true"></ObjectView>
                <ObjectView v-else-if="moduleState === 'View feedback'" :config="feedbackTableState"
                :is-loading="isLoadingFeedbacks" :disable-get-data="hasMoreFeedback === false"></ObjectView>
                
                <ImportUser v-else-if="moduleState === 'Import users'"></ImportUser>
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