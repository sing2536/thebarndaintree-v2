<script setup>
import { onMounted } from 'vue'
import '@/assets/jquery.min.js'
import '@/assets/calendar/bootstrap-year-calendar.js'
import axios from 'axios'

function getCalendar() {
  axios('/portal/public/api/extcalendar').then((r)=> handleData(r.data[0]))
}

function handleData(a){
  console.log('handle', a)
  for (var i = 0; i < a.length; i++) {
    a[i].checkIn = cleanDate(a[i].checkIn);
    a[i].checkOut = cleanDate(a[i].checkOut);
    a[i].color = "rgb(255, 130, 130)";
  };

  $('.calendar').calendar({startYear: (new Date().getFullYear()), alwaysHalfDay: true, style: 'background'}).setDataSource(a)
}

function cleanDate(a){
  console.log(a)
  return new Date(a.substring(0,4), a.substring(5,7), a.substring(8,10));
}

onMounted(()=>{
  $('.calendar').calendar()
  getCalendar()
})
</script>

<template>

  <div class="section header image-1">
    <div class="content bottom">
      <div class="content-container" v-scroll-fade>
        <h2>Booking</h2>
      </div>
    </div>
  </div>

  <div class="section alt-color" style="height: unset">
    <div class="content">
      <div class="content-container">
        <h3>Contact</h3>
        <p>
          To make an enquiry or booking, please contact us using below details.<br />
        </p>
        <p>
          Mobile: 0459 499 192<br />
          Phone: (07) 40341266<br />
          Email: thebarndaintree@hotmail.com<br /><br />
        </p>
        <h3>Prices per night</h3>
        <ul>
          <li>Base rate for 2 guests is $480</li>
          <li>Extra 95$ for adults and $70 for children, per person, per night</li>
          <li>Give us an enquiry, we try to give out discounts whenever we can</li>
        </ul>
        <br /><br />
        <h3>Payment method</h3>
        <ul>
          <li>Direct Bank Transfer</li>
        </ul>
        <br /><br />
        <h2>Calendar</h2>
        <p>
          Please check our availability using the calendar below.<br />
          *Red blocks are booked dates.
        </p>
        <br />
        <div class="calendar"></div>
      </div>
    </div>
  </div>
  
</template>

<style lang="less" scoped>
@import '@/assets/section.less';

h3 {
  padding-bottom: 20px;
}

.image-1 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)) , url('@/assets/images/8.jpg');
}
</style>

<style>
@import '@/assets/calendar/bootstrap-year-calendar.css';
</style>
