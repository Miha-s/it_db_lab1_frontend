<template>
  <div class="flex flex-col space-y-5  items-center mt-5">
    <InfoLabel>{{ $route.params.db_name }} | {{ $route.params.table }} | {{ $route.params.id }}</InfoLabel>
    <div v-for="(attr, index) in attributes" class="flex flex-col items-center">
      <div v-if="attr.name != 'id'">
        <div class="flex flex-row space-x-2 justify-center">
          <span class="text-white font-bold">{{ attr.name }}</span>
          <span class="text-white font-bold">:</span>
          <span class="text-yellow-400">{{ attr.type }}</span>
        </div>
        <CellInput :validators="[emptyValidator]" v-model="attributeValues[index]" />
      </div>
    </div>
    <SubmitButton value="Submit" @click="add_row" />
    <CancelButton />
    <ErrorLabel :value="err_str" />
  </div>
</template>

<script setup lang="ts">
import CellInput from '@/components/edit_fields/CellInput.vue';
import { onMounted, ref } from 'vue';
import SubmitButton from '@/components/buttons/SubmitButton.vue';
import CancelButton from '@/components/buttons/CancelButton.vue';
import InfoLabel from '@/components/InfoLabel.vue';

import { emptyValidator } from '@/components/edit_fields/Validators';
import axiosClient from '@/axiosClient';
import { useRoute, useRouter } from 'vue-router';
import type { AxiosError, AxiosResponse } from 'axios';
import ErrorLabel from '@/components/ErrorLabel.vue';

interface Attribute {
  name: string;
  type: string;
}

const router = useRouter()
const route = useRoute()
const err_str = ref("")

const attributes = ref<Array<Attribute>>([])

const attributeValues = ref<Array<string>>([]);

function get_attributes() {
  axiosClient.get(`/database/${route.params.db_name}/${route.params.table}`)
    .then((resp: AxiosResponse) => {
      const attrs = resp.data.attributes as Array<Attribute>
      if (attrs) {
        attributes.value = attrs
      }
    })
}

function add_row() {

  const id = route.params.id as string
  if (id) {
    attributeValues.value[0] = id
    const data = JSON.stringify({
      new_row: attributeValues.value.filter(item => item !== undefined)
    });

    axiosClient.patch(`/database/${route.params.db_name}/${route.params.table}/rows?id=${id}`, data)
      .then(() => {
        router.go(-1)
      }).catch((err: AxiosError) => {
        const data = err.response?.data as string
        if (data) {
          err_str.value = data
        }
      })
  } else {
    const data = JSON.stringify({
      new_row: attributeValues.value.filter(item => item !== undefined)
    });

    axiosClient.post(`/database/${route.params.db_name}/${route.params.table}/rows`, data)
      .then(() => {
        router.go(-1)
      }).catch((err: AxiosError) => {
        const data = err.response?.data as string
        if (data) {
          err_str.value = data
        }
      })
  }


}

function load_row() {
  const id = route.params.id
  if (!id) {
    return
  }

  axiosClient.get(`/database/${route.params.db_name}/${route.params.table}/rows/${id}`)
    .then((resp: AxiosResponse) => {
      const row = resp.data.row as string[]
      if (row) {
        attributeValues.value = row
      }
    }).catch((err) => {
      const data = err.response?.data as string
      console.log(err)
      if (data) {
        err_str.value = data
      }
    })
}

onMounted(() => {
  get_attributes()
  load_row()
})


</script>