import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useLoaderStore } from './loader'
import { useTableFilter } from '../stores/tableFilter';

export const usePropertiesStore = defineStore('properties', () => {
  const loader = useLoaderStore()
  const tableFilter = useTableFilter()
  const modal = ref(false)
  const creating = ref(false)
  const list = reactive([])
  const selected = ref()
  const ready = ref(false)
  const data = reactive({
    id: null,
    name: null,
    businessId: null,
    email: null,
    phone: null,
  })

  async function getProperties() {
    loader.active = true //needs to be here for page refresh etc
    const req = await fetch('api/properties')
    const data = await req.json()
    list.length = 0
    list.push(...data)
    //default to first property for now.
    ready.value = true
    loader.active = false
    if (list.length) return selected.value = data[0].id
  }

  async function save() {
    loader.active = true
    const firstProperty = list.length ? false:true
    if (creating.value) {
      await fetch(`api/properties`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    } else {
      await fetch(`api/properties`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    }
    await getProperties()
    //below is needed for calendar to load for new users after creating first property
    if (firstProperty) await tableFilter.getData()
    loader.active = false
    close()
  }

  function create() {
    creating.value = true
    modal.value = true
  }

  function edit(item) {
    for (let field of Object.keys(data)) data[field] = item[field]
    modal.value = true
  }

  async function open(item) {
    loader.active = true
    // const property = await fetch('./api/bookings/'+item.id)
    // const propertyData = await property.json()
    // for (let field of Object.keys(data)) data[field] = propertyData[field]
    loader.active = false
    modal.value = true
  }

  function close() {
    modal.value = false
    creating.value = false
    for (let field of Object.keys(data)) data[field] = null
  }

  function getIds() {
    return list.map(x => x.id)
  }

  return { modal, creating, data, open, create, close, save, selected, list, getProperties, getIds, ready, edit }
})
