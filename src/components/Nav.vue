<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header>
    <div class="nav-container">

        <div class="logo">The Barn Daintree</div>

        <nav>
            <RouterLink v-for="(route, i) in router.getRoutes()" :to="route.path" :key="i">{{route.name}}</RouterLink>
        </nav>
        
    </div>
  </header>
</template>

<style lang="less" scoped>
header {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 2;
}

.nav-container {
    display: flex;
    align-items: center;
    gap: 80px;
    flex: 1;
    margin: var(--page-margin);
    margin: 30px;
    max-width: var(--page-max-width);
}

.logo {
    font-size: 1.8em;
    font-weight: bold;
}

nav {
    display: flex;
    flex: 1;
    gap: 40px;
    color: var(--text);

    a {
        text-decoration: none;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1em;
        line-height: 26px;
        border-bottom: 2px solid transparent;

        &.router-link-active {
            border-bottom: 2px solid var(--text);
        }
    }
}
</style>
