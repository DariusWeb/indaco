<template>
    <div class="container mt-12">
        <NuxtLink icon="i-lucide-arrow-left" to="/">
            <UIcon name="i-lucide-arrow-left" class="size-3" /> Back
        </NuxtLink>

        <div class="mt-6">
            <div v-if="!doc">Document not found.</div>

            <div v-else>
                <h2 class="text-3xl font-bold mb-2">{{ doc.metadata.title }}</h2>
                <div class="text-sm text-muted mb-4">{{ doc.metadata.jurisdiction }} • {{ doc.metadata.date_enacted }}
                </div>

                <DocumentTree :root="{ sections: doc.sections }" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { useDocStore } from '~/stores/useDocStore'
    import { onMounted } from 'vue'
    import DocumentTree from '~/components/DocumentTree.vue'

    const route = useRoute()
    const slug = route.params.slug as string
    const store = useDocStore()

    const doc = store.findBySlug(slug)

    // If store doesn't have data (e.g., direct link), fetch all on mount
    onMounted(async () => {
        if (!doc) {
            const runtime = useRuntimeConfig()
            const base = runtime.public.apiBase
            const all = await $fetch(`${base}/documents`)
            store.setDocs(all)
        }
    })
</script>

<style scoped>
    .text-muted {
        @apply text-gray-500
    }
</style>