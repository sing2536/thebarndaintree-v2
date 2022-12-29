import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'

export const useTableStore = defineStore('table', () => {
  var list = reactive([])

  return { list }
})
