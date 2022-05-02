<template>
  <div v-if="user">{{ user.email }}</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
