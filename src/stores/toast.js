import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useToastStore = defineStore('toast', () => {
  const router = useRouter()
  const id = ref(0)
  const toasts = reactive([])

  function add(data) {
    if (data.clear) clear()
    
    data.id = id.value++
    toasts.push(data)
  }

  function clear() {
    toasts.splice(0, toasts.length)
  }

  router.beforeEach(()=> clear() )
  
  return { toasts, add }
})
