import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useConfirmModalStore = defineStore('confirmModal', () => {
  const modal = ref(false)
  const data = reactive({
    title: null,
    message: null,
  })

  function show(item) {
    data.title = item.title
    data.message = item.message
    modal.value = true
  }

  function close() {
    modal.value = false
    data.title = null
    data.message = null
  }

  return { modal, data, show, close }
})
