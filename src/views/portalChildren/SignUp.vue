<script setup lang="ts">
import { useSignUp, type SignUpForm } from '../../utils/userUtils';
import { computed, reactive, ref } from 'vue';
import InLineMsg from '@/components/InLineMsg.vue';
import { type InLineMsgConfig } from '@/components/types';
import { usePortalState } from '@/utils/portalUtils';
import { validateText } from '@/utils/formUtils';


const { isLoading, signUp } = useSignUp();
const signUpForm = reactive<SignUpForm>({ did: "", password: "" });
const inlineMsgState = reactive<InLineMsgConfig>({ show: false, content: "", type: "error", textAlign: "center" });
const password_retyped = ref<string>("");
const passwordMatch = computed(() => signUpForm.password === password_retyped.value)
const { setPortalState } = usePortalState();

function clearFormData() {
    signUpForm.did = "";
    signUpForm.password = "";
    password_retyped.value = "";
}

function handleSignUp() {
    if (!passwordMatch.value) {
        // logic
        inlineMsgState.content = "Passwords do not match!";
        inlineMsgState.show = true;
    }
    else if (!validateText(signUpForm.did) || !validateText(signUpForm.password)) {
        inlineMsgState.content = "Please input directory ID and password!";
        inlineMsgState.show = true;
    }
    else {
        inlineMsgState.show = false;
        signUp(
            signUpForm,
            (msg) => {
                inlineMsgState.content = msg ?? "Sign up successful!"
                inlineMsgState.show = true;
                clearFormData();
                setTimeout(() => {
                    setPortalState('signIn');
                    inlineMsgState.content = ""
                    inlineMsgState.show = false;
                }, 1000);
            },
            (msg) => {
                inlineMsgState.content = msg ?? "Sign up failed for unknwon error!"
                inlineMsgState.show = true;
            }
        );
    }
}
</script>

<template>
    <div class="portalSubmodule">
        <InLineMsg :config="inlineMsgState"></InLineMsg>
        <form autocomplete="on" id="signUpForm" @submit.prevent="handleSignUp">
            <div class="formDiv">
                <label>directory ID</label>
            </div>
            <div class="formDiv">
                <input class="inputField" type="text" name="did" v-model.lazy="signUpForm.did" placeholder="directory ID">
            </div>
            <div class="formDiv">
                <label>password</label>
            </div>
            <div class="formDiv">
                <input class="inputField" type="password" name="password" v-model="signUpForm.password"
                    placeholder="password">
            </div>
            <div class="formDiv">
                <label id="passwordLabel" :passwordMatch="passwordMatch" for="check_password">verify password</label>
            </div>
            <div class="formDiv">
                <input class="inputField" type="password" name="check_password" v-model="password_retyped"
                    placeholder="password">
            </div>
            <div class="formDiv">
                <input type="submit" :value="isLoading ? 'Signing up...' : 'Sign Up'" :disabled="isLoading">
            </div>
        </form>
    </div>
</template>