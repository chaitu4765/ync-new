<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

const router = useRouter();
const isWarping = ref(false);

function initiateWarp() {
  isWarping.value = true;
  // Hold for the zoom warp animation, then route to the Auth terminal
  setTimeout(() => {
    router.push('/auth');
  }, 1000);
}
</script>

<template>
  <section
    id="join-portal"
    class="relative py-28 md:py-36 px-6 bg-space-black flex flex-col items-center justify-center overflow-hidden select-none"
  >
    <!-- Background sparkles overlay inside portal sector -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1"
        :max-size="3.5"
        :speed="3"
        :particle-density="55"
      />
    </div>

    <!-- Ambient Portal Glows -->
    <div class="absolute w-[600px] h-[600px] rounded-full bg-wine-red/5 blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

    <div class="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
      
      <!-- Premium Tag -->
      <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-6 block">
        Direct Gateway
      </span>

      <!-- Headline -->
      <h2 class="font-serif text-4xl md:text-6xl font-bold tracking-tight text-text-primary mb-8 max-w-2xl leading-tight">
        Step Inside the Constellation
      </h2>
      
      <p class="font-sans text-xs md:text-sm text-text-muted/80 max-w-md mb-12 leading-relaxed">
        Click the center coordinate of the glowing warp portal to authenticate your signature and join the Youth Networking Community chapter orbit.
      </p>

      <!-- The Giant Interactive Portal Gate -->
      <div 
        @click="initiateWarp"
        class="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-gold-primary/10 flex items-center justify-center cursor-pointer group shadow-[0_0_50px_rgba(150,29,43,0.05)] hover:border-gold-primary/30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="{ 'scale-[10] border-gold-primary/90 bg-gold-primary/15': isWarping }"
      >
        <!-- Swirling orbital lines SVG -->
        <svg 
          class="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
          :class="isWarping ? 'animate-[spin_0.5s_linear_infinite]' : 'animate-[spin_20s_linear_infinite]'"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(217,178,122,0.12)" stroke-width="1" stroke-dasharray="5 15" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(150,29,43,0.15)" stroke-width="1.5" stroke-dasharray="10 30" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(217,178,122,0.2)" stroke-width="0.8" stroke-dasharray="2 6" />
        </svg>

        <!-- Pulsing core sun of the portal -->
        <div 
          class="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-wine-red via-[#8A5E3B] to-gold-primary flex flex-col items-center justify-center shadow-[0_0_35px_#5C1E28] transition-all duration-700 z-20 group-hover:shadow-[0_0_55px_#D9B27A] group-hover:scale-105"
          :class="{ 'opacity-0 scale-50': isWarping }"
        >
          <span class="font-serif text-sm md:text-base font-bold text-space-black tracking-widest uppercase">ENTER</span>
          <span class="font-sans text-[7px] text-space-black/60 tracking-wider font-bold">PORTAL</span>
        </div>

        <!-- Interactive cursor hover ripple rings -->
        <div class="absolute w-[110%] h-[110%] rounded-full border border-gold-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100 pointer-events-none" />
        <div class="absolute w-[120%] h-[120%] rounded-full border border-wine-red/5 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100 pointer-events-none delay-100" />
      </div>

    </div>

    <!-- Viewport Portal Warp Screen overlay -->
    <div
      v-if="isWarping"
      class="fixed inset-0 z-[9999] bg-gradient-to-tr from-[#050505] via-[#12090B] to-[#1A0D0F] transition-all duration-1000 flex items-center justify-center animate-[warpFade_1s_ease-in-out_forwards]"
    >
      <div class="text-center font-serif text-lg tracking-[0.4em] text-gold-primary uppercase font-bold animate-pulse">
        Warping to Access Terminal...
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes warpFade {
  0% { opacity: 0; filter: blur(10px); }
  50% { opacity: 1; filter: blur(0); }
  100% { opacity: 1; }
}
</style>
