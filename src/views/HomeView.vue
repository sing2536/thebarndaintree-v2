<script setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import 'swiper/css'

const swiperModules = reactive([Navigation, Pagination])
const router = useRouter()
const reviewBreakpoints = reactive({
  800: {
    slidesPerView: 2,
  },
  1200: {
    slidesPerView: 3,
  },
})
const reviews = reactive([
  {
    quote: `amazing house, best location in the Daintree. close to Cape tribulation. The photos don't do justice. the pool is huge and deep. everything you need is there i recommend the Ocean Safari for a half day on the reef. daintree ice cream. we will be back in this heaven on earth`,
    source: 'Airbnb',
    date: 'August 2022',
  },
  {
    quote: `Incredible views in your own private treehouse resort. The space is open with lots of intimate spaces to move between. Great for a group of friends or a couple of families wanting to connect in a beautiful remote location.`,
    source: 'Airbnb',
    date: 'June 2022',
  },
  {
    quote: `We loved The Barn. The views were spectacular, and the pool was amazing. The kitchen was fully stocked, so it made cooking easy. It was very relaxing to disconnect from the world, swim, cook, read and enjoy the view (and have a glass of wine or two). The house is set in beautiful surroundings. The closeness to nature is one of the best bits about The Barn (admittedly, this was also a little challenging, haha). But you have to expect that in the Daintree. We had such a fabulous time, and we would highly recommend staying here.`,
    source: 'Airbnb',
    date: 'March 2022',
  },
  {
    quote: `The barn was the most magical place to stay in. It’s the perfect treehouse retreat. Extremely open plan, gorgeous floor to ceiling windows filled the space with light. The architecture of the house is impressive. The bifold doors across all the balcony’s let in the cool sea breeze. The kitchen was well equipped with lots of serving platters and we made great use of the bbq. We spent most of the time in the pool that overlooked the rainforest. And at night we played pools, darts and other games. Frank has created a beautiful space and is a Super Host! Thank you Frank! We’ll definitely be back.`,
    source: 'Airbnb',
    date: 'February 2022',
  },
  {
    quote: `Magical experience. A very well equipped, well positioned decadent pole home in the rain forest. The pool is fantastic and was very well used. An abundance of nature on your doorstep, views to die for and just extremely relaxing. Highly recommended!`,
    source: 'Airbnb',
    date: 'February 2022',
  },
  {
    quote: `Incredible place, highly recommend. The location is perfect to get ocean and forest views, plus a breeze which keeps things comfy and mosquito free. Pool, baths in en suites, BBQ on the deck, dishwasher, high ceilings and lots of windows. Will stay again.`,
    source: 'Airbnb',
    date: 'November 2021',
  },
])

function goToPage(p) {
  router.push(p)
}

</script>

<template>

  <div class="section image-1">
    <div class="content bottom">
      <div class="content-container" v-scroll-fade>
        <h2>Welcome</h2>
        <h3>To your next holiday destination.</h3>
        <div>
          <button @click="goToPage('booking')">Enquire Now</button>
        </div>
      </div>
    </div>
  </div>

  <div class="section image-2">
    <div class="content center">
      <div class="content-container right">
        <div class="right" v-scroll-fade>
          <h2>The Barn</h2>
          <p>A wonderful place for your next holiday in the Daintree rainforest. The Barn is situated on the side of the mountain bordering the world heritage national park, boasting unending views of the coral sea with the rainforest meeting the reef right in front of you, this is truly a place to unwind, relax, and forget about things for a while.</p>
          <div>
            <button @click="goToPage('expect')">What to Expect</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="section image-3">
    <div class="content center">
      <div class="content-container" v-scroll-fade>
        <h2>Main Features</h2>
        <ul>
          <li>3 Ensuite bedrooms, 1 king and 2 queens (extra beds available on request)</li>
          <li>Accommodate up to 8 guests (for more please contact us)</li>
          <li>Fantastic view of the ocean and rainforest across all 3 floors</li>
          <li>10 minutes walk or 2 minutes drive to Cow Bay beach</li>
          <li>Great Privacy</li>
          <li>Swimming pool and pool table</li>
        </ul>
        <div>
          <button @click="goToPage('gallery')">See Our Gallery</button>
        </div>
      </div>
    </div>
  </div>

  <div class="section alt-color" style="height: unset">
    <div class="content column">
          <h2>Testimonials</h2>
          <swiper
            :modules="swiperModules"
            navigation
            :pagination="{ clickable: true }"
            :slides-per-view="1"
            :space-between="50"
            :breakpoints="reviewBreakpoints"
          >
              <swiper-slide v-for="(review, i) in reviews" class="slide-container" :key="i">
                <div class="slide-content">
                  <div class="quote">{{review.quote}}</div>
                  <div class="info">
                    <div class="source">{{review.source}}, {{review.date}}</div>
                  </div>
                </div>
              </swiper-slide>
          </swiper>
    </div>
  </div>
  
</template>

<style lang="less" scoped>
@import '@/assets/section.less';

.swiper {
  width: 100%;
  height: max-content;
  max-width: var(--page-max-width);
  padding: 60px 50px;
}

.slide-container {
  display: flex;
  color: black;
  height: 100%;

  .slide-content {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-self: center;

    .quote {
      font-weight: 500;
      line-height: 26px;
    }

    .info {
      align-self: flex-end;
      margin-top: 12px;

      .source {
        color: var(--text2);
        font-size: 0.8em;
        font-style: italic;
      }
    }
  }
}

.image-1 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.46),rgba(0, 0, 0, 0.48)) , url('@/assets/images/1.jpg');
}

.image-2 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.42)) , url('@/assets/images/2.jpg');
}

.image-3 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.32)) , url('@/assets/images/3.jpg');
}

@media (max-width: 1000px) {
  .content {
    align-items: flex-end!important;
    padding-bottom: 80px;

    &.column {
      align-items: center !important;
    }
  }
}
</style>

<style>
.swiper-wrapper {
  align-items: center;
}
</style>