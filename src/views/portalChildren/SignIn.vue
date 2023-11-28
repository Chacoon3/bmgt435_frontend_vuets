<script setup lang="ts">
import { reactive } from 'vue'
import {type SignInForm, useSignIn } from '../../utils/userUtils';
import InLineMsg from '@/components/InLineMsg.vue';
import router, {routePaths} from '@/router';
import { validateText } from '@/utils/formUtils'
import type { InLineMsgConfig } from '@/components/types';

const { isLoading, signIn } = useSignIn()
const signInForm = reactive<SignInForm>({
    did: "",
    password: ""
});

const inlineMsgState : InLineMsgConfig = reactive({
    show: false,
    content: "",
    type: "error",
    textAlign: "center",
})

function handleSignIn() {
    if (!validateText(signInForm.did) || !validateText(signInForm.password)) {
        inlineMsgState.content = "Please input directory ID and password!"
        inlineMsgState.show = true;
    }
    else {
        inlineMsgState.show = false;
        inlineMsgState.content = "";
        signIn(
            signInForm,
            () => router.push({ name: routePaths.workbench}),
            (errorMsg:string) => {
                inlineMsgState.content = errorMsg;
                inlineMsgState.show = true;
            }
        );
    }
}

</script>


<template>
    <div class="portalSubmodule">
        <InLineMsg :config="inlineMsgState"></InLineMsg>
        <form @submit.prevent="handleSignIn" autocomplete="on">
            <div class="formDiv">
                <label>directory ID</label>
            </div>
            <div class="formDiv">
                <input class="inputField" type='text' name="did" placeholder="directory ID" v-model.lazy="signInForm.did">
            </div>
            <div class="formDiv">
                <label>password</label>
            </div>
            <div class="formDiv">
                <input class="inputField" type="password" name='password' placeholder="password"
                    v-model.lazy="signInForm.password">
            </div>
            <div class="formDiv">
                <input type="submit" :disabled="isLoading" :value="isLoading? 'Signing in ...' : 'Sign In'">
            </div>
        </form>
    </div>
</template>