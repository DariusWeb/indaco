<template>
    <div>
        <div class="flex gap-2 items-center mb-12">
            <UInput v-model="search" icon="i-lucide-search" size="sm" color="neutral"
                placeholder="Search document..." />
        </div>

        <ul>
            <li v-for="(doc, index) in filtered" :key="doc.id" class="py-3"
                :class="index < filtered.length - 1 ? 'border-b' : ''">
                <NuxtLink :to="`/documents/${doc.metadata.slug}`" class="document-link text-lg font-semibold">{{
                    doc.metadata.title }}
                </NuxtLink>

                <div class="text-sm text-muted">{{ doc.metadata.jurisdiction }} • {{ doc.metadata.date_enacted }}</div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'

    const props = defineProps<{ documents: any[] }>()

    const search = ref('')

    const filtered = computed(() => {
        const list = props.documents || []
        const searchLower = search.value.toLowerCase()

        return list.filter(d => {
            if (searchLower && !(d.metadata.title.toLowerCase().includes(searchLower) || ('').toLowerCase().includes(searchLower))) return false
            return true
        })
    })
</script>