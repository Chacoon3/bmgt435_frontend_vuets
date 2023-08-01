<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue';
import { computed } from 'vue';
import { useCurrentUser } from '../utils/userUtils'
// import { inject, reactive, ref, KeepAlive, onMounted } from 'vue';
// import { keyUserInfo } from '../../static/injKey'
// import router from '../../router';
// import { flag_routes } from '../../static/flags'
// import ModuleTitle from '../../components/ModuleTitle.vue'
// import LeftNav from '../../components/LeftNav.vue'
// import CaseSelectionView from './submodules/CaseSelectionView.vue';
// import CaseBriefView from './submodules/CaseBriefView.vue';
// import { apiAddress, axiosGet } from '../../static/serverAccess';


const { isLoading, data: currentUser } = useCurrentUser()
const titleText = computed(() => {
    if (isLoading.value) {
        return "Loading..."
    }
    else if (currentUser.value === null) {
        return "";
    }
    else {
        return `Welcome, ${currentUser.value.first_name}!`
    }
})


// this defines the simulation stages
// const statusArray = ["Case list", "Case brief", "Simulate", "Result Analysis"]

// const simulationStage = ref(0)  // records the user's stage in simulation 

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
//         simulationStage.value = 1
//     }
// }

// function handleClickStatus(statusName) {
//     var index = statusArray.indexOf(statusName);
//     if (index === -1) {
//         index = 0;
//     }
//     simulationStage.value = index;
// }

// function handleClickProceed() {
//     simulationStage.value = 2;
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
    <!-- <LeftNav></LeftNav> -->

    <div>
        <CustomTitle :title=titleText ></CustomTitle>
<!-- 
        <div id="contentGrouped" v-if="userInfo.groupId != ''">
            <div id="statusList">
                <span class="statusItem" v-for="(status, index) in statusArray" :key="index">
                    <button class="statusButton" :disabled="index > simulationStage"
                        @click="() => handleClickStatus(status)">
                        {{ status }}
                    </button>
                </span>
            </div>

            <KeepAlive>
                <CaseSelectionView v-if="simulationStage === 0" :case-info="caseNames" @on-select-case="handleSelectCase">
                </CaseSelectionView>
                <CaseBriefView v-else-if="simulationStage === 1" :case-id="currentCaseId"
                    @on-click-proceed="handleClickProceed"></CaseBriefView>

                <div v-else-if="simulationStage === 2">
                    <component :is="simulators[currentCaseId]"></component>
                </div>
            </KeepAlive>
        </div> -->

        <!-- <div id="contentUngrouped" v-else> -->
            <!-- <h2>It appears you are not in a team yet. Please join or create a team first.</h2>
            <button id="okayButton" type="button" @click="router.push({ name: flag_routes.grouping })">Okay!</button> -->
        <!-- </div> -->

    </div>
</template>


<style scoped>
h1 {
    padding-top: 1em;
    padding-left: 5em;
}

h2 {
    padding-top: 25vh;
    text-align: center;
}

#okayButton {
    display: block;
    margin: 0 auto;
    height: 5vh;
    margin-top: 5vh;
}


#statusList {
    margin-top: 1em;
    list-style: none;
    display: flex;
    flex-direction: row;
}

#okayButton {
    text-align: center;
    width: 10vw;
}


.statusButton {
    background-color: bisque;
    border: 0;
    width: 12em;
}


.statusButton:hover[renderFlag=enabled] {
    background-color: beige;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, .2);
}


.statusItem {
    text-align: center;
    vertical-align: center;
    font-size: 1em;
    height: 2em;
    width: 12em;
    margin-right: 2em;
    border-width: 2cap;
    border-color: antiquewhite;
}
</style>