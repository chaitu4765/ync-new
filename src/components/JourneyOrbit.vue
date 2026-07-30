<script setup lang="ts">
import { ref, computed } from 'vue';
import { Compass, Milestone, Award, CalendarCheck, ArrowRight } from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

interface MilestoneItem {
  year: string; // Renamed semantically to hold month/date phases
  angle: number; // degrees on the ring
  title: string;
  codename: string;
  description: string;
  details: string[];
  icon: any;
}

const activeIndex = ref(0);

const milestones = ref<MilestoneItem[]>([
  {
    year: 'Jul 07',
    angle: 0,
    title: 'The Conception',
    codename: 'GENESIS-LAUNCH',
    description: 'YNC ecosystem initialization in Visakhapatnam. Structuring initial networks, branding systems, and chapter frameworks.',
    details: ['SF core directive alignment', 'Drafting community covenants', 'Deploying stardust launch portals'],
    icon: Compass
  },
  {
    year: 'Jul 15',
    angle: -90,
    title: 'Cadet Enlistment',
    codename: 'SPARK-SQUAD',
    description: 'Opening register pools for select local student developers, bio-engineers, and designer nodes to populate our index.',
    details: ['Beta registry onboarding (100+ candidates)', 'Unlocking active Discord server arrays', 'Sizing Visakhapatnam directory nodes'],
    icon: Milestone
  },
  {
    year: 'Jul 24',
    angle: -180,
    title: 'Credentials Verification',
    codename: 'SYNERGY-NODE',
    description: 'Deploying credentials databases, Apple Wallet-style membership passes, and active stardust XP telemetry modules.',
    details: ['Smart Wallet passes system check', 'Simulated verification terminal live', 'XP stardust telemetry synchronized'],
    icon: Award
  },
  {
    year: 'Jul 31',
    angle: -270,
    title: 'Vizag Prom Night',
    codename: 'PROM-GALA',
    description: 'Our inaugural physical launch gala Mixer at Gram Coffee and Kitchen, Sagar Nagar. Uniting Visakhapatnam\'s tech elite.',
    details: ['Red carpet launch mixer (July 31st)', 'Direct local seed VC networking hours', 'Inaugurating local chapter director rules'],
    icon: CalendarCheck
  }
]);

// Angle calculations to rotate selected phase to the top (0 degrees)
const activeAngle = computed(() => {
  return -milestones.value[activeIndex.value].angle;
});
</script>

<template>
  <section
    id="journey"
    class="relative py-24 md:py-32 px-6 bg-space-black overflow-hidden"
  >
    <!-- Background sparkles overlay -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1"
        :max-size="3"
        :speed="1.2"
        :particle-density="40"
      />
    </div>

    <!-- Cosmic ambient glows -->
    <div class="absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-24">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Ecosystem Chronology
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Orbital Journey
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          Rotate the chronology orbit to inspect YNC development checkpoints, historical logs, and milestone indexes.
        </p>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <!-- Left Column: Circular Orbital Timeline Rotation System -->
        <div class="lg:col-span-6 flex items-center justify-center">
          <!-- Circular Ring container -->
          <div class="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            
            <!-- Central core node -->
            <div class="w-20 h-20 md:w-28 md:h-28 rounded-full border border-gold-primary/20 bg-sec-bg shadow-[0_0_20px_rgba(217,178,122,0.15)] flex flex-col items-center justify-center z-20">
              <span class="font-serif text-2xl md:text-3xl font-bold text-gold-primary">YNC</span>
              <span class="font-sans text-[7px] tracking-widest text-text-muted/60 uppercase">ORBIT</span>
            </div>

            <!-- Rotating Orbital Ring -->
            <div
              class="absolute inset-0 rounded-full border border-gold-primary/10 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
              :style="{ transform: `rotate(${activeAngle}deg)` }"
            >
              <!-- Planet Phase 1 (Angle 0) -->
              <div
                @click="activeIndex = 0"
                class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border bg-space-black flex items-center justify-center cursor-pointer transition-all duration-300 z-30"
                :class="activeIndex === 0 ? 'border-gold-primary shadow-[0_0_15px_#D9B27A]' : 'border-white/5 text-text-muted hover:border-white/20'"
                :style="{ transform: `rotate(${-activeAngle}deg)` }"
              >
                <span class="font-serif text-[10px] font-bold" :class="{ 'text-gold-primary': activeIndex === 0 }">{{ milestones[0].year }}</span>
              </div>

              <!-- Planet Phase 2 (Angle 90 / -270) -->
              <div
                @click="activeIndex = 1"
                class="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border bg-space-black flex items-center justify-center cursor-pointer transition-all duration-300 z-30"
                :class="activeIndex === 1 ? 'border-gold-primary shadow-[0_0_15px_#D9B27A]' : 'border-white/5 text-text-muted hover:border-white/20'"
                :style="{ transform: `rotate(${-activeAngle}deg)` }"
              >
                <span class="font-serif text-[10px] font-bold" :class="{ 'text-gold-primary': activeIndex === 1 }">{{ milestones[1].year }}</span>
              </div>

              <!-- Planet Phase 3 (Angle 180 / -180) -->
              <div
                @click="activeIndex = 2"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 rounded-full border bg-space-black flex items-center justify-center cursor-pointer transition-all duration-300 z-30"
                :class="activeIndex === 2 ? 'border-gold-primary shadow-[0_0_15px_#D9B27A]' : 'border-white/5 text-text-muted hover:border-white/20'"
                :style="{ transform: `rotate(${-activeAngle}deg)` }"
              >
                <span class="font-serif text-[10px] font-bold" :class="{ 'text-gold-primary': activeIndex === 2 }">{{ milestones[2].year }}</span>
              </div>

              <!-- Planet Phase 4 (Angle 270 / -90) -->
              <div
                @click="activeIndex = 3"
                class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border bg-space-black flex items-center justify-center cursor-pointer transition-all duration-300 z-30"
                :class="activeIndex === 3 ? 'border-gold-primary shadow-[0_0_15px_#D9B27A]' : 'border-white/5 text-text-muted hover:border-white/20'"
                :style="{ transform: `rotate(${-activeAngle}deg)` }"
              >
                <span class="font-serif text-[10px] font-bold" :class="{ 'text-gold-primary': activeIndex === 3 }">{{ milestones[3].year }}</span>
              </div>
            </div>
            
            <!-- Orbit Ring outline lines helper -->
            <svg class="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="0.5" stroke-dasharray="2 10" />
            </svg>
          </div>
        </div>

        <!-- Right Column: Detail Milestone Log Panel -->
        <div class="lg:col-span-6 relative">
          <!-- Glass card displaying details -->
          <div class="glass-card rounded-[2.5rem] border border-white/5 bg-space-black/45 p-8 md:p-12 overflow-hidden min-h-[380px] flex flex-col justify-between transition-all duration-500">
            <div>
              <div class="flex items-center gap-4 mb-6">
                <!-- Icon -->
                <div class="w-12 h-12 rounded-2xl bg-white/3 border border-gold-primary/20 flex items-center justify-center text-gold-primary">
                  <component :is="milestones[activeIndex].icon" class="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span class="block font-sans text-[8px] tracking-[0.25em] text-wine-red font-bold uppercase">
                    CODE: {{ milestones[activeIndex].codename }}
                  </span>
                  <h3 class="font-serif text-2xl font-bold text-text-primary tracking-wide">
                    {{ milestones[activeIndex].year }} &mdash; {{ milestones[activeIndex].title }}
                  </h3>
                </div>
              </div>

              <!-- Description -->
              <p class="font-sans text-xs md:text-sm text-text-muted leading-relaxed mb-6">
                {{ milestones[activeIndex].description }}
              </p>

              <!-- Bullet Points -->
              <ul class="space-y-3 font-sans text-xs text-text-muted">
                <li
                  v-for="detail in milestones[activeIndex].details"
                  :key="detail"
                  class="flex items-center gap-3 text-left"
                >
                  <ArrowRight class="w-3.5 h-3.5 text-gold-primary shrink-0" />
                  <span>{{ detail }}</span>
                </li>
              </ul>
            </div>

            <!-- Manual Year Selector Dots (Alternative Nav) -->
            <div class="flex gap-3 justify-start items-center mt-8 border-t border-white/5 pt-6">
              <button
                v-for="(mil, idx) in milestones"
                :key="mil.year"
                @click="activeIndex = idx"
                class="w-12 h-8 rounded-full border text-[9px] font-sans font-bold flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
                :class="activeIndex === idx
                  ? 'border-gold-primary bg-gold-primary/10 text-gold-primary'
                  : 'border-white/5 bg-transparent text-text-muted hover:border-white/10'"
              >
                {{ mil.year }}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.glass-card {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8);
}
</style>
