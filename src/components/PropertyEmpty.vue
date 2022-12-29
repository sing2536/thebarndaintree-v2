<script setup>
import { usePropertiesStore } from '../stores/properties'

const properties = usePropertiesStore()
</script>

<template>
    <div v-if="properties.ready &&  !properties.list.length" class="empty-wrapper">
        <h1>Let's Get Started!</h1>
        <p>You need to first create a property before you can begin creating bookings.</p>
        <button class="raised primary" @click="properties.create()">Create Property</button>
    </div>
</template>

<style lang="less" scoped>
.empty-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap-small);

    button {
        margin-top: var(--gap-small);
    }
}
</style>