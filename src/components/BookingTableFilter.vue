<script setup>
import { useTableFilter } from '../stores/tableFilter';

const tableFilter = useTableFilter()

function selected() {
    tableFilter.getData()
}

</script>

<template>
    <div class="field no-padding">
        <label>Filter</label>
        <select v-model="tableFilter.selected" @change="selected()">
            <option v-for="item in tableFilter.filters" :value="item.id">{{item.label}}</option>
        </select>
    </div>
</template>

<style lang="less" scoped>
.field {
    width: 200px;
}
@media (min-width: 500px) {
    .field {
      flex: none;
    }
}
</style>