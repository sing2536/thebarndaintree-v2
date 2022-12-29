import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { usePropertiesStore } from './properties'

export const useBookingSearchStore = defineStore('bookingSearch', () => {
  const properties = usePropertiesStore()
  const active = ref(false)
  const query = ref('')
  const results = reactive([])
  const loading = ref(false)
  var searchDebounce

  async function search() {
    loading.value = true
    results.length = 0
    clearTimeout(searchDebounce)
    searchDebounce = setTimeout(async () => {
      const req = await fetch(`./api/bookings/search?query=${query.value.trim()}&properties=${properties.getIds()}`)
      loading.value = false
      results.push(...await req.json())
    }, 1000);
  }

  function reset() {
    active.value = false
    query.value = ''
    results.length = 0
  }

  watch(query, (val)=> {
    if (val.trim()) {
      search()
    } else {
      results.length = 0
      loading.value = false
      clearTimeout(searchDebounce)
    }
  })

  return { active, query, reset, loading, search, results  }
})
