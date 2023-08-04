<script setup lang="ts">
import { reactive } from 'vue'
import { SignInForm, useSignIn, useCurrentUser } from '../../utils/userUtils';
import InLineMsg from '@/components/InLineMsg.vue';
import router, {routePaths} from '@/router';
import { validateText } from '@/utils/formUtils'

const { isLoading, signIn } = useSignIn()
const {setCurrentUser} = useCurrentUser();
const signInForm = reactive<SignInForm>({
    did: "",
    password: ""
});

const inlineMsgState = reactive({
    show: false,
    msg: ""
})

function handleSignIn() {
    if (!validateText(signInForm.did) || !validateText(signInForm.password)) {
        inlineMsgState.msg = "Please input directory ID and password!"
        inlineMsgState.show = true;
    }
    else {
        inlineMsgState.show = false;
        inlineMsgState.msg = "";
        signIn(signInForm, (resp) => {
            if (resp.status === 200) {
                setCurrentUser(resp.data);
                router.push({ name: routePaths.workbench})
            }
            else {
                inlineMsgState.msg = resp === null ? "Sign in failed for unknwon error!" : resp.data;
                inlineMsgState.show = true;
            }
        });
    }
}

</script>


<template>
    <div class="portalSubmodule">
        <InLineMsg :show="inlineMsgState.show" :content="inlineMsgState.msg"></InLineMsg>
        <form @submit.prevent="handleSignIn" autocomplete="on">
            <div class="formDiv">
                <label for="did">directory ID</label>
            </div>
            <div class="formDiv">
                <input class="inputField" type='text' name="did" placeholder="directory ID" v-model.lazy="signInForm.did">
            </div>
            <div class="formDiv">
                <label for="password">password</label>
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


<style scoped>
@import url(./portalChildrenStyle.css);
</style>