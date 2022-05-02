<template>
  <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <router-link :to="{ path: `/courses/${course.id}`, params: { id: course.id } }">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ course.topic }}
      </h5>
    </router-link>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum adipisci ipsam doloribus voluptates placeat ipsum
      natus ab nemo fugit odit.
    </p>
    <button class="mt-2 px-4 py-2 text-blue-100 bg-blue-800 rounded-md" @click="registerCourse(course)">
      Get This Course
    </button>
  </div>
</template>

<script>
export default {
  props: ['course'],
  methods: {
    registerCourse(course) {
      if (!this.$store.state.user) {
        this.$router.push('/login');
      } else {
        if (this.$store.state.courses.indexOf(course.id) > -1) {
          alert('You have register this course');
        } else {
          this.$store.dispatch('RegisterCourse', { course, userId: this.$store.state.user.uid });
        }
      }
    },
  },
};
</script>

<style></style>
