<template>
  <router-link :to="{ name: name }" class="flex flex-row items-center mx-1">
    <div class="w-0.5 transition-[height] ease-out duration-200 rounded-xl"
      :class="{ 'h-4/5': highlighted, 'h-1/5': !highlighted, 'bg-transparent': !highlighted, 'bg-violet-200': highlighted }">
    </div>
    <div :class="{ 'text-white': !(highlighted || active), 'text-cyan-500': highlighted || active }"
      @mouseover="() => hovered = true" class="text-2xl px-2 py-2 font-serif" @mouseleave="() => hovered = false">
      <slot></slot>
    </div>
    <div class="w-0.5 transition-[height] ease-out duration-200 rounded-xl"
      :class="{ 'h-4/5': highlighted, 'h-1/5': !highlighted, 'bg-transparent': !highlighted, 'bg-violet-200': highlighted }">
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const props = defineProps<{
  name: string,
}>()

const hovered = ref(false)
const highlighted = computed(() => {
  return hovered.value
})

const active = computed(() => {
  return route.name === props.name
})

</script>