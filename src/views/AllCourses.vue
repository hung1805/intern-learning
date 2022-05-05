<template>
  <ul class="grid grid-cols-3 gap-8 p-4">
    <course-card v-for="course in courses" :course="course" :key="course.topic"></course-card>
  </ul>
</template>

<script>
import { db } from '@/firebase/firebaseConfig';
import { getDocs, collection } from '@firebase/firestore';
import CourseCard from '@/components/CourseCard.vue';
export default {
  components: {
    'course-card': CourseCard,
  },
  data() {
    return {
      courses: [],
      isLoading: false,
      error: '',
    };
  },
  methods: {
    async getAllCourses() {
      this.isLoading = true;
      try {
        const res = await getDocs(collection(db, 'courses'));
        if (res.docs) {
          const data = res.docs.map((doc) => doc.data());
          this.courses = data;
          this.isLoading = false;
        } else throw new Error(res);
      } catch (error) {
        this.error = error;
      }
    },
  },
  created() {
    this.getAllCourses();
  },
};
</script>

<style></style>
