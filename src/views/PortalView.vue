<script setup lang="ts">
import SignInView from './portalChildren/SignInView.vue'
import SignUpView from './portalChildren/SignUpView.vue'
import ForgetPasswordView from './portalChildren/ForgetPasswordView.vue'
import { Button } from 'ant-design-vue'
import { usePortalState } from '../utils/portalUtils'

const {portalState, setPortalState} = usePortalState();


</script>

<template>

    <div>
        <div class="streak" loc="top"></div>

        <div id="titleDiv">
            <h1>BMGT435 Simulation</h1>
            <h2>Experiential Learning Platform</h2>
            <hr>
        </div>

        <div id="portalNav">
            <Button type="link" @click="setPortalState('signIn')"
                :disabled="portalState === 'signIn'">Sign In</Button>
            <Button type="link" @click="setPortalState('signUp')"
                :disabled="portalState === 'signUp'">Sign Up</Button>
            <Button type="link" @click="setPortalState('passwordReset')"
                :disabled="portalState === 'passwordReset'">Forget Password</Button>
        </div>

        <div>
            <SignInView v-if="portalState === 'signIn'"></SignInView>
            <SignUpView v-else-if="portalState === 'signUp'"></SignUpView>
            <ForgetPasswordView v-else-if="portalState === 'passwordReset'"></ForgetPasswordView>
        </div>
    </div>

    <div class="streak" loc="bottom"></div>
</template>

<style scoped>
.streak {
    width: 100vw;
    height: 10vh;
    background-color: var(--color-red-umd);
}

div[loc=bottom] {
    position: fixed;
    bottom: 0;
}

h1,
h2 {
    position: relative;
    text-shadow: 2vh;
    text-align: center;
}

#portalNav {
    text-align: center;
}
</style>