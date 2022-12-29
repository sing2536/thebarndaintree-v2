import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const status = ref()
    const demo = ref()

    async function getData() {
        const req = await fetch('api/users')
        const data = await req.json()
        status.value = data.status
        demo.value = data.demo
    }

    return { status, demo, getData }
})
