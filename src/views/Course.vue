<template>
  <div v-if="course.lessions">
    <h2 class="text-4xl font-semibold text-blue-600 py-4 mx-4 border-b-2">{{ course.topic }}</h2>

    <div v-if="!showLessions" class="flex flex-col justify-center items-center mt-6">
      <h4 class="text-base">{{ $t('course-description') }} {{ course.lessions.length }} {{ $t('questions') }}</h4>
      <button @click="toggleShowLessions" class="mx-12 my-4 px-4 py-2 text-blue-100 bg-green-800 rounded-md">
        {{ $t('start-lessions') }}
      </button>
    </div>
    <div v-if="showLessions">
      <p class="my-2 ml-2">{{ $t('question') }}: {{ progress + 1 }} / {{ course.lessions.length }}</p>
      <div class="bg-green-600 h-2 rounded-md relative">
        <div class="absolute left-0 top-0 bg-yellow-500 h-full rounded-md" :style="{ width: `${percentage}%` }"></div>
      </div>
      <div class="my-6 px-8 flex justify-end">
        <button class="px-4 py-2 text-blue-100 bg-blue-800 rounded-md" @click="handleNextQuestion">
          {{ $t('next') }}
        </button>
      </div>
      <div>
        <div class="flex justify-center items-center flex-col border-2 m-12 rounded-md">
          <ul class="w-full">
            <li v-for="(lession, index) in course.lessions" :key="index" class="w-full">
              <div v-if="progress === index">
                <h4 class="font-semibold text-xl bg-gray-100 w-full p-4">
                  <span class="font-bold">{{ $t('question') }} {{ index + 1 }}:</span>
                  {{ lession.question }}
                </h4>
                <ul class="w-full flex justify-around text-xl">
                  <li v-for="ans in lession.answer" :key="ans" class="flex items-center py-2 px-4">
                    <input
                      id="inline-radio"
                      type="radio"
                      :value="ans"
                      v-model="result[index]"
                      name="inline-radio-group"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="inline-radio" class="text-base ml-2 font-medium text-gray-900 dark:text-gray-300">{{
                      ans
                    }}</label>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <button class="text-base mx-12 my-4 px-4 py-2 text-blue-100 bg-blue-800 rounded-md" @click="toggleShowAnswer">
        {{ !showAnswer ? 'See the Answer' : 'Close The Help Box' }}
      </button>
      <div v-if="showAnswer" class="mx-12 my-6 px-4 py-6 bg-green-500">
        {{ $t('correct-ans') }} : {{ course.lessions[progress].trueAnswer }}
      </div>
      <div v-if="showResult">
        <table class="mx-auto">
          <thead class="text-xs text-blue-700 uppercase bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-center">{{ $t('question') }}</th>
              <th class="px-6 py-3 text-center" v-for="(ans, index) in result" :key="index">{{ index + 1 }}</th>
            </tr>
          </thead>
          <tbody class="text-xs">
            <tr>
              <th class="px-6 py-3 text-center">{{ $t('ans') }}</th>
              <td class="px-6 py-3 text-center" v-for="(ans, index) in result" :key="index">{{ ans }}</td>
            </tr>
            <tr>
              <th class="px-6 py-3 text-center">{{ $t('correct-ans') }}</th>
              <td class="px-6 py-3 text-center bg-green-400" v-for="(ans, index) in answers" :key="index">
                {{ ans }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 flex justify-center">
          <button class="mr-4 px-4 py-2 text-blue-100 bg-green-800 rounded-md" @click="restartLessions">
            Restart Lessions
          </button>
          <button class="px-4 py-2 text-blue-100 bg-green-800 rounded-md" @click="handleSaveLessions">
            Save My Result
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, where, getDocs } from '@firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
export default {
  data() {
    return {
      course: {},
      progress: 0,
      percentage: 0,
      result: [],
      showAnswer: false,
      showLessions: false,
      showResult: false,
    };
  },
  methods: {
    //Load Course when component created
    async loadCourse() {
      const id = this.$router.currentRoute.params.id;
      const q = query(collection(db, 'courses'), where('id', '==', id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      this.course = data[0];
    },

    toggleShowAnswer() {
      this.showAnswer = !this.showAnswer;
    },

    toggleShowLessions() {
      this.showLessions = !this.showLessions;
    },
    handleNextQuestion() {
      console.log(this.course.lessions[this.progress]);
      if (this.result[this.progress] === null) {
        return alert('Choose Answer');
      }
      if (this.progress === this.course.lessions.length - 1) {
        this.showResult = true;
      } else this.progress += 1;
    },
    async restartLessions() {
      await this.loadCourse();
      this.progress = 0;
      this.showResult = false;
    },
    handleSaveLessions() {
      let arr = [];
      this.result.forEach((item, index) => {
        if (this.course.lessions[index].trueAnswer === item) {
          arr.push({
            vocabulary: this.course.lessions[index].vocabulary,
            index,
            meaning: this.course.lessions[index].trueAnswer,
          });
        }
      });
      this.$store.dispatch('SaveCourseDetail', { arr, id: this.$router.currentRoute.params.id });
      this.$router.push('/user/words');
    },
  },
  created() {
    this.loadCourse();
  },
  watch: {
    progress() {
      this.percentage = (this.progress * 100) / (this.course.lessions.length - 1);
    },
    course() {
      if (this.course.lessions) {
        this.result = new Array(this.course.lessions.length).fill(null);
      }
    },
  },
  computed: {
    answers() {
      return this.course.lessions.map((item) => item.trueAnswer);
    },
  },
};
</script>

<style></style>
