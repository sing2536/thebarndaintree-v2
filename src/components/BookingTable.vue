<script setup>
import BookingModal from './BookingModal.vue';
import BookingTableHeader from './BookingTableHeader.vue';
import BookingTableList from './BookingTableList.vue';
import { useTableFilter } from '../stores/tableFilter'
import { ref } from 'vue';

defineProps(['list', 'search'])
const tableFilter = useTableFilter()
const maxPageShown = ref(7)


function maxPageShownSet() {
    if (window.innerWidth < 600) return maxPageShown.value = 3
    maxPageShown.value = 7
}

window.addEventListener('resize', ()=> maxPageShownSet() )
maxPageShownSet()
</script>

<template>
    <div class="content">
        <table id="bookingTable">
            <BookingModal />
            <BookingTableHeader :search="search" />
            <BookingTableList :list="list" :search="search" />
        </table>
        <template v-if="!search">
            <vue-awesome-paginate
                v-if="tableFilter.count"
                :total-items="tableFilter.count"
                :items-per-page="30"
                :max-pages-shown="maxPageShown"
                v-model="tableFilter.page"
                :on-click="tableFilter.pageSelect"
            />
        </template>
    </div>
</template>

<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
table {
    border-collapse: collapse;
    width: 100%;
}
</style>