<script setup>
import HelpInformation from './HelpInformation.vue';

</script>

<template>
    <HelpInformation title="Calendar & Properties">
        
        <div>
            <div class="section-content">
                <div>
                    <h4>Calendar colors</h4>
                    <ul class="legend">
                        <li>
                            <div class="color orange"></div><div>Pending</div>
                        </li>
                        <li>
                            <div class="color purple"></div><div>Deposit</div>
                        </li>
                        <li>
                            <div class="color green"></div><div>Paid</div>
                        </li>
                        <li>
                            <div class="color grey"></div><div>Completed</div>
                        </li>
                        <li>
                            <div class="color blue"></div><div>Blocked Out</div>
                        </li>
                        <li>
                            <div class="color red"></div><div>Bookings Overlap</div>
                        </li>
                    </ul>
                </div>
                </div>
        </div>

        <div>
            <div class="section-content">
                <div>
                    <h4>Open bookings</h4>
                    <p>You can open bookings via the calendar by clicking on them.</p>
                    <p>The only exception is for overlapped bookings,the overlapping day will not open any bookings, and you need to click on any non overlapping days instead.</p>
                </div>
                <img width="200" height="200" src="@/assets/images/help/calendar-click.png" alt="Openning bookings with calendar">
            </div>
        </div>

        <div>
            <div class="section-content">
                <div>
                    <h4>Create bookings</h4>
                    <p>You can create booking using the calendar by dragging with your mouse between two dates, this will automatically 
                        fill in the check in/out dates when creating bookings.
                    </p>
                </div>
                <img width="200" height="190" src="@/assets/images/help/calendar-drag.gif" alt="Createing bookings with calendar">
            </div>
        </div>

        <div>
            <div class="section-content">
                <div>
                    <h4>Switch properties</h4>
                    <p>Switch to a different property using the drop down option just above the top right of the calendar, this will update the calendar and bookings for that specific property.</p>
                </div>
                <img width="220" height="140" src="@/assets/images/help/switch-properties.png" alt="How to switch properties">
            </div>
        </div>

        <div>
            <div class="section-content">
                <div>
                    <h4>Manage properties</h4>
                    <p>You can create or change the details of your properties by navigating to the manage properties option in the menu to your right.</p>
                </div>
                <img width="200" height="120" src="@/assets/images/help/manage-properties.png" alt="How to manage properties">
            </div>
        </div>

    </HelpInformation>
</template>

<style lang="less" scoped>
@import '../assets/css/help.less';
</style>