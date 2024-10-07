<template>
  <div class="flex flex-col items-center space-y-4 mt-4">
    <CellInput placeholder="Database name" v-model="db_name" />
    <SubmitButton value="Create db" @click="create_db" />
    <CancelButton />
    <ErrorLabel :value="error_str" />
  </div>
</template>

<script setup lang="ts">
import axiosClient from '@/axiosClient';
import CancelButton from '@/components/buttons/CancelButton.vue';
import SubmitButton from '@/components/buttons/SubmitButton.vue';
import CellInput from '@/components/edit_fields/CellInput.vue';
import ErrorLabel from '@/components/ErrorLabel.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { type AxiosError } from 'axios';

const router = useRouter();

const db_name = ref("")
const error_str = ref("")

function create_db() {
  if (db_name.value.length == 0) {
    error_str.value = "empty input"
    return
  }

  axiosClient.post("/database/" + db_name.value)
    .then(() => {
      router.go(-1)
    }).catch((error: AxiosError) => {
      const data = error.response?.data as string
      if (data) {
        error_str.value = data
      }
    })
}

</script>