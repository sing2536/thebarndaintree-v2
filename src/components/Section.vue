<script setup>
import { onMounted, ref } from "@vue/runtime-core"
import storeIndex from "@/stores/index"

const props = defineProps(["image", "header"])
const emit = defineEmits(["loaded"])
const store = storeIndex()
const loading = ref(false)

function imageLoadCheck() {
    if (!props.image) return
    if (props.header != undefined) store.$patch({ headerLoading: true })
    loading.value = true
    let img = new Image()
    img.src = imagePath()
    img.onload = () => {
        loading.value = false
        store.$patch({ headerLoading: false })
        emit("loaded")
    }
    if (img.complete) img.onload()
}

function imagePath() {
    return `./images/sections/${props.image}`
}

onMounted(() => {
    imageLoadCheck()
})
</script>

<template>
    <div
        :class="[
            'section',
            image ? 'image' : '',
            loading ? 'loading' : '',
            header != undefined ? 'header' : '',
        ]"
        :style="{
            'background-image': `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${imagePath()})`,
        }"
    >
        <div v-if="loading" class="loader-container">
            <div class="loader"></div>
        </div>
        <transition>
            <div v-if="!loading" class="fade"></div>
        </transition>
        <slot v-if="!loading" />
    </div>
</template>

<style lang="less" scoped>
@import "@/assets/section.less";
.loader {
    margin-top: 200px;
}

.fade {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--text2);
    opacity: 0;
}

.loading {
    background: var(--text2) !important;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from {
    opacity: 1;
}
</style>
