<script setup>
import { reactive, ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import 'swiper/css'

library.add(faXmark, faChevronLeft, faChevronRight)

const swiperModules = reactive([Navigation, Pagination])
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
const imageActive = ref(null)
</script>

<template>

  <div class="section header image-1">
    <div class="content bottom">
      <div class="content-container" v-scroll-fade>
        <h2>Gallery</h2>
      </div>
    </div>
  </div>

  <div class="section no-height alt-color">
    <div class="content">
      <div class="content-container">
        <div class="image-container">
          <img v-for="(image, i) in images" @click="imageActive = i" :src="image.src" :key="i">
        </div>
      </div>
    </div>
  </div>

  <div v-if="imageActive != null" class="image-viewer">
    <div class="header">
      <div>Photo {{imageActive+1}} of {{images.length}}</div>
      <div @click="imageActive = null" class="button"><font-awesome-icon icon="fa-solid fa-xmark" /></div>
    </div>
    <swiper
      :modules="swiperModules"
      navigation
      :pagination="{ clickable: true }"
      :slides-per-view="1"
      :centeredSlides="true"
    >
      <swiper-slide v-for="(image, i) in images" :key="i">
        <img :src="image.src" />
      </swiper-slide>
    </swiper>
  </div>

</template>

<style lang="less" scoped>
@import '@/assets/section.less';

.swiper {
  width: 100%;
  height: 100%;
  --swiper-theme-color: white;
}

.swiper-slide {
  margin-bottom: 68px;
}

.view-image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}

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

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
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
  margin: 20px 0;
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
