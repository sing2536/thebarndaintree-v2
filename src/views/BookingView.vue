<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"
import Section from "@/components/Section.vue"
import storeIndex from "@/stores/index"

//icons
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
    faGift,
    faEnvelope,
    faDollarSign,
    faBank,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons"
library.add(faGift, faEnvelope, faDollarSign, faBank, faRotateLeft)

const store = storeIndex()
</script>

<template>
    <Section header image="4.jpg">
        <div class="content bottom">
            <div class="content-container" v-scroll-fade>
                <h2>Booking</h2>
            </div>
        </div>
    </Section>

    <div
        v-show="!store.headerLoading"
        class="section alt-color no-height special-offer"
    >
        <div class="content">
            <div class="content-container">
                <div class="heading center">
                    <font-awesome-icon icon="fa-solid fa-gift" />
                    <h3>Limited Time Offer: Save $50 a night!</h3>
                </div>
                <p>
                    Book now and enjoy our reduced base rate of $400. This offer
                    is only available until April 2025. Don't miss out!
                </p>
            </div>
        </div>
    </div>

    <div
        v-show="!store.headerLoading"
        class="section alt-color"
        style="height: unset"
    >
        <div class="content">
            <div class="content-container">
                <div class="heading">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                    <h3>Enquire</h3>
                </div>
                <p>
                    To make an enquiry or booking, please contact us using below
                    details.<br />
                </p>
                <p>
                    Mobile: <a href="tel:0459499192">0459 499 192</a><br />
                    Email:
                    <a href="mailto:thebarndaintree@hotmail.com" target="_blank"
                        >thebarndaintree@hotmail.com</a
                    >
                </p>
                <br /><br /><br />

                <div class="heading">
                    <font-awesome-icon icon="fa-solid fa-dollar-sign" />
                    <h3>Prices Per Night</h3>
                </div>
                <div class="booking-alert info" style="margin-bottom: 14px">
                    <p>
                        Discounts may be available based on the length of your
                        stay and the number of guests. Please contact us for a
                        quote!
                    </p>
                </div>
                <ul>
                    <li>Base rate for 2 guests is $450</li>
                    <li>Extra rooms are $150 per room, per night</li>
                    <li>For children please contact us for details</li>
                </ul>
                <br /><br /><br />

                <div class="heading">
                    <font-awesome-icon icon="fa-solid fa-bank" />
                    <h3>Payment Method</h3>
                </div>
                <ul>
                    <li>Direct Bank Transfer</li>
                </ul>
                <br /><br /><br />

                <div class="heading">
                    <font-awesome-icon icon="fa-solid fa-rotate-left" />
                    <h3>Refund Policy</h3>
                </div>
                <ul>
                    <li>
                        Non refundable 20% deposit with the rest payable 3 weeks
                        before arrival
                    </li>
                </ul>
                <br /><br /><br />

                <h2>Availability</h2>
                <div class="booking-alert">
                    <p>
                        The Barn is currently on the market. While the property
                        remains unsold we are able to continue taking bookings
                        for up to 3 months from today's date.
                    </p>
                </div>
                <div class="legend">
                    <div class="red-block"></div>
                    <p>Red blocks are unavailable.</p>
                </div>
                <br />
                <iframe
                    id="myguestsPublicCalendar"
                    src="https://myguests.app/public-calendars/?token=10d9a07c0af42d4cd6275ebe44f89c95621073537a917bac530c9a46762095ec"
                    frameborder="0"
                    width="100%"
                    height="460px"
                ></iframe>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import "@/assets/section.less";

.heading {
    display: flex;
    align-items: center;
    padding-bottom: 14px;
    gap: 20px;

    &.center {
        justify-content: center;
    }

    svg {
        font-size: 2.6em;
    }

    h3 {
        padding: 0;
    }
}

.calendar-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.loader {
    border-left-color: var(--text-alt);
}

.special-offer {
    background: var(--red);
    color: var(--text) !important;
    text-align: center;

    p {
        line-height: initial;
        padding-bottom: 6px;
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding-bottom: 14px;

        [data-icon="gift"] {
            font-size: 2.6em;
        }

        h3 {
            padding: 0px;
        }
    }
}

.booking-alert {
    background: var(--grey-shade-1);
    padding: 14px;
    border-left: 8px solid var(--red);
    margin-top: 14px;

    &.info {
        border-color: var(--blue);
    }
}

.legend {
    display: flex;
    align-items: center;
    gap: 16px;
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
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url("@/assets/images/8.jpg");
}
</style>
