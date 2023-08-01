<script setup lang="ts">
import { ref } from 'vue';
import TopStreak from '../components/TopStreak.vue'
import BottomStreak from '../components/BottomStreak.vue'
import SignInView from './portalChildren/SignInView.vue'
import SignUpView from './portalChildren/SignUpView.vue'
import ForgetPasswordView from './portalChildren/ForgetPasswordView.vue'
import {Button} from 'ant-design-vue'


type ViewState =
    | "signIn"
    | "signUp"
    | "passwordReset"

const pageState = ref<ViewState>("signIn");

function switchChildren(stateStr: ViewState) {
    pageState.value = stateStr;
}

</script>

<template>
    <TopStreak></TopStreak>

    <div>
        <div id="titleDiv">
            <h1>BMGT435 Simulation</h1>
            <h2>Experiential Learning Platform</h2>
            <hr>
        </div>

        <nav id="portalNav">
            <div>
                <Button type="link" @click="switchChildren('signIn')">Sign In</Button>
            </div>
            <div>
                <Button type="link" @click="switchChildren('signUp')">Sign Up</Button>
            </div>
            <div>
                <Button type="link" @click="switchChildren('passwordReset')">Forget Password</Button>
            </div>
        </nav>

        <SignInView v-if="pageState === 'signIn'"></SignInView>
        <SignUpView v-else-if="pageState === 'signUp'"></SignUpView>
        <ForgetPasswordView v-else-if="pageState === 'passwordReset'"></ForgetPasswordView>
    </div>

    <BottomStreak></BottomStreak>
</template>

<style scoped>
form {
    position: relative;
    top: 40%;
}

h1,
h2 {
    position: relative;
    text-shadow: 2vh;
    text-align: center;
}


h3 {
    font-weight: 12;
    font-size: 18px;
    position: relative;
    text-align: center;
    text-shadow: 2vh;
}

#portalNav {
    text-align: center;
    display: flex;
    flex-direction: row;
}
</style>