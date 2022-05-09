<template>
  <div class="border-2 border-t-4 border-green-700 bg-gray-100 w-3/4">
    <form @submit.prevent="handleChangeName" class="p-4">
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
        $t('current-name')
      }}</label>
      <input
        type="text"
        id="name"
        :value="userName"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        disabled
      />
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 mt-2">{{ $t('new-name') }}</label>
      <input
        type="text"
        id="name"
        v-model.trim="newName"
        @focus="clearError"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Ex: John Senna"
      />
      <p v-if="message" class="text-xs text-red-700 mt-2">{{ message }}</p>
      <pri-btn type="submit" class="mt-4">{{ $t('change-name') }}</pri-btn>
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
      newName: '',
      message: null,
    };
  },
  methods: {
    validateName(value) {
      if (value === '') {
        this.message = 'Please enter your name';
      }
      if (value === this.userName) {
        this.message = 'The Same Name';
      }
    },
    handleChangeName() {
      this.validateName(this.newName);
      if (!this.message) {
        this.$store.dispatch('ChangeName', { name: this.newName, userId: this.$store.state.user.uid });
        this.newName = '';
      }
    },
    clearError() {
      this.message = null;
    },
  },

  computed: {
    userName() {
      return this.$store.state.user.name;
    },
  },
};
</script>

<style></style>
