<template>
  <div class="border-2 border-t-4 border-green-700 bg-gray-100 w-3/4">
    <form @submit.prevent="handleChangePassword" class="p-4">
      <!-- Old Password -->
      <div>
        <label for="old-pass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
          $t('current-pass')
        }}</label>
        <input
          type="password"
          id="old-pass"
          name="old-pass"
          v-model.trim="oldPass"
          @focus="clearError"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Ex: 123456"
        />
        <p v-if="message.password" class="text-xs text-red-700 mt-2">{{ message.password }}</p>
      </div>
      <!-- New Password -->
      <div>
        <label for="new-pass" class="block mb-2 text-sm font-medium text-gray-900 mt-2">{{ $t('new-pass') }}</label>
        <input
          name="new-pass"
          type="text"
          id="new-pass"
          v-model.trim="newPass"
          @focus="clearError"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Ex: 12345678"
        />
        <p v-if="message.newPass" class="text-xs text-red-700 mt-2">{{ message.newPass }}</p>
      </div>

      <!-- Confirm Password -->
      <div>
        <label for="conf-pass" class="block mb-2 text-sm font-medium text-gray-900 mt-2">{{ $t('conf-pass') }}</label>
        <input
          id="conf-pass"
          type="text"
          name="conf-pass"
          v-model.trim="confPass"
          @focus="clearError"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Ex: 12345678"
        />
        <p v-if="message.confPass" class="text-xs text-red-700 mt-2">{{ message.confPass }}</p>
      </div>
      <pri-btn type="submit" class="mt-6">{{ $t('change-pass') }}</pri-btn>
    </form>
  </div>
</template>

<script>
import PriButton from '@/components/common/PriButton.vue';
export default {
  components: {
    'pri-btn': PriButton,
  },
  data() {
    return {
      oldPass: null,
      newPass: null,
      confPass: null,
      message: {
        password: null,
        confPass: null,
        newPass: null,
      },
    };
  },
  methods: {
    validateOldPass() {
      if (!this.oldPass) {
        this.message.password = 'Please fill the old password field';
        return;
      }
      console.log(this.oldPass !== this.userPassword);
      if (this.oldPass !== this.userPassword) {
        this.message.password = 'Your old password in not correct';
      }
    },
    validateNewPassword() {
      if (!this.newPass) {
        this.message.newPass = 'Please fill new password field';
        return;
      }
      if (this.newPass.length < 8) {
        this.message.newPass = 'Password must more than 8 characters';
      }
    },
    validateConfPassword() {
      if (!this.newPass) {
        this.message.confPass = 'Please fill the confirm password field';
        return;
      }
      if (this.confPass.length < 8) {
        this.message.confPass = 'Confirm password must more than 8 characters';
        return;
      }
      if (this.confPass !== this.newPass) {
        this.message.confPass = "New password and confirm password don't match ";
      }
    },
    handleChangePassword() {
      this.validateOldPass();
      this.validateNewPassword();
      this.validateConfPassword();
      if (this.userToken && !this.message.confPass && !this.message.password && !this.message.newPass) {
        console.log('change');
        this.$store.dispatch('ChangePassword', { password: this.newPass, id: this.userId });
      } else return;
    },
    clearError() {
      this.message = {
        password: null,
        confPass: null,
        newPass: null,
      };
    },
  },
  computed: {
    userToken() {
      return this.$store.state.user.accessToken;
    },
    userPassword() {
      return this.$store.state.user.password;
    },
    userId() {
      return this.$store.state.user.uid;
    },
  },
};
</script>

<style></style>
