<script lang="ts" setup>
import { cn } from "@/lib/utils";

interface Props {
  text?: string;
  class?: string;
}
const props = withDefaults(defineProps<Props>(), {
  text: "Button",
});
</script>

<template>
  <button
    :class="
      cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-full border border-gold-primary/30 bg-space-black p-2.5 px-6 text-center font-semibold text-gold-primary transition-all duration-300 hover:border-gold-primary/60 hover:shadow-[0_0_15px_rgba(122,36,53,0.3)]',
        props.class,
      )
    "
  >
    <div class="flex items-center gap-2 justify-center">
      <div
        class="bg-wine-red w-2 h-2 scale-100 rounded-full transition-all duration-500 ease-out group-hover:scale-[35]"
      />
      <span
        class="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
      >
        {{ text }}
      </span>
    </div>

    <div
      class="text-text-primary absolute inset-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    >
      <span class="whitespace-nowrap font-medium">{{ text }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-right w-4 h-4 text-gold-primary"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </button>
</template>

<style scoped>
button {
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>
