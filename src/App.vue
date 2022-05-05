<template>
  <div id="app" class="relative">
    <the-header></the-header>
    <router-view></router-view>
    <the-footer></the-footer>
  </div>
</template>
<script>
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';
export default {
  components: {
    'the-header': TheHeader,
    'the-footer': TheFooter,
  },
};
</script>

<style></style>
