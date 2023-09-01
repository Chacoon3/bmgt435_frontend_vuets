<script setup lang="ts">
import { type ProgressBoxConfig} from '@/utils/progressBoxUtils';

defineProps<{config: ProgressBoxConfig}>();
</script>

<template>
    <Transition name="modal">
        <div class="modal-mask">
            <div class="modal-container">
                <div class="modal-header" v-if="$props.config.title">
                    <span>{{ $props.config.title }}</span>
                </div>

                <div class="modal-body" v-if="$props.config.message">
                    <span> {{ $props.config.message }}</span>
                </div>

            </div>
        </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: opacity 0.3s ease;
}

.modal-container {
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

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
}


/*
 * 对于 transition="modal" 的元素来说
 * 当通过 Vue.js 切换它们的可见性时
 * 以下样式会被自动应用。
 *
 * 你可以简单地通过编辑这些样式
 * 来体验该模态框的过渡效果。
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

/* .modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
} */
</style>.