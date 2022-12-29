<script setup>
defineProps(['search'])
</script>

<template>
    <tr>
        <th>Status</th>
        <th>Name</th>
        <th>Check In</th>
        <th>Check Out</th>
        <th class="mobile">Adults</th>
        <th class="mobile">Children</th>
        <th class="tablet">Source</th>
        <th class="mobile">Quote</th>
        <th class="tablet">Owing</th>
        <!-- <th class="mobile">Ferry</th> -->
        <th class="mobile">{{search ? 'Comment':'Latest Comment'}}</th>
    </tr>
</template>

<style lang="less" scoped>
@import '../assets/css/table.less';

tr:hover {
    background: none;
    cursor: inherit;
}
</style>