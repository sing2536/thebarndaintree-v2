<script setup>
import { reactive, ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(faXmark, faChevronLeft, faChevronRight)

const images = reactive([
  {
    src: 'https://thebarndaintree.com/gallery/1.jpg',
    thumbnail: 'https://thebarndaintree.com/gallery/1thumb.jpg',
  },
  {
    src: 'https://thebarndaintree.com/gallery/2.jpg',
    thumbnail: 'https://thebarndaintree.com/gallery/2thumb.jpg',
  },
  {
    src: 'https://thebarndaintree.com/gallery/3.jpg',
    thumbnail: 'https://thebarndaintree.com/gallery/3thumb.jpg',
  },
  {
    src: 'https://thebarndaintree.com/gallery/4.jpg',
    thumbnail: 'https://thebarndaintree.com/gallery/4thumb.jpg',
  },
])
let imageActive = ref(null)

function imageNext() {
  if (imageActive.value >= images.length-1) return imageActive.value = 0
  imageActive.value++
}

function imagePrev() {
  if (imageActive.value < 1) return imageActive.value = images.length-1
  imageActive.value--
}
</script>

<template>

  <div class="section image-1">
    <div class="content bottom">
      <div class="content-container" v-scroll-fade>
        <h2>Gallery</h2>
      </div>
    </div>
  </div>

  <div class="section alt-color" style="height: unset">
    <div class="content">
      <div class="content-container">
        <div class="image-container">
          <img v-for="(image, i) in images" @click="imageActive = i" :src="image.src" :key="i">
        </div>
      </div>
    </div>
  </div>

  <div v-if="imageActive != null" class="image-viewer"  v-touch:swipe.left="imageNext" v-touch:swipe.right="imagePrev">
    <div class="header">
      <div>Photo {{imageActive+1}} of {{images.length}}</div>
      <div @click="imageActive = null" class="button"><font-awesome-icon icon="fa-solid fa-xmark" /></div>
    </div>
    <div class="photo">
      <img v-show="imageActive == i" v-for="(image, i) in images" :src="image.src" :key="i">
    </div>
    <div class="arrows">
      <div @click="imagePrev()"  class="button"><font-awesome-icon icon="fa-solid fa-chevron-left" /></div>
      <div @click="imageNext()" class="button"><font-awesome-icon icon="fa-solid fa-chevron-right" /></div>
    </div>
  </div>

</template>

<style lang="less" scoped>
@import '@/assets/section.less';

.image-viewer {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: black;
  top: 0;
  z-index: 2;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
  }

  .photo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    height: 100%;


    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }

  .arrows {
    padding: 20px 30px;
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: var(--text);
    top: 50%;
  }

  .button {
    font-size: 2.4em;
    color: var(--text);

    &:hover {
      cursor: pointer;
      color: var(--text2);
    }
  }
}

.image-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  img {
    width: 400px;
    cursor: pointer;

    @media (max-width: 440px) {
      width: 340px;
    }
  }
}

.image-1 {
  height: 500px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)) , url('@/assets/images/4.webp');
}
</style>
