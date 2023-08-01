<script setup lang="ts">
import { signUp, type SignUpForm } from '../../utils/userUtils';
import { AxiosResponse } from 'axios';
import { computed, reactive, ref } from 'vue';
import InLineMsg from '@/components/InLineMsg.vue';
import { type InLineMsgConfig } from '@/components/componentTypes';


const signUpForm = reactive<SignUpForm>({} as SignUpForm);
const inlineMsgState = reactive<InLineMsgConfig>({ show: false, content: "" });
const isLoadingSignUp = ref<boolean>(false);
const password_retype = ref<string>("");
const passwordMatch = computed(() => signUpForm.password === password_retype.value)


function handleSignUp() {
    if (!passwordMatch.value) {
        // logic
        inlineMsgState.content = "Passwords do not match!";
        inlineMsgState.show = true;
    }
    else {
        inlineMsgState.show = false;
        isLoadingSignUp.value = true;
        signUp(signUpForm, (resp: AxiosResponse) => {
            if (resp.status === 200) {
                inlineMsgState.content = "Sign up successful! Redirecting to sign in page..."
                inlineMsgState.show = true;
            }
            else {
                // logic
                inlineMsgState.content = resp.data;
                inlineMsgState.show = true;
            }
            isLoadingSignUp.value = false;
        });
    }
}
</script>

<template>

    <div>

        <h2 id="signUpTitle">User Sign Up</h2>
        <form autocomplete="on" id="signUpForm" @submit.prevent="handleSignUp">
            <div class="formComponent">
                <label for="did">direcotry id</label>
            </div>
            <div class="formComponent">
                <input type="text" name="did" v-model.lazy="signUpForm.did">
            </div>
            <div class="formComponent">
                <label for="password">password</label>
            </div>
            <div class="formComponent">
                <input type="password" name="password" v-model="signUpForm.password">
            </div>
            <div class="formComponent">
                <label id="passwordLabel" :passwordMatch="passwordMatch" for="check_password">verify password</label>
            </div>
            <div class="formComponent">
                <input type="password" name="check_password" v-model="password_retype" >
            </div>
            <div class="formComponent">
                <InLineMsg :show="inlineMsgState.show" :content="inlineMsgState.content"></InLineMsg>
                <input type="submit" value="Sign Up" :disabled="isLoadingSignUp">
            </div>
        </form>
    </div>

</template>