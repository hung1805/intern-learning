<template>
  <div class="bg-gray-100 mx-32 p-6">
    <div class="flex justify-center">
      <div class="mb-3 w-96">
        <label for="formFile" class="form-label inline-block mb-2 text-gray-700">Only accept csv file</label>
        <input
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded cursor-pointer"
          type="file"
          id="formFile"
          accept=".csv"
          @change="parse_csv"
        />
      </div>
    </div>
    <div class="mb-6">
      <label for="topic" class="block mb-2 text-sm font-medium text-gray-900">Course Topic</label>
      <input
        type="text"
        id="topic"
        v-model="topic"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
    <button class="px-4 py-2 text-blue-100 bg-blue-800 rounded-md" @click="importCourse">Import Course</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parsed_csv: null,
      uploaded_csv_data: null,
      feedback: null,
      access_code_prefix: '',
      access_code_count: 0,
      new_access_list: [],
      access_code_type: 'viewer',
      access_code_types: [
        {
          text: 'Internal',
          value: 'internal',
        },
        {
          text: 'Viewer',
          value: 'viewer',
        },
      ],
      topic: null,
    };
  },
  methods: {
    async parse_csv(e) {
      let raw_results = [];
      let files = e.target.files || e.datatransfer.files;
      if (!files.length) return (this.feedback = 'Invalid File');
      var file = e.target.files[0];
      await this.$papa.parse(file, {
        header: true,
        complete: (results) => {
          raw_results = results;
          console.log('results', results);

          return this.stage_uploaded_csv(results);
        },
      });
    },
    stage_uploaded_csv(csv_read_results) {
      this.uploaded_csv_data = csv_read_results.data;
    },
    importCourse() {
      console.log(this.uploaded_csv_data);
      const data = this.uploaded_csv_data.map((item) => {
        return {
          question: item.question,
          trueAnswer: item.trueAnswer,
          answer: [item.answer1, item.answer2, item.answer3, item.answer4],
          vocabulary: item.vocabulary,
        };
      });
      if (!this.topic) return;
      else
        this.$store.dispatch('UploadCourse', {
          topic: this.topic,
          data: data,
          id: this.$store.state.courses.length,
        });
    },
  },
};
</script>

<style></style>
