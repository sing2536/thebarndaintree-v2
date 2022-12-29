
<script setup>
import { Icon } from '@iconify/vue';
import SearchResults from './BookingSearchResults.vue';
import { useBookingSearchStore } from '../stores/bookingSearch';

const bookingSearch = useBookingSearchStore()

</script>


<template>
    <div class="search-button" @click="bookingSearch.active = true">
        <Icon icon="gg:search" />
        <p>Search</p>
    </div>
    <SearchResults />
</template>

<style lang="less" scoped>
.search-button {
    display: flex;
    align-items: center;
    margin-left: var(--gap-medium);
    gap: var(--gap-tiny);
    padding: 6px 10px;
    background-color: var(--color-shade);
    border-radius: var(--radius-normal);

    p {
        font-size: smaller;
        font-weight: 500;
    }

    svg{
        font-size: large;
    }

    &:hover {
        cursor: pointer;
        background-color: var(--color-shade2);
    }
}
</style>