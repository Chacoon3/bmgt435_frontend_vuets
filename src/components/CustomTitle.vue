<script setup lang="ts">
import {type CustomTitleConfig} from './types';

withDefaults(defineProps<CustomTitleConfig>(),
    {
        titleType: "success",
        title:''
    }
);
</script>

<template>
    <h1>{{ title }}</h1>
</template>