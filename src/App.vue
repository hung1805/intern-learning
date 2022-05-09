<template>
  <div id="app" class="relative">
    <the-header></the-header>
    <alert-modal></alert-modal>
    <router-view></router-view>
  </div>
</template>
<script>
import AlertModal from './components/global/AlertModal.vue';
import TheFooter from './components/global/TheFooter.vue';
import TheHeader from './components/global/TheHeader.vue';
export default {
  components: {
    'the-header': TheHeader,
    'the-footer': TheFooter,
    'alert-modal': AlertModal,
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
