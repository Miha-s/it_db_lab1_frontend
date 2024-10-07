<template>
  <div class="w-[82] text-white">
    <select @change="update"
      class="box-border h-12 mb-6 focus:border-yellow-300 focus:outline-none focus:border-2 border w-full py-2 px-4 rounded-3xl text-xl bg-gray-700 border-blue-300 font-medium">
      <option v-for="opt of options" :key="opt" :selected="opt == defaultOption">
        {{ opt }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  options: Array<string>,
  modelValue: string,
  defaultOption: string,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()


function update(event: Event) {
  if (!event.target) {
    return
  }
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>