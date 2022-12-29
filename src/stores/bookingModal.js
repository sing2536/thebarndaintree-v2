import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useLoaderStore } from './loader'
import { useTableFilter } from './tableFilter'
import { useBookingSearchStore } from '../stores/bookingSearch';
import { usePropertiesStore } from './properties';

export const useBookingModalStore = defineStore('bookingModal', () => {
  const loader = useLoaderStore()
  const tableFilter = useTableFilter()
  const bookingSearch = useBookingSearchStore()
  const properties = usePropertiesStore()
  const modal = ref(false)
  const creating = ref(false)
  const data = reactive({
    id: null,
    status: null,
    name: null,
    quote: null,
    checkIn: null,
    checkOut: null,
    adults: null,
    children: null,
    source: null,
    // ferry: null,
    phone: null,
    email: null,
    comment: null,
    property: null,
    propertyId: null,
    receipts : [],
    comments: [],
  })

  async function save(chaining) {
    loader.active = true
    const req = await fetch(`api/bookings/${data.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if (req.status != 200) return loader.active = false, confirmModal.show({title: 'Error', message: 'There was a problem processing your request'})
    if (bookingSearch.active) await bookingSearch.search()
    tableFilter.getData()
    if (chaining) return
    close()
  }

  async function createSave() {
    loader.active = true
    data.propertyId = properties.selected
    const req = await fetch('api/bookings/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if (req.status != 200) return loader.active = false, confirmModal.show({title: 'Error', message: 'There was a problem processing your request'})
    tableFilter.getData()
    close()
  }

  function create(item) {
    creating.value = true
    if (item) for (let field of Object.keys(data)) data[field] = item[field]
    modal.value = true
  }

  function open(item) {
    for (let field of Object.keys(data)) data[field] = item[field]
    modal.value = true
  }

  async function openSync(item) {
    loader.active = true
    const booking = await fetch(`./api/bookings/${item.id}?properties=${item.propertyId}`)
    open(await booking.json())
    loader.active = false
  }

  function close() {
    modal.value = false
    creating.value = false
    for (let field of Object.keys(data)) data[field] = null
  }
  
  // watch(() => data.checkIn, (val) => {
  //   if (!val || data.checkOut) return
  //   data.checkOut = data.checkIn
  //   console.log('ran');
  // })

  return { modal, creating, data, open, openSync, create, close, save, createSave }
})
