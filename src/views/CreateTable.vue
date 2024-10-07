<template>
  <div class="flex flex-col items-center space-y-4 mt-4">
    <div class="flex flex-col items-center">
      <CellInput placeholder="Table name" v-model="table_name" />

      <div class="flex flex-row space-x-4" v-for="attr in table_attributes">
        <CellInput placeholder="Attribute name" v-model="attr.name" />
        <Selector :options="available_types" v-model="attr.type" defaultOption="integer" />
      </div>
    </div>
    <button class="transition-colors text-2xl py-1 px-5 rounded-3xl text-yellow-300 bg-transparent hover:cursor-pointer
     hover:bg-yellow-300 hover:text-black border border-yellow-300" @click="add_row"> Add row </button>
    <SubmitButton value="Create table" @click="create_table" />
    <CancelButton />
    <ErrorLabel :value="error_str" />
  </div>
</template>

<script setup lang="ts">
import axiosClient from '@/axiosClient';
import CancelButton from '@/components/buttons/CancelButton.vue';
import SubmitButton from '@/components/buttons/SubmitButton.vue';
import CellInput from '@/components/edit_fields/CellInput.vue';
import Selector from '@/components/edit_fields/Selector.vue';
import ErrorLabel from '@/components/ErrorLabel.vue';
import type { AxiosError } from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const available_types = ref(["integer", "real", "char", "color", "string"])
const error_str = ref("")
const table_name = ref("")

interface Attribute {
  name: string;
  type: string;
}

const table_attributes = ref<Array<Attribute>>([{
  name: "",
  type: "integer"
}])

function add_row() {
  table_attributes.value.push({
    name: "",
    type: "integer"
  })
}

function create_table() {
  if (table_name.value.length == 0) {
    error_str.value = "Fill table name!"
    return
  }
  for (const attr of table_attributes.value) {
    if (!attr.name.length) {
      error_str.value = "Fill all names!"
      return
    }
  }

  const params = new URLSearchParams();
  
  table_attributes.value.forEach(attr => {
    params.append(attr.name, attr.type);
  });

  const url = `/database/${route.params.db_name}/${table_name.value}?${params.toString()}`;

  axiosClient.post(url).then(() => {
    router.go(-1)
  }).catch((err: AxiosError) => {
    const data = err.response?.data as string
    if(data) {
      error_str.value = data
    }
  })
}

</script>