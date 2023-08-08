<script setup lang="ts">
import router, {routePaths} from '@/router';
import { computed,ref } from 'vue';
import { useCurrentUser, formatUserName } from '../utils/userUtils'
import { useCases } from '../utils/caseUtils'
// import { inject, reactive, ref, KeepAlive, onMounted } from 'vue';
// import { keyUserInfo } from '../../static/injKey'
// import router from '../../router';
// import { flag_routes } from '../../static/flags'
// import ModuleTitle from '../../components/ModuleTitle.vue'
// import LeftNav from '../../components/LeftNav.vue'
// import CaseSelectionView from './submodules/CaseSelectionView.vue';
// import CaseBriefView from './submodules/CaseBriefView.vue';
// import { apiAddress, axiosGet } from '../../static/serverAccess';

const pageStateArray = ['caseList', 'caseBrief', 'simulation', 'resultAnalysis']
const pageState = ref(0)
const { isCurrentUserLoading, currentUser } = useCurrentUser()
const { cases } = useCases()

const titleText = computed(() => {
    if (isCurrentUserLoading.value) {
        return "Fetching data..."
    }
    else if (currentUser.value === null) {
        return ""
    }
    else {
        return `Welcome, ${formatUserName(currentUser.value)}!`;
    }
})


// this defines the simulation stages
// const statusArray = ["Case list", "Case brief", "Simulate", "Result Analysis"]

// const pageState = ref(0)  // records the user's stage in simulation 

// const caseNames = ref([])

// const currentCaseId = ref('')

// const simulators = {    // components mapping to simulator UI's of different cases where the key is case id
//     '1': FoodCenterSimulation,
//     '2': UnknownSimulation
// }

// function handleSelectCase(caseId) {
//     currentCaseId.value = caseId;

//     if (caseId === '') {
//         window.alert('Something appears to be wrong. Please try to select a case again!')
//     }
//     else {
//         currentCaseId.value = caseId
//         pageState.value = 1
//     }
// }

// function handleClickStatus(statusName) {
//     var index = statusArray.indexOf(statusName);
//     if (index === -1) {
//         index = 0;
//     }
//     pageState.value = index;
// }

// function handleClickProceed() {
//     pageState.value = 2;
// }

// function getCaseInfo() {

//     axiosGet(
//         apiAddress.get_case_list,
//         {
//             page:1,
//             page_size:3,
//         },
//         (response) => {
//             caseNames.value = []
//             console.log(response.data)
//             for (const item of response.data.data) {
//                 caseNames.value.push({
//                     caseId: item.pk,
//                     caseName: item.fields.case_name
//                 })
//             }
//         },
//         (error) => {
//             console.log(error)
//         }
//     )
// }


// getCaseInfo()     // fetch case info every time initialized
</script>


<template>
    <div id="workbenchContent">

        <div class="workbenchContent" v-if="currentUser && currentUser.group_id !== null">
            <li v-for="item in 10" :key="item"></li>>
        </div>

        <div class="workbenchContent" v-else>
            <h2>It appears you are not in a group yet. Please join or create a group first.</h2>
            <button id="okayButton" type="button" @click="router.push({ name: routePaths.grouping })">Okay!</button>
        </div>

    </div>
</template>


<style scoped>

</style>