import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useSidebarStore = defineStore('sidebar', () => {
    const router = useRouter()
    const active = ref(false)
    const collaps = ref(false)

    function toggleActive() {
        active.value = !active.value
    }

    router.afterEach(()=> {if (collaps.value) active.value = false})

    return { active, collaps, toggleActive }
})
