<template>
  <nav class="container flex justify-around pt-8 pb-6 mx-auto bg-white border-b-2">
    <div class="flex items-center">
      <h3 class="text-2xl font-medium text-blue-500">
        <router-link :to="{ path: '/' }">E-LEARNING</router-link>
      </h3>
    </div>
    <div class="items-center hidden space-x-8 lg:flex">
      <router-link :to="{ path: '/' }">{{ $t('home') }}</router-link>
      <router-link :to="{ path: '/about-us' }">{{ $t('about-us') }}</router-link>
      <span
        id="dropdownDividerButton"
        data-dropdown-toggle="courseDropdown"
        class="font-normal rounded-lg text-sm px-4 py-3 text-center inline-flex items-center cursor-pointer relative"
        @click="toggleCourseDropdown"
      >
        {{ $t('courses') }}
        <svg
          class="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        <div
          id="courseDropdown"
          v-show="showCourseDropdown"
          class="z-10 bg-white divide-y divide-gray-100 rounded shadow w-40 absolute left-0 top-full"
        >
          <ul class="py-1 text-sm" aria-labelledby="dropdownDefault">
            <li>
              <router-link :to="{ path: '/all-courses' }" class="block px-4 py-2">{{ $t('all-courses') }}</router-link>
            </li>
            <template v-if="userId">
              <li>
                <router-link :to="{ path: '/user/courses' }" class="block px-4 py-2">{{
                  $t('my-courses')
                }}</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/user/words' }" class="block px-4 py-2">{{ $t('words') }}</router-link>
              </li>
            </template>
          </ul>
        </div>
      </span>
    </div>
    <div class="flex items-center space-x-2">
      <span
        class="p-2 rounded-full bg-blue-50 relative flex flex-row items-center cursor-pointer"
        v-if="userId"
        id="user-setting-dropdown"
        data-dropdown-toggle="settingDropdown"
        @click="toggleSettingDropdown"
      >
        <img
          class="w-7 h-7 rounded-full"
          :src="
            avatar
              ? avatar
              : 'https://images.unsplash.com/photo-1650972933924-9082c82d1fa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
          "
          alt="Rounded avatar"
        />
        <span class="font-semibold ml-2">{{ name }}</span>
        <svg
          class="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        <div
          id="settingDropdown"
          v-show="showSettingDropdown"
          class="z-10 bg-white divide-y divide-gray-100 rounded shadow w-40 absolute right-0 top-full"
        >
          <ul class="py-1 text-sm" aria-labelledby="dropdownDefault">
            <li class="border-b-2">
              <router-link :to="{ path: '/settings' }" class="block px-4 py-2">{{ $t('settings') }}</router-link>
            </li>
            <li><span class="px-4 py-2 block" @click="handleSignOut">Sign Out</span></li>
          </ul>
        </div>
      </span>
      <div class="flex items-center space-x-2">
        <pri-btn v-if="!userId">
          <router-link :to="{ path: '/login' }">{{ $t('login') }}</router-link>
        </pri-btn>
        <pri-btn v-if="!userId">
          <router-link :to="{ path: '/register' }">{{ $t('register') }}</router-link>
        </pri-btn>
      </div>
      <div class="">
        <select
          v-model="$i18n.locale"
          class="px-2 py-2 text-base text-center text-blue-100 bg-blue-800 rounded-md cursor-pointer"
        >
          <option v-for="item in languageArray" :key="item.shorthand" :value="item.shorthand" class="text-xs">
            {{ item.title }}
          </option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
import PriButton from '@/components/common/PriButton.vue';
export default {
  components: {
    'pri-btn': PriButton,
  },
  data() {
    return {
      showCourseDropdown: false,
      showSettingDropdown: false,
      languageArray: [
        { shorthand: 'en', title: 'English' },
        { shorthand: 'vi', title: 'Tiếng Việt' },
      ],
    };
  },
  methods: {
    toggleCourseDropdown() {
      this.showCourseDropdown = !this.showCourseDropdown;
    },
    toggleSettingDropdown() {
      this.showSettingDropdown = !this.showSettingDropdown;
    },
    handleSignOut() {
      this.$store.dispatch('LogOut');
      this.$router.push('/');
    },
  },
  computed: {
    userId() {
      return this.$store.state.user.uid;
    },
    avatar() {
      return this.$store.state.user.photoURL;
    },
    name() {
      return this.$store.state.user.name;
    },
  },
};
</script>

<style scoped>
select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
}

/* For IE10 */
select::-ms-expand {
  display: none;
}
</style>
