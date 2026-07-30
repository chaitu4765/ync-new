<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

const emit = defineEmits<{
  (e: 'complete'): void
}>();

const progress = ref(0);
const isTransitioning = ref(false);

const loadingText = computed(() => {
  if (progress.value < 25) return 'Initializing YNC Network...';
  if (progress.value < 50) return 'Loading Community Database...';
  if (progress.value < 75) return 'Connecting Future Leaders...';
  return 'Authenticating Universe...';
});

onMounted(() => {
  const duration = 2400; // 2.4s loading
  const intervalTime = 30;
  const steps = duration / intervalTime;
  const increment = 100 / steps;

  const timer = setInterval(() => {
    if (progress.value < 100) {
      // Add a slight randomization to feel organic
      const randomBoost = Math.random() > 0.8 ? Math.random() * 5 : 0;
      progress.value = Math.min(100, progress.value + increment + randomBoost);
    } else {
      clearInterval(timer);
      isTransitioning.value = true;
      setTimeout(() => {
        emit('complete');
      }, 600); // Wait for fade-out animation
    }
  }, intervalTime);
});
</script>

<template>
  <div
    class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-space-black transition-all duration-700 ease-in-out"
    :class="{ 'opacity-0 pointer-events-none scale-105': isTransitioning }"
  >
    <!-- Background sparkles for magical entry -->
    <div class="absolute inset-0 opacity-40">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="0.8"
        :max-size="2"
        :speed="3"
        :particle-density="70"
      />
    </div>

    <!-- Cosmic Glow Background Spotlight -->
    <div class="absolute w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />

    <div class="relative z-10 flex flex-col items-center">
      <!-- Animated Logo Ring -->
      <div class="relative w-32 h-32 mb-8 flex items-center justify-center">
        <!-- Golden Outer Rotating Orbit -->
        <svg class="absolute inset-0 w-full h-full animate-[spin_6s_linear_infinite]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="url(#goldGradient)"
            stroke-width="1.5"
            stroke-dasharray="10 25 40 10"
            class="opacity-80"
          />
        </svg>

        <!-- Inner Counter Rotating Orbit -->
        <svg class="absolute inset-0 w-full h-full animate-[spin_4s_linear_infinite_reverse]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="url(#bronzeGradient)"
            stroke-width="1"
            stroke-dasharray="30 15 5 15"
            class="opacity-60"
          />
        </svg>

        <!-- Main Gold Core Symbol -->
        <div class="w-16 h-16 rounded-full overflow-hidden border border-gold-primary/30 flex items-center justify-center bg-space-black shadow-[0_0_30px_rgba(217,178,122,0.15)]">
          <img src="/images/ync_logo.jpg" alt="YNC Logo" class="w-full h-full object-cover select-none" />
        </div>

        <!-- SVG Gradients Definition -->
        <svg class="w-0 h-0 absolute">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F3D8B5" />
              <stop offset="50%" stop-color="#D9B27A" />
              <stop offset="100%" stop-color="#8A5E3B" />
            </linearGradient>
            <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#8A5E3B" />
              <stop offset="50%" stop-color="#5C1E28" />
              <stop offset="100%" stop-color="#D7A98C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Text Reveal -->
      <h2 class="font-serif text-2xl md:text-3xl font-semibold tracking-[0.25em] text-gold-primary mb-2 select-none animate-[pulse_2s_ease-in-out_infinite]">
        Y N C
      </h2>
      <p class="font-sans text-xs tracking-[0.4em] text-text-muted/70 uppercase mb-8 select-none">
        Youth Networking Community
      </p>

      <!-- Custom Luxury Loading Progress Bar -->
      <div class="relative w-64 h-[2px] bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
        <div
          class="absolute left-0 top-0 h-full bg-gradient-to-r from-gold-bronze via-gold-primary to-gold-champagne rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_#D9B27A]"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <!-- Live progress percentage indicator -->
      <span class="mt-3 text-[9px] tracking-[0.25em] text-gold-soft/60 uppercase select-none font-sans font-bold">
        {{ loadingText }} ({{ Math.round(progress) }}%)
      </span>
    </div>
  </div>
</template>
