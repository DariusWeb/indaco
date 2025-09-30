<template>
    <div class="container mt-12">
        <h1 class="text-2xl font-bold mb-4">Admin — Documents</h1>

        <div class="flex items-center gap-2" v-if="!loggedIn">
            <label>Password (demo):</label>
            <UInput v-model="pwd" type="password" color="neutral" class="w-64" />
            <button @click="login" class="ml-2 btn">Login</button>
        </div>

        <div v-else>
            <button @click="logout" class="btn-ghost mb-4">Logout</button>

            <ul>
                <li v-for="d in docs" :key="d.id" class="py-3 border-b flex justify-between items-center">
                    <div>
                        <div class="font-semibold">{{ d.metadata.title }}</div>
                        <div class="text-sm text-muted">{{ d.metadata.slug }}</div>
                    </div>

                    <div class="flex gap-2">
                        <button @click="edit(d)" class="btn">Edit</button>
                        <button @click="remove(d)" class="btn-ghost">Delete</button>
                    </div>
                </li>
            </ul>

            <div v-if="editing" class="mt-6">
                <h3 class="font-bold mb-2">Editing: {{ editing.metadata.title }}</h3>
                <AdminEditor :document="editing" @saved="onSaved" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useRuntimeConfig } from '#app'
    import AdminEditor from '~/components/AdminEditor.vue'
    import { useDocuments } from '~/composables/useDocuments'
    import { useDocStore } from '~/stores/useDocStore'

    const cfg = useRuntimeConfig()
    const pwd = ref('')
    const loggedIn = ref(true) // for demo, start logged in
    const editing = ref<any | null>(null)

    const { docs, fetchAll, updateDocument } = useDocuments()
    const store = useDocStore()

    async function init() {
        await fetchAll()
        store.setDocs(docs.value)
    }
    init()

    function login() {
        if (pwd.value === cfg.adminPassword) { loggedIn.value = true } else { alert('Wrong password (demo)') }
    }

    function logout() { loggedIn.value = false }

    function edit(d: any) { editing.value = JSON.parse(JSON.stringify(d)) }

    async function remove(d: any) {
        if (!confirm('Delete document?')) return
        const runtime = useRuntimeConfig()
        await $fetch(`${runtime.public.apiBase}/documents/${d.id}`, { method: 'DELETE' })
        // refresh  
        await fetchAll()
    }

    function onSaved(updated: any) {
        alert('Saved — refreshing list')
        fetchAll().then(() => store.setDocs(docs.value))
    }
</script>

<style scoped>
    .btn {
        @apply bg-blue-600 text-white px-3 rounded
    }

    .btn-ghost {
        @apply border px-3 py-1 rounded
    }

    .text-muted {
        @apply text-gray-500
    }
</style>