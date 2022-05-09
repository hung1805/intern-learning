<template>
  <div>
    <div class="p-8 grid gap-8 grid-cols-3">
      <div
        v-for="course in courses"
        :key="course.id"
        class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <router-link :to="{ path: `/courses/${course.id}`, params: { id: course.id } }">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ course.topic }}
          </h5>
        </router-link>
        <p class="my-3">
          {{ course.description }}
        </p>
        <pri-btn>
          <router-link :to="{ path: `/courses/${course.id}`, params: { id: course.id } }">
            {{ $t('start-course') }}
          </router-link>
        </pri-btn>
      </div>
    </div>
    <div class="p-20 text-center">
      <template v-if="!courses">
        <h3 class="text-base py-4">You have registered no course</h3>
        <pri-btn> <router-link :to="{ path: '/all-courses' }">See All Courses</router-link> </pri-btn>
      </template>
    </div>
  </div>
</template>

<script>
import { query, collection, where, getDocs } from '@firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import PriButton from '@/components/common/PriButton.vue';
export default {
  components: { 'pri-btn': PriButton },

  data() {
    return {
      courses: [],
    };
  },
  methods: {
    async loadUserCourses() {
      this.$store.state.courses.forEach(async (element) => {
        const q = query(collection(db, 'courses'), where('id', '==', element.id));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.courses.push(data[0]);
      });
    },
  },
  created() {
    this.loadUserCourses();
  },
  computed: {
    process() {
      const arr = [];
      this.$store.state.courses.forEach((item) => {
        if (item.voca) {
          arr.push([...item.voca]);
        }
      });
      return arr;
    },
  },
};
</script>

<style></style>
