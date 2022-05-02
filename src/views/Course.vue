<template>
  <div>
    <button @click="get">asd</button>
  </div>
</template>

<script>
export default {
  methods: {
    get() {
      console.log(this.$router.currentRoute.params.id);
    },
  },
};
</script>

<style></style>
