<template>
  <div>
    <div class="w-full relative">
      <input
        @input="checkInput"
        :placeholder="placeholder"
        :type="hiddenType"
        @blur="$emit('blur')"
        :value="modelValue"
        :class="[
          baseStyle,
          currentBorderColor,
          {
            'pr-12': eye,
          },
        ]"
      />
    </div>
    <div class="h-6 ml-5 mt-1 text-red-500 text-sm">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { type ValidatorType } from "./Validators";

const props = defineProps<{
  validators?: Array<ValidatorType>;
  baseStyle: string;
  borderColor: string;
  placeholder?: string;
  eye?: boolean;
  hidden?: boolean;
  modelValue?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "error", error: boolean): void;
  (event: "blur"): void;
}>();

const errorMessage = ref("");
const eyeIcon = ref("eye");
const hiddenType = ref("");
const eyeIconMap = new Map([
  [true, "eye"],
  [false, "eye-slash"],
]);

function checkInput(inputEvent: Event) {
  const value = (inputEvent.target as HTMLInputElement).value;
  emit("update:modelValue", value);

  if (props.validators) {
    for (let i = 0; i < props.validators.length; i++) {
      const validator = props.validators[i];
      const error = validator(value);
      if (error) {
        errorMessage.value = error;
        emit("error", true);
        return;
      }
    }
  }

  emit("error", false);
  errorMessage.value = "";
}

function toggleVisibility() {
  if (eyeIcon.value === eyeIconMap.get(true)) {
    hiddenType.value = "password";
    eyeIcon.value = eyeIconMap.get(false) as string;
  } else {
    hiddenType.value = "";
    eyeIcon.value = eyeIconMap.get(true) as string;
  }
}

const currentBorderColor = computed(() => {
  return errorMessage.value ? "border-red-500" : props.borderColor;
});

onMounted(() => {
  if (props.hidden) toggleVisibility();
});
</script>
