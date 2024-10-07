<template>
  <input type="submit" value="return" @click="goBack" class="transition-colors mx-2 w-72 text-3xl py-1 rounded-3xl border-red-600 
    text-red-600 hover:bg-red-600 hover:text-white hover:cursor-pointer bg-transparent border ">
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';
const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>