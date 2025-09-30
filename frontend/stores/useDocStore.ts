import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocStore = defineStore('docs', () => {
  const docs = ref<any[]>([])
  const lastFetched = ref<number | null>(null)

  function setDocs(payload: any[]) {
    docs.value = payload
    lastFetched.value = Date.now()
  }

  function findBySlug(slug: string) {
    return docs.value.find(d => d.metadata?.slug === slug)
  }

  return { docs, lastFetched, setDocs, findBySlug }
})