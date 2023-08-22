<script setup lang="ts">
import { useModal } from '@/utils/modalUtils';

const { showModal, closeModal } = useModal();

function handleClick() {
    // showModal({
    //     title: 'Send your feedback',
    //     message: 'Please send your feedback',
    //     onConfirm: closeModal,
    //     onCancel: closeModal,
    // });

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
.feedbackDiv {
    position: fixed;
    bottom: 10px;
    right: 10px;
    padding: 0;
    margin: 0;
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
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.8);
}

.feedbackImg:hover {
    background-color: var(--color-red-umd-dark);
}

.feedbackDiv:hover::after {
  content: "feedback";
  position: absolute;
  left: 0;
  top:-5px;
  transform: translate(-0px, -100%);
  background-color:beige;
  color: black;
  padding: 5px 5px;
}
</style>