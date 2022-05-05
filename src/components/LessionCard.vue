<template>
  <div class="relative">
    <div class="px-12 my-4 py-2 bg-gray-100 flex justify-between">
      <button
        @click="handlePreQuestion"
        class="px-4 py-2 text-blue-100 bg-blue-800 rounded-md disabled:opacity-25"
        :disabled="progress === 0"
      >
        Previous
      </button>
      <button @click="handleNextQuestion" class="px-4 py-2 text-blue-100 bg-blue-800 rounded-md">Next</button>
    </div>
    <div class="flex justify-center items-center flex-col border-2 m-12 rounded-md">
      <h4 class="font-semibold text-2xl bg-gray-100 w-full p-4">
        <span class="font-bold">Question:</span> {{ lession.question }}
      </h4>
      <ul class="w-full flex justify-around text-xl">
        <li v-for="ans in lession.answer" :key="ans" class="flex items-center py-2 px-4">
          <input
            id="inline-radio"
            type="radio"
            :value="ans"
            v-model="result"
            name="inline-radio-group"
            class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="inline-radio" class="ml-2 font-medium text-gray-900 dark:text-gray-300">{{ ans }}</label>
        </li>
      </ul>
    </div>
    <button class="mx-12 my-4 px-4 py-2 text-blue-100 bg-blue-800 rounded-md" @click="toggleShowAnswer">
      {{ !showAnswer ? 'See the Answer' : 'Close The Help Box' }}
    </button>
    <div v-if="showAnswer" class="mx-12 my-6 px-4 py-6 bg-green-500">Correct Answer Is: {{ lession.trueAnswer }}</div>
    <div>
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th>Ques</th>
            <th v-for="(ans, index) in answers" :key="index">{{ index }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">Ans:</th>
            <td class="px-6 py-4" v-for="(ans, index) in answers" :key="index">{{ ans }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['lession', 'progress', 'length', 'answers'],

  data() {
    return {
      showAnswer: false,
      result: null,
      showResult: false,
    };
  },
  methods: {
    toggleShowAnswer() {
      this.showAnswer = !this.showAnswer;
    },
    handleNextQuestion() {
      // this.$emit('send-result-back', this.result);
      // if (this.progress < this.length - 1) {
      //   this.$emit('adjust-progress', 1);
      // } else return;
      if (this.progress < this.length) {
        this.$emit('send-result-back', this.result);
        this.$emit('adjust-progress', 1);
      } else {
        this.$emit('send-result-back', this.result);
        this.showResult = true;
      }
    },
    handlePreQuestion() {
      if (this.progress === 0) {
        this.$emit('send-result-back', this.result);
        return;
      } else {
        this.$emit('send-result-back', this.result);
        this.$emit('adjust-progress', -1);
      }
    },
  },
  watch: {
    progress: {
      immediate: true,
      handler() {
        if (this.answers[this.progress] !== null) {
          this.result = this.answers[this.progress];
        } else this.result = null;
      },
    },
  },
};
</script>

<style></style>
