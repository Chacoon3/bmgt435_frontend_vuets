<script setup lang="ts">
import { reactive } from 'vue';


const formData = reactive({ did: "" })

function handleForgetPassword() {
    if (formData.did === "") {
        // logic
    }
    else {
        // logic
    }
}
</script>

<template>

    <div id="container">
        <form autocomplete="off" @submit.prevent="handleForgetPassword">
            <h3 class="formElement">Reset password</h3>
            <div class="formElement">
                <label for="did">User name:</label>
            </div>
            <div class="formElement">
                <input type="text" name="did" v-model="formData.did">
            </div>
            <div class="formElement">
                <input type="submit" value="Reset password">
            </div>
        </form>
    </div>

</template>