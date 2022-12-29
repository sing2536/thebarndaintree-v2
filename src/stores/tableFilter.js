import { watch } from 'vue';
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';
import { useTableStore } from '../stores/table';
import { useLoaderStore } from './loader';
import { usePropertiesStore } from './properties';

export const useTableFilter = defineStore('tableFilter', () => {
  const table = useTableStore()
  const loader = useLoaderStore()
  const properties = usePropertiesStore()
  const selected = ref(1)
  const count = ref()
  const page = ref(1)
  const filters = reactive([
      {
          label: 'Upcoming bookings',
          id: 1,
      },
      {
          label: 'All bookings',
          id: 2,
      }
  ])

  async function getData() {
    loader.active = true
    const req = await fetch(`api/bookings?filter=${selected.value}&properties=${properties.selected}&page=${page.value}`)
    const data = await req.json()
    if (req.status == 200) table.list = data.rows, count.value = data.count
    loader.active = false
  }

  async function pageSelect(n) {
    page.value = n
    await getData()
    document.querySelector('#bookingTable').scrollIntoView({block: "start"})
  }

  watch([selected, () => properties.selected], () => page.value = 1)

  return { selected, filters, selected, getData, count, page, pageSelect }
})
