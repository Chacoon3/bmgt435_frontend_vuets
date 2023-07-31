<script setup lang="ts">
import { signUp, type SignUpForm } from '@/utils/userUtils';
import { AxiosResponse } from 'axios';
import { computed, reactive, ref } from 'vue';
import router, {routePaths} from '../router';


const signUpForm = reactive<SignUpForm>({} as SignUpForm);
const isLoadingSignUp = ref<boolean>(false);
const password_retype = ref<string>("");
const passwordMatch = computed(() => signUpForm.password === password_retype.value)


function handleSignUp() {
    if (! passwordMatch.value) {
        // logic
    }
    else {
        isLoadingSignUp.value = true;
        signUp(signUpForm, (resp: AxiosResponse) => {
            isLoadingSignUp.value = false;
            if (resp.status === 200) {
                // logic
                router.push({ name: routePaths.signIn })
            }
            else {
                // logic
            }
        });
    }
}
</script>

<template>
    <TopStreak></TopStreak>

<div>
    <h2 id="signUpTitle">User Sign Up</h2>
    <form autocomplete="on" id="signUpForm" @submit.prevent="handleSignUp">
        <div class="formComponent">
            <label for="user_did">direcotry id</label>
        </div>
        <div class="formComponent">
            <input type="text" name="user_did" v-model.lazy="signUpForm.did">
        </div>
        <div class="formComponent">
            <label for="user_password">password</label>
        </div>
        <div class="formComponent">
            <input type="text" name="user_password" v-model="signUpForm.password">
        </div>
        <div class="formComponent">
            <label id="passwordLabel" :passwordMatch="passwordMatch" for="check_password">verify password</label> 
        </div>
        <div class="formComponent">
            <input type="text" name="check_password" v-model = "password_retype">
        </div>
        <div class="formComponent">
            <input type="submit" value="Sign Up" :disabled="isLoadingSignUp">
        </div>
    </form>
</div>

<BottomStreak></BottomStreak>    
</template>