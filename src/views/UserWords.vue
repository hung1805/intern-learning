<template>
  <div class="py-6 px-40">
    <h4 class="text-xl font-bold text-blue-700">You have learn these words:</h4>
    <ul>
      <table class="mx-auto my-6 border-2 rounded-md">
        <thead class="text-xs text-blue-700 uppercase bg-gray-50">
          <tr>
            <th class="px-6 py-3">Words</th>
            <th class="px-6 py-3" v>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in vocabulary" :key="index">
            <td class="px-6 py-3 text-center">{{ item.vocabulary }}</td>
            <td class="px-6 py-3 text-center">{{ item.meaning }}</td>
          </tr>
        </tbody>
      </table>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    vocabulary() {
      const arr = [];
      this.$store.state.courses.forEach((course) => {
        if (course.voca !== undefined) {
          course.voca.forEach((item) => {
            arr.push(item);
          });
        }
      });
      return arr;
    },
  },
};
</script>

<style></style>
