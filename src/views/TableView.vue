<template>
  <div class="flex flex-col items-center space-y-8 mt-2">
    <InfoLabel>{{ $route.params.table }}</InfoLabel>
    <TableBase :rows_names="rows_names" :rows_values="rows_values" @on_edit="on_edit($event)" @on_remove="remove_row" />
    <SubmitButton value="Add row" @click="add_row" />
    <SubmitButton value="Remove duplicates" @click="remove_duplicates" />

    <CancelButton />
  </div>

</template>

<script setup lang="ts">
import TableBase from '@/components/table/TableBase.vue';
import CancelButton from '@/components/buttons/CancelButton.vue';
import SubmitButton from '@/components/buttons/SubmitButton.vue';
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import InfoLabel from '@/components/InfoLabel.vue';
import axiosClient from '@/axiosClient';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface Attribute {
  name: string,
  type: string,
}

const router = useRouter()
const route = useRoute()

const db_name = route.params.db_name
const table_name = route.params.table


const rows_names = ref<Array<string>>([])

const rows_values = ref<Array<Array<string>>>([])

function add_row() {
  router.push({
    name: "AddRow",
    params: {
      db_name: db_name,
      table: table_name,
    }
  })
}

function on_edit(row: Array<string>) {
  router.push({
    name: "AddRow",
    params: {
      db_name: db_name,
      table: table_name,
      id: row[0]
    }
  })
}

function get_rows_names() {
  axiosClient.get(`/database/${route.params.db_name}/${route.params.table}`)
    .then((resp: AxiosResponse) => {
      const attrs = resp.data.attributes as Array<Attribute>
      if (attrs) {
        rows_names.value = []
        attrs.forEach(attr => {
          rows_names.value.push(attr.name)
        });
      }
    })
}

function get_rows() {
  axiosClient.get(`/database/${route.params.db_name}/${route.params.table}/rows`)
    .then((resp: AxiosResponse) => {
      const data = resp.data.rows as Array<Array<string>>
      if (data) {
        rows_values.value = data
      }
    })
}

function remove_row(row: string[]) {
  axiosClient.delete(`/database/${route.params.db_name}/${route.params.table}/rows/${row[0]}`)
    .then(() => {
      get_rows()
    }).catch((err) => {
      console.log(err)
    })
}

function remove_duplicates() {
  axiosClient.patch(`/database/${route.params.db_name}/${route.params.table}/rows/remove_duplicates`)
  .then(() => {
    get_rows()
  })
}

onMounted(() => {
  get_rows_names()
  get_rows()
})
</script>