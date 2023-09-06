<script setup lang="ts">
import { reactive } from 'vue';
import InLineMsg from '@/components/InLineMsg.vue';
import type { InLineMsgConfig } from '@/components/types';


const inlineMsgState = reactive<InLineMsgConfig>({ show: false, content: "", type: "error" });

const formData = reactive({ did: "" })

function handleForgetPassword() {
    if (formData.did === "") {
        inlineMsgState.content = "Please input directory ID!"
        inlineMsgState.show = true;
    }
    else {
        // logic
        throw new Error("Not implemented yet!")
    }
}
</script>

<template>
    <div class="portalSubmodule">
        <InLineMsg :show="inlineMsgState.show" :content="inlineMsgState.content"></InLineMsg>
        <form autocomplete="off" @submit.prevent="handleForgetPassword">
            <div class="formDiv">
                <label>directory ID</label>
            </div>
            <div class="formDiv">
                <input class="inputField" type="text" name="did" v-model="formData.did" placeholder="directory ID">
            </div>
            <div class="formDiv">
                <input type="submit" value="Send reset request">
            </div>
        </form>
    </div>
</template>