<template>
  <div class="mt-4 px-40 flex min-h-full">
    <aside class="border-2 border-t-4 border-green-700 w-1/4 bg-gray-100 mr-8" aria-label="Sidebar">
      <div class="">
        <ul>
          <li
            class="text-lg font-semibold text-blue-700 border-b-2 pl-4 py-1 cursor-pointer"
            @click="handleShowProfile"
          >
            <span>{{ $t('profile') }}</span>
          </li>
          <li
            class="text-lg font-semibold text-blue-700 border-b-2 pl-4 py-1 cursor-pointer"
            @click="handleShowChangeName"
          >
            <span>{{ $t('change-name') }}</span>
          </li>
          <li
            class="text-lg font-semibold text-blue-700 border-b-2 pl-4 py-1 cursor-pointer"
            @click="handleShowChangePass"
          >
            <span>{{ $t('change-pass') }}</span>
          </li>
          <li
            class="text-lg font-semibold text-blue-700 border-b-2 pl-4 py-1 cursor-pointer"
            @click="handleShowChangeAvatar"
          >
            <span>{{ $t('change-avatar') }}</span>
          </li>
        </ul>
      </div>
    </aside>
    <div class="border-2 border-t-4 border-green-700 bg-gray-100 w-3/4" v-if="active === 'profile'">
      <h2 class="ml-4 py-2 text-3xl font-bold text-blue-700 flex items-end leading-none">
        <svg
          class="flex-shrink-0 w-6 inline mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
        </svg>
        {{ $t('profile') }}
      </h2>
      <div class="p-4 flex justify-around cursor-pointer">
        <div>
          <p class="ml-4">{{ $t('name') }} : {{ user.name }}</p>
          <p class="ml-4">Email : {{ user.email }}</p>
        </div>
        <div class="w-52 max-h-52 rounded-full overflow-hidden">
          <img
            :src="
              user.photoURL
                ? user.photoURL
                : 'https://images.unsplash.com/photo-1651282533990-ada8f8e210da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80'
            "
            alt=""
          />
        </div>
      </div>
    </div>
    <change-name v-if="active === 'name'"></change-name>
    <change-pass v-if="active === 'password'"></change-pass>
    <change-avatar v-if="active === 'avatar'"></change-avatar>
  </div>
</template>

<script>
import ChangeName from '@/components/user/ChangeName.vue';
import ChangePassword from '@/components/user/ChangePassword.vue';
import ChangeAvatar from '@/components/user/ChangeAvatar.vue';
export default {
  components: {
    'change-name': ChangeName,
    'change-pass': ChangePassword,
    'change-avatar': ChangeAvatar,
  },
  data() {
    return {
      active: 'profile',
    };
  },
  methods: {
    handleShowChangeAvatar() {
      this.active = 'avatar';
    },
    handleShowChangePass() {
      this.active = 'password';
    },
    handleShowChangeName() {
      this.active = 'name';
    },
    handleShowProfile() {
      this.active = 'profile';
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
