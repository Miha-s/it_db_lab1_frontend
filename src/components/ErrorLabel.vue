<template>
  <div class="text-red-500 text-xl">
    {{ value }}
  </div>
</template>

<script setup lang="ts">

defineProps<{
  value: string
}>()

</script>