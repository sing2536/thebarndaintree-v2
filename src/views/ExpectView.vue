<script setup>
import { useRouter } from "vue-router"
import Section from "@/components/Section.vue"
import storeIndex from "@/stores/index"

const router = useRouter()
const store = storeIndex()

function goToPage(p) {
    router.push(p)
}

function openUrl(url) {
    window.open(url, "_blank")
}
</script>

<template>
    <Section header image="1-2.jpg">
        <div class="content bottom">
            <div class="content-container" v-scroll-fade>
                <h2>What to Expect</h2>
            </div>
        </div>
    </Section>

    <template v-if="!store.headerLoading">
        <div class="section alt-color" style="height: unset">
            <div class="content">
                <div class="content-container">
                    <p>
                        The Barn is a self-reliant house in terms of electrical
                        power and water supply, powered entirely by solar
                        panels. Due to this, one does need to be efficient with
                        power usage. We advise using high-consumption equipment
                        such as washing machines and dishwashers during daylight
                        hours when solar power is abundant. It's also
                        recommended to turn off lights and fans when not in use.
                        As long as power is used responsibly, The Barn can
                        easily sustain itself throughout day and night.
                        <br /><br />
                        The Barn doesn't have a landline, but does have internet
                        access so you can use Wi-Fi calling. Mobile reception
                        can be patchy but generally works well from the top
                        verandah. We offer TV reception via a satellite dish,
                        and Netflix is also available for your entertainment.
                        <br /><br />
                        It's worth noting that The Barn is designed to be open
                        to nature. Its solar passive design naturally keeps the
                        house cool at all times, therefore there are no
                        flyscreens or air conditioning.
                        <br /><br />
                        The Barn doesn't skimp on luxury. With three en-suite
                        bedrooms, a fully equipped kitchen, satellite TV, stereo
                        system, billiard table, BBQ, and a swimming pool, this
                        three-story pole house with 30-foot ceilings and glass
                        walls on three sides will truly take your breath away.
                        <br /><br />
                        There are 3 bedrooms with king size beds, one on the top
                        floor, and two on the ground floor. Additionally, we can
                        set up 2 single beds on the mezzanine floor which is
                        adjacent to the master bedroom, perfect for children. We
                        can accommodate up to 8 guests depending on the sleeping
                        arrangements, please contact us for details.
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
                            The Daintree region offers a wide variety of
                            activities and tours. Below are some websites you
                            can visit to book tours and find all the information
                            you need to plan your holiday. We also keep tour
                            brochures at The Barn, which include a map of the
                            area highlighting local stores, restaurants, and
                            other points of interest.
                        </p>
                        <div class="links">
                            <button
                                @click="
                                    openUrl('https://www.daintreeinfo.com/')
                                "
                            >
                                Daintreeinfo.com
                            </button>
                            <button
                                @click="
                                    openUrl(
                                        'https://www.destinationdaintree.com/'
                                    )
                                "
                            >
                                Destinationdaintree.com
                            </button>
                            <button
                                @click="
                                    openUrl(
                                        'https://www.daintreerainforest.com/'
                                    )
                                "
                            >
                                Daintreerainforest.com
                            </button>
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
                            The Barn is nestled in the Daintree Rainforest at
                            Cow Bay. From Cairns, it's approximately 120km or a
                            2-hour drive. The map below shows the scenic route
                            from Cairns to our location.
                            <br /><br />
                            Your journey includes crossing the Daintree River via
                            car ferry, which requires a small fee per crossing.
                            <br /><br />
                            If you're traveling from Cairns, we recommend stopping
                            at Woolworths in Mossman town (about an hour's drive
                            from The Barn) to stock up on groceries before your arrival.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="section" style="padding: 0">
            <iframe
                width="100%"
                height="100%"
                src="https://www.google.com/maps/embed?pb=!1m25!1m12!1m3!1d61292.71950465421!2d145.41741939861416!3d-16.230976996702545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m10!1i0!3e0!4m3!3m2!1d-16.8971862!2d145.7551918!4m3!3m2!1d-16.2339359!2d145.4629646!5e0!3m2!1sen!2sau!4v1406172636583"
                frameborder="0"
                style="border: 0"
            ></iframe>
        </div>

        <div class="section no-height alt-color">
            <div class="content">
                <div class="content-container center convinced" v-scroll-fade>
                    <center><h2>Conviced yet?</h2></center>
                    <button @click="goToPage('booking')" class="alt-color">
                        Enquire Now
                    </button>
                </div>
            </div>
        </div>
    </template>
</template>

<style lang="less" scoped>
@import "@/assets/section.less";

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
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url("@/assets/images/7.jpg");
}

.image-2 {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("@/assets/images/5.jpg");
}

.image-3 {
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url("@/assets/images/6.jpg");
}
</style>
