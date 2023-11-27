<script setup lang="ts">
import { computed, ref } from 'vue';
import { type CustomSelectConfig, type TableConfig } from '@/components/types';
import { useCumulatedCases } from '@/utils/caseUtils';
import { type Case, type Group } from '@/utils/backendTypes';
import CustomSelectGroup from '@/components/CustomSelectGroup.vue';
import FoodcenterConfig from './manageChildren/FoodcenterConfig.vue'
import ImportUser from './manageChildren/ImportUser.vue'
import ObjectView from '@/components/ObjectView.vue';
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

const { isLoading: isLoadingGroups, data: groups, getData: getGroups, hasMore: hasMoreGroups, batchDeleteGroups } = useGroupMgnt();
getGroups();
const selectedGroups = ref<Set<number>>(new Set());
function handleBatchDeleteGroups() {
    if (selectedGroups.value.size === 0) {
        showModal({
            title: "Delete groups",
            message: "Please select at least one group to delete.",
            onConfirm: closeModal,
        })
    }
    showModal({
        title: "Delete groups",
        message: "Are you sure you want to delete the selected groups?",
        onConfirm: () => {
            batchDeleteGroups(
                Array.from(selectedGroups.value),
                (msg: string) => {
                    selectedGroups.value.clear();
                    getGroups();
                    showModal({
                        title: "Delete groups",
                        message: msg,
                        onConfirm: closeModal,
                    })
                },
                (msg: string) => {
                    getGroups();
                    showModal({
                        title: "Delete groups",
                        message: msg,
                        onConfirm: closeModal,
                    })
                }
            );
            closeModal();
        },
        onCancel: closeModal,
    })

}
const groupTableState = computed<TableConfig>((): TableConfig => {
    return {
        title: "Groups",
        headers: [
            {
                elementType: "checkbox",
                value: "Select",
                onChange: (newVal: boolean) => {
                    if (newVal === true) {
                        groups.value.forEach((group: Group) => {
                            selectedGroups.value.add(group.id);
                        })
                    } else {
                        selectedGroups.value.clear();
                    }
                }
            },
            {
                elementType: "text",
                value: "Name",
            }, {
                elementType: "text",
                value: "Number of users",
            }, {
                elementType: "text",
                value: "Semester",
            }
        ],
        rows: groups.value.map((group: Group) => {
            return [
                {
                    elementType: "checkbox",
                    elementClass: "checkboxItem",
                    value: selectedGroups.value.has(group.id) === true ? "true" : "false",
                    onChange: (newVal: boolean) => {
                        if (newVal === true) {
                            selectedGroups.value.add(group.id);
                        } else {
                            if (selectedGroups.value.has(group.id) === true) {
                                selectedGroups.value.delete(group.id);
                            }
                        }
                    }
                },
                {
                    elementType: "text",
                    value: group.name,
                }, {
                    elementType: "text",
                    value: group.users.length.toString(),
                }, {
                    elementType: "text",
                    value: group.semester_name ?? "",
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
        headers: [
            {
                elementType: "text",
                value: "Name",
            }, {
                elementType: "text",
                value: "DID",
            }, {
                elementType: "text",
                value: "Group",
            }, {
                elementType: "text",
                value: "Role",
            }
        ],
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
        headers: [
            {
                elementType: "text",
                value: "Name",
            },
        ],
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
        headers: [
            {
                elementType: "text",
                value: "User",
            },
            {
                elementType: "text",
                value: "Time",
            },
            {
                elementType: "text",
                value: "Content",
            },
            {
                elementType: "button",
                value: "View detail",
            }
        ],
        rows: feedbacks.value.map((feedback) => {
            return [
                {
                    elementType: "text",
                    value: feedback.user_name,
                },
                {
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
                }
            ];
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
            <ObjectView v-if="moduleState === 'View users'" :config="userTableState" :is-loading="isLoadingUsers"
                :disable-get-data="hasMoreUsers === false || isLoadingUsers" @get-data="getUsers">
            </ObjectView>

            <ObjectView v-else-if="moduleState === 'View groups'" :config="groupTableState" :is-loading="isLoadingGroups"
                :disable-get-data="hasMoreGroups === false || isLoadingGroups" @get-data="getGroups">
                <button class="normalButton" @click="handleBatchDeleteGroups">Delete selected</button>
            </ObjectView>

            <ObjectView v-else-if="moduleState === 'View semesters'" :config="semesterTableState"
                :is-loading="isLoadingSemesters" :disable-get-data="true">
            </ObjectView>

            <ObjectView v-else-if="moduleState === 'View feedback'" :config="feedbackTableState"
                :is-loading="isLoadingFeedbacks" :disable-get-data="hasMoreFeedback === false || isLoadingFeedbacks">
            </ObjectView>

            <ImportUser v-else-if="moduleState === 'Import users'"></ImportUser>
            <FoodcenterConfig v-else-if="moduleState === 'Food center'"></FoodcenterConfig>
            <CreateSemester v-else-if="moduleState === 'Create semester'"></CreateSemester>
            <CreateGroup v-else-if="moduleState === 'Create groups'"></CreateGroup>
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