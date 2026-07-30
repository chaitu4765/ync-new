<script setup lang="ts">
import { ref } from 'vue';
import { Quote } from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

interface HologramItem {
  id: number;
  name: string;
  role: string;
  chapter: string;
  quote: string;
  detailedText: string;
  avatar: string;
  positionClass: string; // Absolute placement
  driftClass: string; // CSS keyframe float
}

const activeIndex = ref<number | null>(null);

const testList = ref<HologramItem[]>([
  {
    id: 0,
    name: 'Aurelia Vance',
    role: 'Founder',
    chapter: 'Stanford Chapter',
    quote: 'YNC has completely redefined student incubation protocols.',
    detailedText: 'Connecting with senior engineers and venture developers at the private London summit mixer allowed my crew to raise a $50K seed grant in under three weeks.',
    avatar: 'AV',
    positionClass: 'left-[10%] top-[12%] w-[280px] md:w-[320px]',
    driftClass: 'animate-[drift1_12s_ease-in-out_infinite]'
  },
  {
    id: 1,
    name: 'Kaelen Sterling',
    role: 'AI Researcher',
    chapter: 'MIT Chapter',
    quote: 'The hackathons are unlike any typical college assemblies.',
    detailedText: 'The HackCosmos sandbox was pure engineering focus. No fluff, no low-tier sponsor presentations—just raw compute, elite peer feedback, and high cash grants.',
    avatar: 'KS',
    positionClass: 'left-[46%] top-[30%] w-[280px] md:w-[320px]',
    driftClass: 'animate-[drift2_14s_ease-in-out_infinite]'
  },
  {
    id: 2,
    name: 'Seraphina Thorne',
    role: 'Venture Intern',
    chapter: 'Imperial Chapter',
    quote: 'Landing direct partner links transformed my project outlook.',
    detailedText: 'I secured strategic advisor backing for my decentralization project by showing my digital credentials card to a VC partner at the Celestial Mixer.',
    avatar: 'ST',
    positionClass: 'right-[8%] top-[18%] w-[280px] md:w-[320px]',
    driftClass: 'animate-[drift3_13s_ease-in-out_infinite]'
  }
]);
</script>

<template>
  <section
    id="testimonials"
    class="relative py-24 md:py-32 px-6 bg-space-black overflow-hidden select-none"
  >
    <!-- Background sparkles overlay -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1"
        :max-size="3"
        :speed="1.5"
        :particle-density="40"
      />
    </div>

    <!-- Cosmic Glow -->
    <div class="absolute top-[20%] right-[-15%] w-[600px] h-[600px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Ecosystem Testimonials
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Holographic Messages
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          Hover any floating transmission container to pause the orbit and project the complete transmission payload.
        </p>
      </div>

      <!-- Drift Box viewport -->
      <!-- Absolute coordinates on desktop, grid on mobile -->
      <div class="relative w-full h-[520px] hidden lg:block rounded-[3rem] border border-white/5 bg-space-black/35 overflow-hidden">
        
        <!-- Star grid guide background -->
        <div class="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div
          v-for="item in testList"
          :key="item.id"
          class="absolute p-6 glass-card border border-white/8 rounded-[2rem] shadow-2xl transition-all duration-500 hover:scale-105 hover:z-30 hover:border-gold-primary/40 hover:shadow-[0_0_20px_rgba(217,178,122,0.15)] cursor-pointer group"
          :class="[item.positionClass, item.driftClass]"
          @mouseenter="activeIndex = item.id"
          @mouseleave="activeIndex = null"
        >
          <!-- Quote Icon -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <!-- Avatar -->
              <div class="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center bg-sec-bg text-[10px] font-sans font-bold text-gold-primary select-none group-hover:border-gold-primary/60 transition-colors">
                {{ item.avatar }}
              </div>
              <div class="text-left font-sans">
                <span class="block text-xs font-semibold text-text-primary">{{ item.name }}</span>
                <span class="block text-[8px] tracking-widest text-text-muted/60 uppercase">{{ item.chapter }}</span>
              </div>
            </div>
            <Quote class="w-4 h-4 text-gold-primary/40" />
          </div>

          <!-- Main Quote -->
          <p class="font-serif text-sm font-bold text-gold-soft leading-snug mb-3 text-left">
            "{{ item.quote }}"
          </p>

          <!-- Hidden body text, fades/reveals on hover -->
          <div
            class="overflow-hidden transition-all duration-500 text-left"
            :style="{
              maxHeight: activeIndex === item.id ? '120px' : '0px',
              opacity: activeIndex === item.id ? 1 : 0
            }"
          >
            <p class="font-sans text-[11px] text-text-muted/80 leading-relaxed mt-2 pt-2 border-t border-white/5">
              {{ item.detailedText }}
            </p>
          </div>
        </div>

      </div>

      <!-- Responsive Mobile view -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
        <div
          v-for="item in testList"
          :key="item.id + '-mobile'"
          class="p-6 glass-card border border-white/8 rounded-2xl shadow-lg"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center bg-sec-bg text-[10px] font-sans font-bold text-gold-primary">
                {{ item.avatar }}
              </div>
              <div class="text-left">
                <span class="block text-xs font-semibold text-text-primary">{{ item.name }}</span>
                <span class="block text-[8px] tracking-widest text-text-muted/60 uppercase">{{ item.chapter }}</span>
              </div>
            </div>
            <Quote class="w-4 h-4 text-gold-primary/40" />
          </div>

          <p class="font-serif text-sm font-bold text-gold-soft leading-snug mb-3 text-left">
            "{{ item.quote }}"
          </p>
          <p class="font-sans text-[11px] text-text-muted/80 leading-relaxed text-left border-t border-white/5 pt-2">
            {{ item.detailedText }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Keyframes for drift floating */
@keyframes drift1 {
  0% { transform: translate(0, 0); }
  50% { transform: translate(15px, -20px); }
  100% { transform: translate(0, 0); }
}

@keyframes drift2 {
  0% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 15px); }
  100% { transform: translate(0, 0); }
}

@keyframes drift3 {
  0% { transform: translate(0, 0); }
  50% { transform: translate(20px, 20px); }
  100% { transform: translate(0, 0); }
}

/* Pause drift keyframe when hovered */
.glass-card:hover {
  animation-play-state: paused !important;
}
</style>
