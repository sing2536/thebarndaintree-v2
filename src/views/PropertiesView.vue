<script setup>
import { onMounted } from 'vue';
import GoBackButton from '../components/GoBackButton.vue';
import PropertyModal from '../components/PropertyModal.vue';
import { usePropertiesStore } from '../stores/properties';

const properties = usePropertiesStore()

onMounted(()=> properties.getProperties())
</script>

<template>
    <div>
        <GoBackButton />
        <div class="header">
            <div>
                <h2>Manage Properties</h2>
                <p>Select a property below to make changes.</p>
            </div>
            <button class="raised primary" @click="properties.create()">New Property</button>
        </div>

        <table>
            <tr>
                <th>Name</th>
                <th class="mobile">Business Indentification</th>
                <th class="mobile">Email</th>
                <th class="mobile">Phone</th>
            </tr>
            <tr v-if="properties.list.length" v-for="item in properties.list" :key="item.index" @click="properties.edit(item)">
                <td>{{item.name}}</td>
                <td class="mobile">{{item.businessId}}</td>
                <td class="mobile">{{item.email}}</td>
                <td class="mobile">{{item.phone}}</td>
            </tr>
        </table>

        <PropertyModal />
    </div>
</template>

<style lang="less" scoped>
@import '../assets/css/table.less';

.header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: var(--gap-medium);
    align-items: center;
}

table {
    border-collapse: collapse;
    width: 100%;
}

</style>