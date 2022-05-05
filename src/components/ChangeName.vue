<template>
  <div class="border-2 border-t-4 border-green-700 bg-gray-100 w-3/4">
    <form @submit.prevent="handleChangeName" class="p-4">
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
        $t('current-name')
      }}</label>
      <input
        type="text"
        id="name"
        :value="user.name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        disabled
      />
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 mt-2">{{ $t('new-name') }}</label>
      <input
        type="text"
        id="name"
        v-model.trim="newName"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Ex: John Senna"
      />
      <p v-if="nameValidator" class="text-xs text-red-700">{{ nameValidator }}</p>
      <button type="submit" class="mt-6 px-4 py-2 text-blue-100 bg-blue-800 rounded-md">{{ $t('change-name') }}</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newName: '',
      nameValidator: '',
    };
  },
  methods: {
    handleChangeName() {
      if (this.newName === '') {
        this.nameValidator = 'Please enter valid name';
      }
      if (this.$store.state.user.name == this.newName) {
        this.nameValidator = 'The same name';
      }
      this.$store.dispatch('ChangeName', { name: this.newName, userId: this.$store.state.user.uid });
      alert('Change Name Successfully');
      this.newName = '';
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
