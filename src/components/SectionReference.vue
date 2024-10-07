<template>
  <router-link :to="{ name: 'Menu' }"
    class="transition-colors text-3xl text-white p-2 border-2 border-green-400 my-2 px-16 rounded-3xl text-center hover:bg-green-400 hover:text-black">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts"></script>
