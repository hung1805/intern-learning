<template>
  <div class="container px-6 py-12 h-full">
    <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
        <form @submit.prevent="handleSignup">
          <!-- Name input -->
          <div class="mb-6">
            <input
              type="text"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Your Name"
              @blur="validateName"
              v-model.trim="name"
            />
            <p class="text-red-700 text-xs" v-if="nameValidator">{{ nameValidator }}</p>
          </div>
          <!-- Email input -->
          <div class="mb-6">
            <input
              type="text"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              v-model.trim="email"
              @blur="validateEmail"
            />
            <p class="text-xs text-red-700" v-if="emailValidator">{{ emailValidator }}</p>
          </div>

          <!-- Password input -->
          <div class="mb-6">
            <input
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              v-model.trim="password"
              @blur="validatePassword"
            />
            <p class="text-xs text-red-700" v-if="passwordValidator">{{ passwordValidator }}</p>
          </div>
          <!-- Confirm Password input -->
          <div class="mb-6">
            <input
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Confirm Password"
              v-model.trim="rePassword"
              @blur="validateRePassword"
            />
            <p class="text-xs text-red-700" v-if="rePasswordValidator">{{ rePasswordValidator }}</p>
          </div>

          <button
            type="submit"
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            {{ $t('register') }}
          </button>
        </form>
      </div>
      <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="w-full"
          alt="Phone image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      emailValidator: '',
      passwordValidator: '',
      nameValidator: '',
      rePassword: '',
      rePasswordValidator: '',
    };
  },
  methods: {
    validateName() {
      if (this.name === '') this.nameValidator = 'Please enter your name';
    },
    validateEmail() {
      if (this.email === '') {
        return (this.emailValidator = 'Email is required!');
      }
    },
    validatePassword() {
      if (this.password === '') {
        return (this.passwordValidator = 'Password is required!');
      }
    },
    validateRePassword() {
      if (this.rePassword === '') {
        return (this.rePasswordValidator = 'Please re-enter your password');
      }
      if (this.password != this.rePassword) return (this.rePasswordValidator = 'Confirm Password is not match');
    },
    handleSignup() {
      if (!this.emailValidator && !this.passwordValidator && !this.rePasswordValidator) {
        this.$store.dispatch('Register', { name: this.name, email: this.email, password: this.password });
        this.$router.push('/');
      }
    },
  },
};
</script>

<style></style>
