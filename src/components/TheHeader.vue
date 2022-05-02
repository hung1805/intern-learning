<template>
  <nav class="container flex justify-around py-8 mx-auto bg-white">
    <div class="flex items-center">
      <h3 class="text-2xl font-medium text-blue-500">
        <router-link :to="{ path: '/' }">E-LEARNING</router-link>
      </h3>
    </div>
    <div class="items-center hidden space-x-8 lg:flex">
      <router-link :to="{ path: '/' }">Home</router-link>
      <router-link :to="{ path: '/about-us' }">About Us</router-link>
      <span
        id="dropdownDividerButton"
        data-dropdown-toggle="courseDropdown"
        class="font-normal rounded-lg text-sm px-4 py-3 text-center inline-flex items-center cursor-pointer relative"
        @click="toggleCourseDropdown"
      >
        Courses
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
              <router-link :to="{ path: '/user/courses' }" class="block px-4 py-2">My Courses</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/all-courses' }" class="block px-4 py-2">All Courses</router-link>
            </li>
          </ul>
        </div>
      </span>
    </div>
    <div class="flex items-center space-x-2">
      <span
        class="p-2 rounded-full bg-blue-50 relative flex flex-row items-center cursor-pointer"
        v-if="user"
        id="user-setting-dropdown"
        data-dropdown-toggle="settingDropdown"
        @mouseover="toggleSettingDropdown"
      >
        <img
          class="w-7 h-7 rounded-full"
          src="https://images.unsplash.com/photo-1650972933924-9082c82d1fa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt="Rounded avatar"
        />
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
            <li>
              <router-link :to="{ path: '/setting' }" class="block px-4 py-2">Settings</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/profile' }" class="block px-4 py-2">Profile</router-link>
            </li>
          </ul>
        </div>
      </span>
      <div class="flex items-center space-x-2">
        <button class="px-4 py-2 text-blue-100 bg-blue-800 rounded-md" v-if="!user">
          <router-link :to="{ path: '/login' }">Sign in</router-link>
        </button>
        <button class="px-4 py-2 text-gray-200 bg-gray-400 rounded-md" v-if="!user">
          <router-link :to="{ path: '/register' }">Sign up</router-link>
        </button>
        <button class="px-4 py-2 text-blue-100 bg-blue-800 rounded-md" @click="handleSignOut" v-if="user">
          Sign Out
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showCourseDropdown: false,
      showSettingDropdown: false,
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
