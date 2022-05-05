<template>
  <div class="border-2 border-t-4 border-green-700 bg-gray-100 w-3/4">
    <form @submit.prevent="handleChangePassword" class="p-4">
      <!-- Old Password -->
      <label for="old-pass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
        $t('current-pass')
      }}</label>
      <input
        type="password"
        id="old-pass"
        name="old-pass"
        v-model.trim="oldPass"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Ex: 123456"
      />
      <!-- New Password -->
      <label for="new-pass" class="block mb-2 text-sm font-medium text-gray-900 mt-2">{{ $t('new-pass') }}</label>
      <input
        name="new-pass"
        type="text"
        id="new-pass"
        v-model.trim="newPass"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Ex: 123456"
      />

      <!-- Confirm Password -->
      <label for="conf-pass" class="block mb-2 text-sm font-medium text-gray-900 mt-2">{{ $t('conf-pass') }}</label>
      <input
        id="conf-pass"
        type="text"
        name="conf-pass"
        v-model.trim="confPass"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Ex: 123456"
      />
      <p v-if="validator" class="text-xs text-red-700 mt-2">{{ validator }}</p>
      <button type="submit" class="mt-6 px-4 py-2 text-blue-100 bg-blue-800 rounded-md">{{ $t('change-pass') }}</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPass: '',
      newPass: '',
      confPass: '',
      validator: '',
    };
  },
  methods: {
    handleChangePassword() {
      if (!this.oldPass || !this.newPass || !this.confPass) {
        return (this.validator = 'Please enter full the below field');
      }
      if (this.oldPass !== this.$store.state.user.password) {
        return (this.validator = 'Your current password is incorrect');
      }
      if (this.newPass !== this.confPass) {
        return (this.validator = 'Password and Confirm Password are not match');
      }
      if (this.$store.state.user.accessToken) {
        this.$store.dispatch('ChangePassword', { password: this.newPass });
      } else return;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style></style>
