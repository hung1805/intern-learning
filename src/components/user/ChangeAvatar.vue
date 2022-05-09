<template>
  <div class="border-2 border-t-4 border-green-700 bg-gray-100 w-3/4">
    <form @submit.prevent="handleChangeAvatar" class="p-4">
      <label for="url" class="block mb-2 text-sm font-medium text-gray-900 mt-2">{{ $t('image-url') }}</label>
      <input
        type="text"
        id="url"
        v-model.trim="url"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Ex: https://images.unsplash.com/photo-1651555729419-7543b492fe76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=526&q=80"
      />
      <p v-if="validator" class="text-xs text-red-700 mt-2">{{ validator }}</p>
      <pri-btn type="submit" class="mt-6">
        {{ $t('change-avatar') }}
      </pri-btn>
    </form>
    <div class="preview" v-if="url">
      <h4 class="ml-4 block mb-2 text-sm font-medium text-gray-900 mt-2">{{ $t('avtar-preview') }}</h4>

      <img :src="url" alt="image preview" class="w-40 h-40 rounded-full object-cover inline-block m-4" />
    </div>
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
      url: '',
      validator: '',
    };
  },
  methods: {
    handleChangeAvatar() {
      if (this.url === '') {
        return (this.validator = 'No image URL detected');
      } else {
        this.$store.dispatch('ChangeAvatar', { url: this.url, userId: this.$store.state.user.uid });
      }
    },
  },
};
</script>

<style></style>
