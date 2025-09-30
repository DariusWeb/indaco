<template>
    <div>
        <SectionNode v-if="root" :node="root" />
    </div>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue'
    import SectionNode from './SectionNode.vue'

    const props = defineProps<{ root: any }>()
</script>