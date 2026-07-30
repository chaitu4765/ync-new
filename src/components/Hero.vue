<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

const router = useRouter();
const authStore = useAuthStore();

// Chip Hover Interaction State
const hoveredChip = ref<string | null>(null);

const chips = [
  { id: 'join', label: 'Join Orbit', href: '#join-portal' },
  { id: 'explore', label: 'Explore Universe', href: '#features' },
  { id: 'mission', label: 'Upcoming Mission', href: '#events' },
  { id: 'portal', label: 'Community Portal', href: '/dashboard' }
];

function handleChipClick(chip: typeof chips[0]) {
  if (chip.id === 'portal') {
    if (authStore.isAuthed) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  } else {
    const element = document.querySelector(chip.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Parallax Tracker Coordinates
const pContainer = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);

function handleMouseMove(e: MouseEvent) {
  if (!pContainer.value) return;
  const rect = pContainer.value.getBoundingClientRect();
  // Compute coordinates relative to container center (-0.5 to 0.5 range)
  mouseX.value = (e.clientX - rect.left) / rect.width - 0.5;
  mouseY.value = (e.clientY - rect.top) / rect.height - 0.5;
}

function handleMouseLeave() {
  mouseX.value = 0;
  mouseY.value = 0;
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 bg-space-black"
  >
    <!-- Dark Cosmic ambient glows -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none" />
      <div class="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
    </div>

    <!-- Asymmetric Magazine Layout Grid -->
    <div class="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <!-- Left Side Editorial Text -->
      <div class="lg:col-span-7 text-left flex flex-col items-start">
        <!-- Elite Banner Tag -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-wine-red/20 bg-[#12090B]/85 backdrop-blur-md mb-8 shadow-md">
          <span class="w-1.5 h-1.5 rounded-full bg-wine-red animate-pulse" />
          <span class="font-sans text-[9px] font-bold tracking-[0.25em] text-gold-soft uppercase select-none">
            Orbital Launchpad Chapter
          </span>
        </div>

        <!-- Serif Headlines -->
        <h1 class="font-serif text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] text-text-primary mb-8 select-none">
          <span class="block text-reveal">Empowering Youth.</span>
          <span class="block text-reveal" style="animation-delay: 0.25s">Building Leaders.</span>
          <span class="block text-gold-gradient text-reveal" style="animation-delay: 0.5s">
            Creating Opportunities.
          </span>
        </h1>

        <!-- Magazine Description paragraph -->
        <p 
          class="font-sans text-sm md:text-base text-text-muted/80 max-w-xl leading-relaxed tracking-wide mb-10 text-reveal"
          style="animation-delay: 0.75s"
        >
          YNC is a premier youth ecosystem curating advanced networking, hackathons, and cohort incubator programs. We connect raw ambition with high-tier mentors and institutional resources.
        </p>

        <!-- Floating Interactive Action Chips -->
        <div 
          class="flex flex-wrap gap-4 text-reveal"
          style="animation-delay: 1s"
        >
          <button
            v-for="chip in chips"
            :key="chip.id"
            @click="handleChipClick(chip)"
            @mouseenter="hoveredChip = chip.id"
            @mouseleave="hoveredChip = null"
            class="px-5 py-3 rounded-full border text-[10px] tracking-[0.2em] font-sans font-bold uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none cursor-pointer"
            :class="[
              hoveredChip === chip.id
                ? 'border-gold-primary bg-gold-primary/10 text-gold-primary shadow-[0_0_25px_rgba(217,178,122,0.25)] scale-105'
                : hoveredChip !== null
                  ? 'border-white/4 bg-white/1 opacity-30 scale-95'
                  : 'border-white/8 bg-white/2 text-text-muted hover:border-gold-primary/30 hover:text-text-primary'
            ]"
          >
            {{ chip.label }}
          </button>
        </div>
      </div>

      <!-- Right Side Live Interactive Cosmic Scene -->
      <div 
        ref="pContainer"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        class="lg:col-span-5 h-[350px] md:h-[450px] relative rounded-[3rem] border border-white/5 bg-space-black/45 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden cursor-crosshair group"
      >
        <!-- Overlay Sparkles inside container -->
        <div class="absolute inset-0 opacity-40">
          <Sparkles
            particle-color="#D9B27A"
            :min-size="0.8"
            :max-size="3"
            :speed="3.5"
            :particle-density="35"
          />
        </div>

        <!-- Parallax Solar Core (Gold Glowing Ring Sun) -->
        <div 
          class="relative w-44 h-44 rounded-full border border-gold-primary/10 flex items-center justify-center transition-all duration-300 ease-out"
          :style="{ transform: `translate(${mouseX * 25}px, ${mouseY * 25}px)` }"
        >
          <!-- Glowing center sun -->
          <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-gold-bronze to-gold-primary shadow-[0_0_40px_#D9B27A] flex items-center justify-center animate-pulse">
            <span class="font-serif text-sm font-bold text-space-black select-none">YNC</span>
          </div>

          <!-- Rotating golden orbits -->
          <svg class="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(217,178,122,0.15)" stroke-width="1.5" stroke-dasharray="10 30" />
          </svg>
        </div>

        <!-- Orbiting Planet 1: Burgundy Mars (Far background, moves less) -->
        <div
          class="absolute w-8 h-8 rounded-full bg-gradient-to-br from-wine-red to-burgundy-deep border border-wine-red/30 shadow-[0_0_15px_rgba(150,29,43,0.4)] transition-all duration-300 ease-out"
          :style="{
            left: '20%',
            top: '25%',
            transform: `translate(${mouseX * -30}px, ${mouseY * -30}px)`
          }"
        />

        <!-- Orbiting Planet 2: Rose Gold Venus (Mid depth) -->
        <div
          class="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-rose-gold via-[#8A5E3B] to-gold-champagne border border-gold-primary/20 shadow-[0_0_20px_rgba(217,178,122,0.2)] transition-all duration-300 ease-out animate-[spin_8s_linear_infinite]"
          :style="{
            right: '18%',
            bottom: '22%',
            transform: `translate(${mouseX * 40}px, ${mouseY * 40}px)`
          }"
        >
          <!-- Tiny moon orbiting -->
          <div class="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-gold-champagne shadow-md" />
        </div>

        <!-- Orbiting Planet 3: Golden Dwarf (Foreground, moves fast) -->
        <div
          class="absolute w-6 h-6 rounded-full bg-gradient-to-br from-gold-soft to-gold-primary shadow-[0_0_12px_rgba(217,178,122,0.3)] transition-all duration-300 ease-out"
          :style="{
            right: '25%',
            top: '20%',
            transform: `translate(${mouseX * 55}px, ${mouseY * 55}px)`
          }"
        />
        
        <!-- Interactive mouse cursor vector ring follower -->
        <div 
          class="absolute w-16 h-16 rounded-full border border-gold-primary/20 bg-gold-primary/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
          :style="{
            left: `${(mouseX + 0.5) * 100}%`,
            top: `${(mouseY + 0.5) * 100}%`,
            boxShadow: '0 0 10px rgba(217, 178, 122, 0.1)'
          }"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
.text-reveal {
  opacity: 0;
  filter: blur(12px);
  transform: translateY(20px);
  animation: reveal-hero 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes reveal-hero {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}
</style>
