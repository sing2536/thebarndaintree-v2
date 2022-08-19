<script setup>
import { onMounted, ref } from "@vue/runtime-core"

const props = defineProps(['image', "header"])
const emit = defineEmits(['loaded'])
const loading = ref(false)

function imageLoadCheck() {
    let img = new Image()
    img.src = imagePath()
    img.onload = () => {
        loading.value = true
        emit('loaded')
    }
    if (img.complete) img.onload();
}

function imagePath() {
    return `/images/sections/${props.image}`
}

onMounted(()=>{
    imageLoadCheck()
})
</script>

<template>
    <div :class="['section', image ? 'image':'', !loading ? 'loading':'', header != undefined ? 'header':'']" :style="{ 'background-image': `url(${imagePath()})` }">
    <div v-if="!loading" class="loader-container">
        <div class="loader"></div>
    </div>
        <slot v-if="loading"/>
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/section.less';

.loading {
    background: var(--text2)!important;
}

.image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.46),rgba(0, 0, 0, 0.48));
}

.loader-container {
    position: absolute;
    width: 100%;
    height: 100%;
    scale: 0.4;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0, 0, 0, 0.2);
  border-right: 1.1em solid rgba(0, 0, 0, 0.2);
  border-bottom: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid var(--text);
  transform: translateZ(0);
  animation: load8 .6s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>