<script setup>
import { reactive, ref } from 'vue'
import Section from '@/components/Section.vue'
import storeIndex from '@/stores/index'

//icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faXmark)

import { Lazy, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide  } from 'swiper/vue';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import 'swiper/css/lazy'
import 'swiper/css'

const store = storeIndex()
const swiperModules = reactive([Lazy, Navigation, Pagination])
const images = reactive([
  {
    src: '1.jpg',
  },
  {
    src: '1-1.jpg',
  },
  {
    src: '1-2.jpg',
  },
  {
    src: '2.jpg',
  },
  {
    src: '3.jpg',
  },
  {
    src: '4.jpg',
  },
  {
    src: '5.jpg',
  },
  {
    src: '6.jpg',
  },
  {
    src: '7.jpg',
  },
  {
    src: '8.jpg',
  },
  {
    src: '8-1.jpg',
  },
  {
    src: '9.jpg',
  },
  {
    src: '10.jpg',
  },
  {
    src: '11.jpg',
  },
  {
    src: '12.jpg',
  },
  {
    src: '13.jpg',
  },
  {
    src: '14.jpg',
  },
  {
    src: '15.jpg',
  },
  {
    src: '16.jpg',
  },
  {
    src: '17.jpg',
  },
  {
    src: '18.jpg',
  },
  {
    src: '19.jpg',
  },
  {
    src: '20.jpg',
  },
  {
    src: '21.jpg',
  },
])
const imageActive = ref(null)

function onSlideChange(data) {
  imageActive.value = data.activeIndex
}

function openPicture(i) {
  imageActive.value = i
  document.querySelector('.swiper').swiper.slideTo(i)
}
</script>

<template>

  <Section header image="20.jpg">
    <div class="content bottom">
      <div class="content-container" v-scroll-fade>
        <h2>Gallery</h2>
      </div>
    </div>
  </Section>

  <template v-if="!store.headerLoading">
    <div class="section no-height alt-color">
      <div class="content">
        <div class="content-container">
          <div class="image-container">
            <img v-for="(image, i) in images" @click="openPicture(i)" v-lazy="{ src: `./gallery/thumbnails/${image.src}`}" :key="i">
          </div>
        </div>
      </div>
    </div>
  </template>

  <div v-show="imageActive != null" class="image-viewer">
    <div class="header">
      <div>Photo {{imageActive+1}} of {{images.length}}</div>
      <div @click="imageActive = null" class="button"><font-awesome-icon icon="fa-solid fa-xmark" /></div>
    </div>
    <swiper
      :lazy="{loadPrevNext: true}"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="swiperModules"
      @slideChange="onSlideChange"
      class="mySwiper"
    >
      <swiper-slide v-for="(image, i) in images" :key="i">
        <img :data-src="'./gallery/'+image.src" class="swiper-lazy" />
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
    </swiper>
  </div>

</template>

<style lang="less" scoped>
@import '@/assets/section.less';

.swiper-lazy {
  border: none;
}

.swiper {
  width: 100%;
  height: 100%;
  --swiper-theme-color: white;
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
  align-items: center;

  img {
    width: 400px;
    cursor: pointer;

    @media (max-width: 440px) {
      width: 340px;
    }
  }
}

img[lazy=loading] {
  background: rgb(238, 238, 238)
}

// .image-1 {
//   height: 500px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)) , url('@/assets/images/20.jpg');
// }
</style>
