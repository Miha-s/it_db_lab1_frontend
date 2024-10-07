<template>
  <div class="flex flex-col min-h-screen bg-gray-800">
    <div class="flex justify-center bg-gradient-to-r from-zinc-900 to-gray-900 py-1">
      <menu-element name="DatabasesView">Databases</menu-element>
    </div>
    <div class="flex justify-center">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuElement from '@/components/MenuElement.vue';

</script>