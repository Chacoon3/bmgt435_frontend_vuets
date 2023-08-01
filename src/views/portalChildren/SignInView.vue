<script setup lang="ts">
import { reactive } from 'vue'
import { type AxiosResponse } from 'axios';
import { type SignInForm, signIn } from '../../utils/userUtils';

const signInForm = reactive<SignInForm>({
    did: "",
    password: ""
});

const signInState = reactive({
    isSigningIn: false,
    isError: false,
    errorMsg: ""
})

function handleSignIn() {
    if (signInForm.did === "" || signInForm.password === "") {
        signInState.errorMsg = "Please input directory id and password!"
        signInState.isError = true;
    }
    else {
        signInState.isSigningIn = true;
        signInState.isError = false;
        signInState.errorMsg = "";
        signIn(signInForm, (resp: AxiosResponse) => {
            if (resp.status === 200) {
                // router.push({ name: routePaths.workbench })
            }
            else {
                signInState.errorMsg = resp.data;
                signInState.isError = true;
            }
            signInState.isSigningIn = false;
        })

    }
}

</script>


<template>

        <h3>user portal</h3>
        <span v-if="signInState.isError" id="errorText">{{ signInState.errorMsg }}</span>
        <form @submit.prevent="handleSignIn" autocomplete="on" enctype="text/plain">
            <div class="lineDiv">
                <input class="inputField" type='text' name="did" placeholder="directory ID" v-model.lazy="signInForm.did">
            </div>
            <div class="lineDiv">
                <input class="inputField" type="password" name='password' placeholder="password"
                    v-model.lazy="signInForm.password">
            </div>
            <div class="lineDiv">
                <button type="submit" :disabled="signInState.isSigningIn">Sign In </button>
            </div>
        </form>

</template>


<style scoped>
form {
    position: relative;
    top: 40%;
}

#errorText {
    display: block;
    color: red;
    text-align: center;
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