<script setup lang="ts">
import SignInView from './portalChildren/SignIn.vue'
import SignUpView from './portalChildren/SignUp.vue'
import ForgetPasswordView from './portalChildren/PasswordReset.vue'
import { usePortalState } from '../utils/portalUtils'

const { portalState, setPortalState } = usePortalState();

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
            <button @click="setPortalState('signIn')" :disabled="portalState === 'signIn'">Sign In</button>
            |<button @click="setPortalState('signUp')" :disabled="portalState === 'signUp'">Sign Up</button>
            |<button @click="setPortalState('passwordReset')" :disabled="portalState === 'passwordReset'">Password
                Reset</button>
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

button {
    transition: var(--transition-button);
    padding: 0;
    margin: 0;
    width: 110px;
    color: #e21833;
    border: none;
    background-color: transparent;
    text-align: center;
}

button:hover {
    color: lightcoral;
}

button:disabled {
    color: lightgrey;
}
</style>