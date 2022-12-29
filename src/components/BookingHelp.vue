<script setup>
import HelpInformation from './HelpInformation.vue';

</script>

<template>
    <HelpInformation title="Bookings">
        
        <div>
            <div class="section-content column">

                <img width="320" height="120" src="@/assets/images/help/booking-filter.png" alt="Changing the booking filter">

                <div>
                    <h3>Booking filters</h3>
                    <p>You can change the filter using the drop down found up the top right of the booking table. Below are the details for each filter.</p>

                    <h4>Upcoming bookings</h4>
                    <p>This filter shows bookings that are in pending, deposit, or paid statuses, ordered by upcoming bookings.</p>
                    <p>The routine here is that when a booking has either been completed or cancelled, you would update the status for the booking accordingly to remove them from this list, so you can focus on what's coming up next.</p>

                    <h4>All bookings</h4>
                    <p>This filter simply display all bookings regardless of the status, ordered by when they were created.</p>
                </div>

            </div>
        </div>

    </HelpInformation>
</template>

<style lang="less" scoped>
@import '../assets/css/help.less';

h4 {
    font-weight: 600;
    padding-bottom: var(--gap-xtiny);
}
</style>