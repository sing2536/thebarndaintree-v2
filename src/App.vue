<script setup>
import { RouterView } from 'vue-router'
import ConfirmModal from './components/ConfirmModal.vue';
import GetHelpModal from './components/GetHelpModal.vue';
import Loader from './components/Loader.vue';
import Nav from './components/Nav.vue'
import PasswordChangeModal from './components/PasswordChangeModal.vue';
import Sidebar from './components/Sidebar.vue'
import Toast from './components/Toast.vue';
import { useThemeStore } from "./stores/theme"

const theme = useThemeStore()
</script>

<template>
  <Nav />
  <Sidebar />
  <div class="main-container sidebar-collapsed">
    <RouterView class="view-container"/>
    <Loader />
    <GetHelpModal />
    <PasswordChangeModal />
    <ConfirmModal />
  </div>
  <Toast />
</template>

<style lang="less" scoped>
.main-container {
  height: 100%;
  width: 100%;
  display: flex; //for when max-width below is reach we center it.
  justify-content: center;
  padding-right: var(--sidebar-width);

  &.sidebar-collapsed {
    padding-right: 0;
  }
}

.view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 60px;
  max-width: 1600px;
  padding-bottom: 160px!important;


  &.less-padding {
    padding: 30px;
  }
}

@media (max-width: 1100px) {
    .view-container {
      padding: 20px
    }
}
</style>
