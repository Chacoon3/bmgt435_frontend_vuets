<script setup lang="ts">
import { useModal } from '@/utils/modalUtils';

const { showModal, closeModal } = useModal();

function handleClick() {
    showModal({
        title: 'Send your feedback',
        message: 'Please send your feedback',
        onConfirm: closeModal,
        onCancel: closeModal,
    });

}
</script>

<template>
    <div class="feedbackDiv">
        <button class="feedbackButton" @click="handleClick">
            <img class="feedbackImg" src="/icons/feedback/feedback.svg" alt="feedback">
        </button>
    </div>
</template>

<style scoped>
#feedbackDiv {
    position: fixed;
    bottom: 10px;
    right: 10px;
}

.feedbackButton{
    border: 0;
    background-color: transparent;
}

.feedbackButton:hover{
    cursor: pointer;
}

.feedbackImg {
    margin: 0;
    padding: 10px;
    background-color: var(--color-red-umd);
}

.feedbackImg:hover {
    background-color: var(--color-red-umd-dark);
}
</style>