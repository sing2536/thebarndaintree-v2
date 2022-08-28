<script setup>
import { onMounted } from 'vue'
import '@/assets/jquery.min.js'
import '@/assets/calendar/bootstrap-year-calendar.js'
import axios from 'axios'
import Section from '@/components/Section.vue'
import storeIndex from '@/stores/index'

const store = storeIndex()

function getCalendar() {
  axios('/portal/public/api/extcalendar').then((r)=> handleData(r.data[0]))
}

function handleData(a){
  for (var i = 0; i < a.length; i++) {
    a[i].checkIn = cleanDate(a[i].checkIn);
    a[i].checkOut = cleanDate(a[i].checkOut);
    a[i].color = "var(--red)";
  };

  $('.calendar').calendar({startYear: (new Date().getFullYear()), alwaysHalfDay: true, style: 'background'}).setDataSource(a)
}

function cleanDate(a){
  return new Date(a.substring(0,4), a.substring(5,7), a.substring(8,10));
}

onMounted(()=>{
  $('.calendar').calendar()
  setTimeout(() => {
    getCalendar()
  }, 2000);
})
</script>

<template>

  <Section header image="8.jpg">
    <div class="content bottom">
      <div class="content-container" v-scroll-fade>
        <h2>Booking</h2>
      </div>
    </div>
  </Section>

  <div v-show="!store.headerLoading" class="section alt-color" style="height: unset">
    <div class="content">
      <div class="content-container">

        <h3>Enquire</h3>
        <p>
          To make an enquiry or booking, please contact us using below details.<br />
        </p>
        <p>
          Mobile: <a href="tel:0459499192">0459 499 192</a><br />
          Email: <a href="mailto:thebarndaintree@hotmail.com" target="_blank">thebarndaintree@hotmail.com</a>
          <br /><br /><br />
        </p>

        <h3>Prices per night</h3>
        <ul>
          <li>Base rate for 2 guests is $480</li>
          <li>Extra $95 for adults and $70 for children, per person, per night</li>
        </ul>
        <br /><br /><br />

        <h3>Payment method</h3>
        <ul>
          <li>Direct Bank Transfer</li>
        </ul>
        <br /><br /><br />

        <h2>Calendar</h2>
        <p>Please check our availability using the calendar below.</p>
        <div class="legend">
          <div class="red-block"></div><p>Red blocks are unavailable.</p>
        </div>
        <br />
        <div class="calendar"></div>

      </div>
    </div>
  </div>

</template>

<style lang="less" scoped>
@import '@/assets/section.less';

.legend {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
}

.red-block {
  width: 24px;
  height: 24px;
  background: var(--red);
}

h3 {
  padding-bottom: 14px;
}

.image-1 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)) , url('@/assets/images/8.jpg');
}
</style>

<style>
@import '@/assets/calendar/bootstrap-year-calendar.css';
</style>
