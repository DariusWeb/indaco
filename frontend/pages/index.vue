<template>
    <div class="container mt-12">
        <h1 class="text-3xl font-bold mb-4">Legal documents</h1>

        <div v-if="loading">Loading…</div>
        <div v-if="error" class="text-red-600">Error: {{ error.message || String(error) }}</div>

        <DocumentList :documents="docs" />
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue'
    import DocumentList from '~/components/DocumentList.vue'
    import { useDocuments } from '~/composables/useDocuments'
    import { useDocStore } from '~/stores/useDocStore'

    const store = useDocStore()
    const { docs, loading, error, fetchAll } = useDocuments()

    onMounted(async () => {
        await fetchAll()
        store.setDocs(docs.value)
    })
</script>