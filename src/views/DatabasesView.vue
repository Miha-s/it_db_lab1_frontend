<template>
  <div class="flex flex-col text-2xl">
    <SectionReference v-for="db in databases" :to="{ name: 'DatabaseView', params: { db_name: db } }">{{ db }}
    </SectionReference>
    <SubmitButton value="Create db" @click="create_db" />
  </div>
</template>

<script setup lang="ts">
import axiosClient from '@/axiosClient';
import SubmitButton from '@/components/buttons/SubmitButton.vue';
import SectionReference from '@/components/SectionReference.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { type AxiosResponse } from 'axios';

const router = useRouter()


const databases = ref<Array<string>>([])

function get_databases() {
  axiosClient.get("/database").then(
    (resp: AxiosResponse) => {
      console.log(resp)
      databases.value = resp.data.databases as Array<string>
    }
  )
}

function create_db() {
  router.push({
    name: "CreateDatabase"
  })
}

onMounted(() => {
  get_databases()
})


</script>