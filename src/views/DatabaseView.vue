<template>
  <div class="flex flex-col items-center space-y-4">
    <InfoLabel>{{ $route.params.db_name }}</InfoLabel>
    <SectionReference v-for="table in tables"
      :to="{ name: 'TableView', params: { db_name: $route.params.db_name, table: table } }">{{ table }}
    </SectionReference>
    <SubmitButton value="Create table" @click="create_table" />
    <CancelButton />
  </div>
</template>


<script setup lang="ts">
import axiosClient from '@/axiosClient';
import InfoLabel from '@/components/InfoLabel.vue';
import SectionReference from '@/components/SectionReference.vue';
import CancelButton from '@/components/buttons/CancelButton.vue';
import SubmitButton from '@/components/buttons/SubmitButton.vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const tables = ref<Array<string>>([])

function create_table() {
  router.push({
    name: "CreateTable"
  })
}

function load_tables() {
  axiosClient.get("/database/" + route.params.db_name).then((resp) => {
    tables.value = resp.data.tables as Array<string>
  })
}

onMounted(() => {
  load_tables()
})

</script>