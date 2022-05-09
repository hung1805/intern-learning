<template>
  <div
    class="absolute overflow-y-auto overflow-x-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    v-if="message && showModal"
  >
    <div class="p-4">
      <!-- Modal content -->
      <div class="bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex justify-between items-center p-3 rounded-t border-b">
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="small-modal"
            @click="closeModal"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 flex items-center">
          <div>
            <svg
              class="h-6 w-6 text-red-600 block mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              v-show="type === 'error'"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <svg
              class="w-6 h-6 fill-current text-green-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              v-show="type === 'success'"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"
              />
            </svg>
          </div>
          <p class="text-base leading-relaxed text-gray-500">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PriButton from '@/components/common/PriButton.vue';
export default {
  components: { 'pri-btn': PriButton },
  computed: {
    message() {
      return this.$store.state.message.content;
    },
    type() {
      return this.$store.state.message.type;
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  watch: {
    message() {
      if (this.message) {
        this.showModal = true;
      }
    },
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
  },
  beforeDestroy() {
    this.showModal = false;
  },
};
</script>

<style></style>
