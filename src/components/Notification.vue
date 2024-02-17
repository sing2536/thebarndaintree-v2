<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"

//icons
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
library.add(faXmark)

const router = useRouter()
const notificationActive = ref(false)
const specialOfferAckName = "bookingUnavailableNotification2"

function notificationClose() {
    notificationActive.value = false
    localStorage.setItem(specialOfferAckName, Date.now())
}

function specialOfferHandler() {
    //skip for booking page as they may already have notification
    if (router.currentRoute.value.path == "/booking")
        return (notificationActive.value = false)

    let ack = localStorage.getItem(specialOfferAckName)
    if (ack) {
        let ackTime = parseInt(localStorage.getItem(specialOfferAckName))
        if (Date.now() - ackTime > 259200000 == false) return
    }
    notificationActive.value = true
}

function bookingUnavailableHandler() {
    //always show if on booking page
    if (router.currentRoute.value.path == "/booking")
        return (notificationActive.value = true)

    let ack = localStorage.getItem(specialOfferAckName)
    if (ack) {
        let ackTime = parseInt(localStorage.getItem(specialOfferAckName))
        if (Date.now() - ackTime > 172800000 == false) return
    }
    notificationActive.value = true
}

watch(router.currentRoute, () => bookingUnavailableHandler())
</script>

<template>
    <transition appear>
        <div v-if="notificationActive" class="container">
            <div class="content">
                <div class="title">Temporary Booking Pause</div>
                <p>
                    We're sorry, but we're taking a short break from accepting
                    bookings. Please check back in August for updates. Thank you
                    for your understanding!
                </p>
            </div>

            <!-- <div class="content">
                <div class="title">Get 10% off when you stay between now and end of March 2023!</div>
                <p>Offer only available specifically for booking dates that are before end of March 2023.</p>
            </div> -->

            <div class="button-container">
                <div class="button" @click="notificationClose()">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="less" scoped>
.container {
    position: fixed;
    width: 100%;
    background: var(--red);
    bottom: 0;
    display: flex;
    z-index: 10;
}

.button-container {
    .button {
        font-size: 2em;
        padding: 10px 20px;
        cursor: pointer;
    }
}

.content {
    flex: 1;
    text-align: center;
    padding: 20px 40px;
}

.title {
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: 8px;
}

P {
    line-height: initial;
    font-size: 1.2em;
    font-weight: initial;
}

.v-enter-active,
.v-leave-active {
    transition: transform 0.5s ease;
    transform: translate(0);
    transition-delay: 2s;
}

.v-enter-from,
.v-leave-to {
    transform: translate(0, 270px);
    transition-delay: unset;
}

@media (max-width: 1000px) {
    .content {
        text-align: left;
        padding: 20px 20px;
    }

    .button-container {
        .button {
            padding: 10px 20px 10px 10px;
        }
    }
}
</style>
