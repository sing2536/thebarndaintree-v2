<script setup>
import { RouterLink, RouterView } from "vue-router"
import Nav from "./components/Nav.vue"
import Footer from "./components/Footer.vue"
import Notification from "./components/Notification.vue"
</script>

<template v-cloak>
    <Nav />
    <RouterView />
    <Footer />
    <Notification />
</template>
