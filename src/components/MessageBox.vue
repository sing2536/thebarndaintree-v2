<script setup>
import { Icon } from '@iconify/vue';
defineProps(['type'])
</script>

<template>
    <div>
        <div :class="['message-wrapper', type]">
            <Icon class="icon" icon="fluent:info-24-filled" />
            <div class="content">
                <div>
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.message-wrapper {
    display: flex;
    padding: var(--gap-small);
    border-radius: var(--radius-normal);
    border: 1px solid var(--color-primary);
    gap: var(--gap-tiny);
    &.danger {
        border-color: var(--color-red);
        .icon {
            color: var(--color-red);
        }
    }
    &.warning {
        border-color: var(--color-orange);
        .icon {
            color: var(--color-orange);
        }
    }
}

.content {
    font-size: smaller;
    font-weight: 500;
    display: flex;
    align-items: center;
}

.icon {
    color: var(--color-primary);
    font-size: x-large;
    flex-shrink: 0;
}

@media (max-width: 800px) {
    .message-wrapper {
        padding: var(--gap-tiny);
    }
}
</style>