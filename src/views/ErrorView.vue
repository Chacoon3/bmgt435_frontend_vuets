<script setup lang="ts">
import useErrorUtil from '../utils/errorUtils';

const { errorContext } = useErrorUtil();
</script>

<template>
    <div>
        <h2>Application crashed ...</h2>
        <p>{{errorContext.message ?? errorContext.error}}</p>
    </div>
</template>