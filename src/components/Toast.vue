<script setup>
import { nextTick, watch } from '@vue/runtime-core';
import { useToastStore } from '../stores/toast';

const toast = useToastStore()

function removeToast(data, force) {
    const { toasts, removeAll } = toast
    const remove = () => {
        const x = toasts.findIndex(x => x.id == data.id)
        if (x > -1) toasts.splice(x, 1)
    }

    if (force) return remove()

    setTimeout(()=> remove(), data.timeout*1000 || 4000)
}

function closeButton(data) {
    if (!data.closeButton) return
    const button = {label: 'Close', callback: () => removeToast(data, true)}
    const x = toast.toasts.find(x => x.id == data.id)
    if (x.actions) return x.actions.push(button)
    x.actions = [button]
}

toast.$onAction((mutation)=>{
    nextTick(()=>{
        const args = mutation.args[0]
        if (mutation.name == 'add') {
            closeButton(args)
            removeToast(args)
        }
    })
})
</script>

<template>
    <div class="toast-container">
        <TransitionGroup name="slide">

            <div class="toast-wrapper" v-for="item in toast.toasts" :key="item.id">
                <p>{{item.message}}</p>
                <div v-if="item.actions" class="actions-wrapper">
                    <button 
                    class="dense primary" 
                    v-for="(action, index) in item.actions" 
                    :key="index" 
                    @click="action.callback(), removeToast(item, true)
                    ">{{action.label}}</button>
                </div>
            </div>

        </TransitionGroup>
    </div>
</template>

<style lang="less" scoped>
.toast-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: var(--gap-tiny);
    top: var(--gap-medium);
    right: var(--gap-medium);
    z-index: 9;
}
.toast-wrapper {
    display: flex;
    gap: var(--gap-medium);
    align-items: center;
    justify-content: space-between;
    padding: var(--gap-tiny) var(--gap-small);
    background: var(--color-background2);
    border: 1px solid var(--color-shade);
    border-radius: var(--radius-normal);
    min-height: 50px;
    // min-width: 220px;

    p {
        font-size: small;
    }
}
.actions-wrapper {
    display: flex;
}

.slide-leave-active,
.slide-enter-active {
  transition: all .3s ease;
}
.slide-enter-active{
  transition-delay: .5s
}
.slide-enter-from {
  transform: translate(120%);
}
.slide-leave-to {
  transform: translate(120%);
}

</style>