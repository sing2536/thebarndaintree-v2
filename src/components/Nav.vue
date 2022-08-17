<script setup>
import { RouterLink, RouterView } from "vue-router"
import { useRouter } from 'vue-router'
import storeIndex from '@/stores/index'

//icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faBars, faXmark)

const store = storeIndex()
const router = useRouter()

function closeSideBar() {
    store.sideBarActive = false
}
</script>

<template>

  <header>
    <div class="nav-container">
        <div class="logo">The Barn Daintree</div>
        <nav>
            <RouterLink v-for="(route, i) in router.getRoutes()" :to="route.path" :key="i">{{route.name}}</RouterLink>
        </nav>
        <div class="menu-button" @click="store.sideBarActive = true">
            <font-awesome-icon icon="fa-solid fa-bars" />
        </div>
    </div>
  </header>

  <Transition name="sidebar">
      <div v-show="store.sideBarActive" class="sidebar" v-click-outside="closeSideBar">
          <div class="close" @click="store.sideBarActive = false">
              <font-awesome-icon icon="fa-solid fa-xmark" />
          </div>
          <div class="menu">
              <RouterLink v-for="(route, i) in router.getRoutes()" :to="route.path" :key="i">{{route.name}}</RouterLink>
          </div>
      </div>
  </Transition>

  <Transition name="fade">
    <div class="mask" v-show="store.sideBarActive"></div>
  </Transition>
  
</template>

<style lang="less" scoped>

.menu-button {
    cursor: pointer;
    display: none;
}

a {
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1em;
    line-height: 26px;

    &.router-link-active {
        border-bottom: 2px solid var(--text);
    }
}

.sidebar {
    position: fixed;
    height: 100%;
    right: 0;
    background-color: white;
    z-index: 3;
    display: flex;
    flex-direction: column;
    color: var(--text-alt);

    .close {
        padding: 10px 18px;
        align-self: flex-end;
        font-size: 3em;
        cursor: pointer;
    }

    .menu {
        display: flex;
        flex-direction: column;
        font-size: 1.2em;

        a {
            padding: 16px 60px;
            border: none;

            &.router-link-active {
                background: black;
                color: var(--text);
            }
        }

    }
}

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
}

.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgb(0 0 0 / 50%)
}

@media (max-width: 800px) {
    .nav-container {
        justify-content: space-between;
    }

    nav {
        display: none;
    }

    .menu-button {
        display: block;
        font-size: 2em;
    }
}

.sidebar-enter-active,
.sidebar-leave-active {
    transition: transform 0.2s ease;
    transform: translate(0);
}

.sidebar-enter-from,
.sidebar-leave-to {
    transform: translate(250px, 0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
