<script setup lang="ts">
import { reactive } from 'vue'
import TopStreak from '../components/TopSterak.vue'
import BottomStreak from '../components/BottomStreak.vue'
import router, { routePaths } from '../router';
import { type AxiosResponse } from 'axios';
import { type SignInForm, signIn } from '../utils/userUtils';


const signInForm = reactive<SignInForm>({} as SignInForm);

const msgPopState = reactive({
    isOn: false,
    prompt: '',
})

function handleSignIn() {
    if (signInForm.did === "" || signInForm.password === "") {
        // logic
    }
    else {
        // logic
        signIn(signInForm, (resp:AxiosResponse) => {
            if (resp.status === 200) {
                // logic
                router.push({ name: routePaths.workbench })
            }
            else {
                // logic
            }
        })

    }
}
</script>


<template>
    <TopStreak></TopStreak>

    <Teleport to="body">
        <MsgPop :is-on="msgPopState.isOn" :prompt-text="msgPopState.prompt"
            :handle-click-yes="() => msgPopState.isOn = false">
        </MsgPop>
    </Teleport>

    <div id="titleDiv">
        <h1>BMGT435 Simulation</h1>
        <h2>Experiential Learning Platform</h2>
        <hr>
    </div>

    <form @submit.prevent="handleSignIn" autocomplete="on" enctype="text/plain">
        <h3>user portal</h3>
        <div class="lineDiv">
            <input class="inputField" type='text' name="user_did" placeholder="user name" v-model.lazy="signInForm.did">
        </div>
        <div class="lineDiv">
            <input class="inputField" type="password" name='user_password' placeholder="password" v-model.lazy="signInForm.password">
        </div>
        <div class="lineDiv">
            <button type="submit">Sign In </button>
            <button type="button" @click="$router.push({ name: routePaths.forgetPassword })">Forget password?</button>
        </div>
    </form>

    <div class="lineDiv">
        <button type="button" @click="$router.push({ name: routePaths.signUp })">Sign Up</button>
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

button {
    margin: 5px;
}

.lineDiv {
    padding-bottom: 1%;
    text-align: center;
}

input.inputField {
    width: 175px;
    height: 20px;
}

input[type="button"] {
    height: 25px;
}

input[type="submit"] {
    height: 25px;
}


label {
    padding-left: 10px;
    padding-right: 10px;
}
</style>@/utils/apis