<script setup lang="ts">
import { useSubmitFeedback, useFeedbackModal } from '@/utils/feedbackUtils'
import { computed, ref } from 'vue';
import InLineMsg from './InLineMsg.vue';
import { useCurrentUser } from '@/utils/userUtils';
import { type InLineMsgConfig } from './types';
import { useModal } from '@/utils/modalUtils';


const { showModal, closeModal } = useModal();
const { currentUser } = useCurrentUser();
const MAX_FEEDBACK_CHARS = 1000;
const inlineMsgState = computed<InLineMsgConfig>(() => {

    if (feedbackText.value.length > MAX_FEEDBACK_CHARS) {
        return {
            show: true,
            content: "Feedback cannot be more than 500 characters",
            type: "error"
        }
    }
    else {
        return {
            show: true,
            content: `Characters left: ${MAX_FEEDBACK_CHARS - feedbackText.value.length}`,
            type: "normal"
        }
    }
});

const feedbackText = ref<string>('');
const { isSubmitting, submitFeedback } = useSubmitFeedback();
const { closeFeedbackModal } = useFeedbackModal();

function handleSubmit() {
    if (isSubmitting.value === true) return;


    if (feedbackText.value.length > 0) {
        if (currentUser.value && currentUser.value.id) {
            submitFeedback({
                user_id: currentUser.value.id,
                content: feedbackText.value
            }, (resp) => {
                closeFeedbackModal();
                if (resp.status === 200) {
                    showModal({
                        title: "Feedback submitted",
                        message: "Thank you for your feedback!",
                        onConfirm:closeModal,
                    }
                    );
                }
                else {
                    showModal({
                        title: "Failed to submit feedback",
                        message: "Please try again later!",
                        onConfirm:closeModal,
                    }
                    );
                }
            });
        }
        else {
            throw new Error("Invalid user status! Please sign in and retry!");
        }
    }
    else {
        showModal({
            title: "Empty feedback",
            message: "Please enter your feedback!",
            onConfirm:closeModal,
        }
        );
    }
}
</script>

<template>
    <div class="feedbackFormMask">
        <div class="feedbackFormContainer">
            <div class="feedbackFormTitle">
                <h3>Share your feedback</h3>
            </div>

            <div class="feedbackFormBody">
                <textarea class="feedbackTextarea" maxlength="{{MAX_CHARACTERS}}" spellcheck="true"
                    v-model="feedbackText"></textarea>
                <InLineMsg :show="true" :content="inlineMsgState.content" :type="inlineMsgState.type"></InLineMsg>
            </div>

            <div class="feedbackFormFooter">
                <button class="normalButton" @click="handleSubmit" :disabled="isSubmitting">
                    {{ isSubmitting ? "Submitting..." : "Submit" }}</button>
                <button class="normalButton" @click="closeFeedbackModal">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.feedbackFormMask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: opacity 0.3s ease;
}

.feedbackFormContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.feedbackFormTitle {
    text-align: center;
}

.feedbackFormBody {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.feedbackTextarea {
    text-align: justify;
    min-height: 200px;
    resize: none;
}

.feedbackFormFooter {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>