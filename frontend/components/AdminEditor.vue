<template>
    <div>
        <label class="block mb-2 font-medium">Edit full document JSON</label>
        <textarea v-model="text" rows="18" class="w-full border p-2 rounded font-mono text-sm"></textarea>

        <div class="flex gap-2 mt-2">
            <button @click="save" class="btn">Save</button>
            <button @click="revert" class="btn-ghost">Revert</button>
            <span v-if="error" class="text-red-600">{{ error }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useRuntimeConfig } from '#app'

    const props = defineProps<{ document: any }>()
    const emit = defineEmits(['saved'])
    const text = ref(JSON.stringify(props.document, null, 2))
    const error = ref('')

    async function save() {
        try {
            error.value = ''
            const parsed = JSON.parse(text.value)
            const runtime = useRuntimeConfig()
            const base = runtime.public.apiBase
            await $fetch(`${base}/documents/${parsed.id}`, {
                method: 'PUT',
                body: parsed
            })
            emit('saved', parsed)
        } catch (e: any) {
            error.value = e.message || String(e)
        }
    }

    function revert() { text.value = JSON.stringify(props.document, null, 2) }
</script>

<style scoped>
    .btn {
        @apply bg-blue-600 text-white px-3 py-1 rounded
    }

    .btn-ghost {
        @apply border px-3 py-1 rounded
    }
</style>