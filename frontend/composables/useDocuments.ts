import { useRuntimeConfig } from '#app'
import { ref } from 'vue'

export function useDocuments() {
  const runtime = useRuntimeConfig()
  const base = runtime.public.apiBase
  const docs = ref<any[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchAll() {
    loading.value = true
    try {
      const res = await $fetch(`${base}/documents`)
      docs.value = res as any[]
    } catch (err: any) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function updateDocument(id: string, payload: any) {
    // json-server supports PUT/PATCH to /documents/:id
    return await $fetch(`${base}/documents/${id}`, {
      method: 'PUT',
      body: payload
    })
  }

  return { docs, loading, error, fetchAll, updateDocument }
}