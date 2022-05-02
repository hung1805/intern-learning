<template>
  <div id="app">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>
<script>
import TheHeader from './components/TheHeader.vue';
export default {
  components: {
    'the-header': TheHeader,
  },
};
</script>

<style></style>
