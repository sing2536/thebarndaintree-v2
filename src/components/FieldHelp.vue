<script setup>
import { Icon } from '@iconify/vue';

defineProps(['content'])
</script>

<template>
    <div v-tooltip="content" class="field-help-wrapper">
        <Icon icon="material-symbols:help-outline-rounded" />
    </div>
</template>

<style lang="less" scoped>
.field-help-wrapper{
    font-size: larger;
    color: var(--color-primary);
    margin-left: var(--gap-xtiny);
    height: 15px;
}
</style>