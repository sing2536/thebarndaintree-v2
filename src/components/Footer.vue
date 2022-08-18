<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="footer">
    <div class="container">

        <div class="logo">
            <img src="@/assets/images/logo.png" alt="">
        </div>
        
        <div class="nav-container">
            <nav>
                <div class="title">Find us on</div>
                <a href="https://www.airbnb.com.au/rooms/3604920" target="_blank">Airbnb</a>
                <a href="https://www.stayz.com.au/holiday-rental/p9153872" target="_blank">Stayz</a>
                <a href="https://www.tripadvisor.com.au/VacationRentalReview-g499650-d6850985-The_Barn_Daintree_holiday_house-Daintree_Daintree_Region_Queensland.html" target="_blank">TripAdvisor</a>
                <a href="https://www.booking.com/hotel/au/the-barn-daintree-holiday-house.en-gb.html" target="_blank">Booking.com</a>
            </nav>
    
            <nav>
                <div class="title">Menu</div>
                <RouterLink v-for="(route, i) in router.getRoutes()" :to="route.path" :key="i">{{route.name}}</RouterLink>
            </nav>
        </div>

    </div>
  </div>
</template>

<style lang="less" scoped>
.footer {
    display: flex;
    justify-content: center;
    width: 100%;
    background: black;
    padding: 60px 0;
}

.container {
    display: flex;
    justify-content: center;
    gap: 60px;
    flex: 1;
    max-width: var(--page-max-width);
}

.nav-container {
    display: flex;
    justify-content: center;
    gap: 80px;
}

.logo {
    align-self: center;
    margin-right: 100px;
     img {
        width: 300px;
    }
}

nav {
    display: flex;
    flex-direction: column;
    gap: 30px;
    color: var(--text);

    .title {
        color: var(--text2);
    }

    a {
        text-decoration: none;
        font-weight: 500;
        font-size: 1.2em;

        &:hover {
            text-decoration: underline;
        }
    }
}

@media (max-width: 750px) {

    .container {
        flex-direction: column-reverse;
        gap: 30px;
    }
    .logo {
        margin: 0;

        img {
            width: 240px;
        }
    }
}
</style>
