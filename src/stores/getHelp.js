import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGetHelpStore = defineStore('getHelp', () => {
    const modal = ref(false)

    function open() {
        modal.value = true
    }

    function close() {
        modal.value = false
    }

    return { modal, open, close }
})
