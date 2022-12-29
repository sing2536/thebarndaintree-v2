import { watch } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const nightTheme = ref(false)
  const storageName = 'nightTheme'

  function load() {
    if (JSON.parse(localStorage.getItem(storageName))) document.documentElement.className = 'night', nightTheme.value = true
  }

  watch(nightTheme, (val)=>{
    if (val) {
      document.documentElement.className = 'night'
    } else {
      document.documentElement.className = ''
    }

    localStorage.setItem(storageName, val)
  })

  load()

  return { nightTheme, load }
})
