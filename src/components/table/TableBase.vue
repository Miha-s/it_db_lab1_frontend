<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
      <InfoCell v-for="row_name in rows_names">{{ row_name }}</InfoCell>
      <AddButton @click="() => $emit('on_add')" />
    </div>
    <div class="flex flex-row" v-for="row in rows_values">
      <InfoCell v-for="cell in row">{{ cell }}</InfoCell>
      <EditButton @click="$emit('on_edit', row)" title="edit row"/>
      <RemoveButton @click="$emit('on_remove', row)" title="remove row"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddButton from '../buttons/AddButton.vue';
import EditButton from '../buttons/EditButton.vue';
import RemoveButton from '../buttons/RemoveButton.vue';
import InfoCell from './InfoCell.vue';

defineProps<{
  rows_names: Array<string>,
  rows_values: Array<Array<string>>,
}>()

defineEmits<{
  (event: "on_add"): void,
  (event: "on_remove", row: Array<string>): void,
  (event: "on_edit", row: Array<string>): void
}>()

</script>