<script setup>
import { usePropertiesStore } from '../stores/properties'
import { useTableFilter } from '../stores/tableFilter';
import CalendarHelp from './CalendarHelp.vue';
import PropertyEmpty from './PropertyEmpty.vue';
import PropertyModal from './PropertyModal.vue';

const properties = usePropertiesStore()
const tableFilter = useTableFilter()

async function selected() {
  await tableFilter.getData()
}
</script>

<template>
    <PropertyEmpty />
    <template v-if="properties.ready && properties.list.length">
      <div class="actions">
        <CalendarHelp />
        <div class="field">
          <label>Property</label>
          <select v-model="properties.selected" @change="selected()">
              <option v-for="item in properties.list" :value="item.id">{{item.name}}</option>
          </select>
        </div>
      </div>
    </template>
    <PropertyModal />
</template>

<style lang="less" scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--gap-small);
  width: 100%;
  margin-bottom: var(--gap-small);
  align-items: flex-end;

  .field {
    width: 200px;
    padding: 0;
    flex: unset;
  }
}

@media (max-width: 500px) {
    .field {
      width: 100% !important;
    }
}
</style>