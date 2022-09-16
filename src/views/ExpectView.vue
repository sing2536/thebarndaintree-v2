<script setup>
import { useRouter } from 'vue-router'
import Section from '@/components/Section.vue'
import storeIndex from '@/stores/index'

const router = useRouter()
const store = storeIndex()

function goToPage(p) {
  router.push(p)
}

function openUrl(url) {
  window.open(url, '_blank')
}

</script>

<template>

  <Section header image="2.jpg">
    <div class="content bottom">
      <div class="content-container" v-scroll-fade>
        <h2>What to Expect</h2>
      </div>
    </div>
  </Section>

  <template v-if="!store.headerLoading" >
    <div class="section alt-color" style="height: unset">
      <div class="content">
        <div class="content-container">
          <p>
            The Barn is a self-reliant house in electrical power and water supply, the house is purely powered by solar panels. Because of this one does have to be efficient with power usage, we do advice you to use any equipment that uses high consumption of power such as the washing machine and dish washer, during the day when the sun is out, it is also advised to turn things such as lights and fans off if not in use. As long as power is not wasted, The Barn is easily capable of powering the house through the day and night.
            <br><br>
            The Barn does have a landline, however phone signal and internet is currently not available, you can though easily get Wi-Fi at local restaurants for a very small fee and phone signals with 3G can be found at the Alexandra range look out which is about a 10 minute drive.
            <br><br>
            One thing to also note is that The Barn is designed to be opened to nature and because of its solar passive design this house naturally keeps itself cool at all times, therefor there are no flyscreens or air conditioning.
            <br><br>
            The Barn is also a place where you won't forgo a bit of luxury, with three en suite bedrooms a fully equipped kitchen satellite TV, stereo system, billiard table, BBQ and a swimming pool, this three story pole house with 30 ft ceilings and glass walls from the ground up on 3 sides will truly take your breath away.
            <br><br>
            There are 3 bedrooms, one on the top floor has a king size bed and two on the ground floor with queen size beds. We can accommodate up to 8 guests by setting up extra beds around the house and/or in the bedrooms and we are willing to accommodate more guest so please feel free to contact us.
          </p>
        </div>
      </div>
    </div>
  
     <div class="section image-2">
        <div class="content center">
          <div class="content-container left">
            <div class="left" v-scroll-fade>
              <h2>Local Tourism</h2>
              <p>
                There are plenty of activities and tours Daintree has to offer, listed below are some of the sites you can visit to book tours and find all the information you need to help plan your holiday. We also keep tour brochures at The Barn which also contains a map of the area listing all the local stores, restaurants etc.
              </p>
              <div class="links">
                <button @click="openUrl('https://www.daintreeinfo.com/')">Daintreeinfo.com</button>
                <button @click="openUrl('https://www.destinationdaintree.com/')">Destinationdaintree.com</button>
                <button @click="openUrl('https://www.daintreerainforest.com/')">Daintreerainforest.com</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section image-3">
        <div class="content center">
          <div class="content-container right">
            <div class="right" v-scroll-fade>
              <h2>Getting Here</h2>
              <p>
                The Barn is located in the Daintree Rainforest at Cow Bay. To get here from Cairns is approximately 120km, or 2 hour drive. The map below shows the route from cairns to the location of the house.
                <br><br>
                You will be required to cross the Daintree River using the car ferry, which includes a fee each time you use it, and we also provide you with a direction guide book to help find your way to The Barn, as well as ferry tickets which can be mailed to you free of charge. 
                <br><br>
                If you are coming up from cairns we recommend you stop by Woolworths in Mossman town, which is an hour's drive from the house to grab your groceries before arriving.
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section" style="padding: 0">
        <iframe width="100%" height="100%" src="https://www.google.com/maps/embed?pb=!1m25!1m12!1m3!1d61292.71950465421!2d145.41741939861416!3d-16.230976996702545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m10!1i0!3e0!4m3!3m2!1d-16.8971862!2d145.7551918!4m3!3m2!1d-16.2339359!2d145.4629646!5e0!3m2!1sen!2sau!4v1406172636583" frameborder="0" style="border:0"></iframe>
      </div>
  
      <div class="section no-height alt-color">
        <div class="content">
          <div class="content-container center convinced" v-scroll-fade>
            <center><h2>Conviced yet?</h2></center>
            <button @click="goToPage('booking')" class="alt-color">Enquire Now</button>
          </div>
        </div>
      </div>
  </template>

</template>

<style lang="less" scoped>
@import '@/assets/section.less';

.convinced {
  padding: 30px;
}

.links {
  display: flex;
  flex-direction: column;
  width: 320px;
}

.image-1 {
  height: 500px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)) , url('@/assets/images/7.jpg');
}

.image-2 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) , url('@/assets/images/5.jpg');
}

.image-3 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)) , url('@/assets/images/6.jpg');
}
</style>
