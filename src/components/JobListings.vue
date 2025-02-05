<script setup>
import JobListing from './JobListing.vue';
import { defineProps, onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
});

const state = reactive({
  jobs: [],
  isLoading: true
});

onMounted(async() => {
  console.log(import.meta.env.VITE_PUBLIC_URL);
  try {
    const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/jobs`);
    state.jobs = res.data;
  } catch (error) {
    console.log('Error fetching jobs', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl fonr-bol text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div class="text-center text-gray-500 py-6" v-if="state.isLoading"><PulseLoader /></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-else>
        <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
      <RouterLink
        to="/jobs"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</RouterLink
      >
    </section>

</template>