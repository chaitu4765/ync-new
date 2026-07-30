<script setup lang="ts">
import { ref } from 'vue';
import {
  Compass,
  Crosshair,
  TrendingUp,
  Zap,
  Globe,
  Database,
  Cpu
} from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

type ModuleType = 'mission' | 'vision' | 'values' | 'goals' | 'impact';

const activeModule = ref<ModuleType>('mission');

const modules = [
  { id: 'mission', label: 'Core Mission', icon: Compass },
  { id: 'vision', label: 'Core Vision', icon: Crosshair },
  { id: 'values', label: 'Operational Values', icon: Zap },
  { id: 'goals', label: 'Target Goals', icon: TrendingUp },
  { id: 'impact', label: 'Global Impact', icon: Globe }
];
</script>

<template>
  <section
    id="about"
    class="relative py-24 md:py-32 px-6 bg-sec-bg"
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
    <div class="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[130px] pointer-events-none" />
    <div class="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-wine-red/5 rounded-full blur-[130px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Ecosystem Blueprint
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Command Center
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          Authenticate core operational protocols and directives of the Youth Networking Community.
        </p>
      </div>

      <!-- Main Command Dashboard Console -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Left Column: Command Console Modules Selector -->
        <div class="lg:col-span-4 flex flex-col gap-3 justify-center">
          <div class="font-sans text-[9px] tracking-widest text-gold-soft/50 font-bold uppercase mb-2 ml-4">
            Operational Protocols
          </div>
          
          <button
            v-for="mod in modules"
            :key="mod.id"
            @click="activeModule = mod.id as ModuleType"
            class="flex items-center gap-4 px-6 py-4 rounded-2xl border text-left font-sans text-xs tracking-wider font-semibold uppercase transition-all duration-300 focus:outline-none cursor-pointer"
            :class="activeModule === mod.id
              ? 'border-gold-primary/40 bg-gold-primary/10 text-gold-primary shadow-[0_0_15px_rgba(217,178,122,0.15)] translate-x-2'
              : 'border-white/5 bg-white/1 text-text-muted hover:border-white/10 hover:text-text-primary'"
          >
            <div class="w-8 h-8 rounded-xl bg-space-black/50 border border-white/5 flex items-center justify-center text-inherit shrink-0">
              <component :is="mod.icon" class="w-4 h-4" />
            </div>
            <span>{{ mod.label }}</span>
          </button>
        </div>

        <!-- Right Column: Interactive Console Screen -->
        <div class="lg:col-span-8 relative">
          <!-- Outer border glow -->
          <div class="absolute -inset-2 bg-gradient-to-tr from-wine-red/10 to-gold-primary/10 rounded-[2.5rem] blur-xl opacity-60" />

          <!-- Console Monitor -->
          <div class="relative glass-card rounded-[2.5rem] border border-white/8 bg-space-black/85 p-8 md:p-12 overflow-hidden flex flex-col justify-between h-full min-h-[420px]">
            
            <!-- Matrix Scanning Grid overlay -->
            <div class="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-primary/15 to-transparent animate-[scanline_4s_linear_infinite]" />

            <!-- Core Module Content (Mission) -->
            <div v-if="activeModule === 'mission'" class="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div class="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 class="font-serif text-2xl md:text-3xl font-semibold text-gold-soft">Protocol 01: Core Mission</h3>
                <span class="font-sans text-[8px] tracking-[0.3em] text-wine-red font-bold uppercase">STATUS: ACTIVE</span>
              </div>
              <p class="font-sans text-sm md:text-base text-text-muted leading-relaxed">
                YNC bridges raw potential and institutional resources. We build ecosystem gateways, providing direct access to venture capital, technical masterclasses, hackathons, and luxury creative spaces.
              </p>
              
              <!-- Console Widgets -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div class="p-4 rounded-2xl bg-white/2 border border-white/5 text-center">
                  <span class="block font-serif text-3xl font-bold text-gold-primary mb-1">300+</span>
                  <span class="block font-sans text-[9px] tracking-widest text-text-muted/60 uppercase">Selected Builders</span>
                </div>
                <div class="p-4 rounded-2xl bg-white/2 border border-white/5 text-center">
                  <span class="block font-serif text-3xl font-bold text-gold-primary mb-1">$20K+</span>
                  <span class="block font-sans text-[9px] tracking-widest text-text-muted/60 uppercase">Grants Awarded</span>
                </div>
                <div class="p-4 rounded-2xl bg-white/2 border border-white/5 text-center">
                  <span class="block font-serif text-3xl font-bold text-gold-primary mb-1">12+</span>
                  <span class="block font-sans text-[9px] tracking-widest text-text-muted/60 uppercase">Chapters Established</span>
                </div>
              </div>
            </div>

            <!-- Core Module Content (Vision) -->
            <div v-if="activeModule === 'vision'" class="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div class="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 class="font-serif text-2xl md:text-3xl font-semibold text-gold-soft">Protocol 02: Core Vision</h3>
                <span class="font-sans text-[8px] tracking-[0.3em] text-wine-red font-bold uppercase">STATUS: SECURE</span>
              </div>
              <p class="font-sans text-sm md:text-base text-text-muted leading-relaxed">
                Constructing a unified global digital launchpad for student builders. We project a future where cross-disciplinary teams launch venture-ready products directly from our chapter orbits.
              </p>
              
              <div class="p-5 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-between gap-6">
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary">
                    <Database class="w-4 h-4 animate-pulse" />
                  </div>
                  <div class="text-left font-sans">
                    <span class="block text-[10px] tracking-widest text-text-primary uppercase font-semibold">Decentralized Orbit</span>
                    <span class="block text-[9px] text-text-muted/70">SF, London, Bangalore, Tokyo chapters synchronized.</span>
                  </div>
                </div>
                <div class="text-xs text-gold-primary font-bold font-sans">100% ORBITAL</div>
              </div>
            </div>

            <!-- Core Module Content (Values) -->
            <div v-if="activeModule === 'values'" class="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div class="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 class="font-serif text-2xl md:text-3xl font-semibold text-gold-soft">Protocol 03: Operational Values</h3>
                <span class="font-sans text-[8px] tracking-[0.3em] text-wine-red font-bold uppercase">STATUS: VERIFIED</span>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="p-5 rounded-2xl bg-white/2 border border-white/5">
                  <h4 class="font-serif text-lg font-bold text-gold-primary mb-2">Innovation</h4>
                  <p class="font-sans text-[10px] text-text-muted/80 leading-relaxed">We ship code, design blueprints, and prototype models.</p>
                </div>
                <div class="p-5 rounded-2xl bg-white/2 border border-white/5">
                  <h4 class="font-serif text-lg font-bold text-gold-primary mb-2">Exclusivity</h4>
                  <p class="font-sans text-[10px] text-text-muted/80 leading-relaxed">We focus on high-fidelity networking for the top 1%.</p>
                </div>
                <div class="p-5 rounded-2xl bg-white/2 border border-white/5">
                  <h4 class="font-serif text-lg font-bold text-gold-primary mb-2">Fellowship</h4>
                  <p class="font-sans text-[10px] text-text-muted/80 leading-relaxed">We sustain peer alliances across chapters.</p>
                </div>
              </div>
            </div>

            <!-- Core Module Content (Goals) -->
            <div v-if="activeModule === 'goals'" class="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div class="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 class="font-serif text-2xl md:text-3xl font-semibold text-gold-soft">Protocol 04: Target Benchmarks</h3>
                <span class="font-sans text-[8px] tracking-[0.3em] text-wine-red font-bold uppercase">STATUS: SYNCED</span>
              </div>
              <p class="font-sans text-sm md:text-base text-text-muted leading-relaxed">
                Reviewing 2026–2027 technical and community milestones. Focus centers on scaling decentralized code repositories and venture funding avenues.
              </p>
              
              <!-- Progress Bars inside terminal -->
              <div class="space-y-4 font-sans text-[10px] tracking-wide text-text-muted uppercase">
                <div>
                  <div class="flex justify-between mb-1.5 font-semibold">
                    <span>Incubator Cohorts Seed Funding</span>
                    <span>70% COMPLETED</span>
                  </div>
                  <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div class="w-[70%] h-full bg-wine-red shadow-[0_0_8px_#7A2435]" />
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1.5 font-semibold">
                    <span>International Chapter Scaling</span>
                    <span>85% COMPLETED</span>
                  </div>
                  <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div class="w-[85%] h-full bg-gold-primary shadow-[0_0_8px_#D9B27A]" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Core Module Content (Impact) -->
            <div v-if="activeModule === 'impact'" class="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div class="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 class="font-serif text-2xl md:text-3xl font-semibold text-gold-soft">Protocol 05: Global Footprint</h3>
                <span class="font-sans text-[8px] tracking-[0.3em] text-wine-red font-bold uppercase">STATUS: STABLE</span>
              </div>
              <p class="font-sans text-sm md:text-base text-text-muted leading-relaxed font-normal">
                Tracing alumnus placements and incubated developer team footprints across technology chapters.
              </p>

              <div class="grid grid-cols-2 gap-4 text-left font-sans text-xs text-text-muted">
                <div class="p-3 bg-white/2 border border-white/5 rounded-xl flex items-center gap-3">
                  <div class="w-2.5 h-2.5 rounded-full bg-gold-primary shadow-sm" />
                  <span>Stanford Chapter Accelerator</span>
                </div>
                <div class="p-3 bg-white/2 border border-white/5 rounded-xl flex items-center gap-3">
                  <div class="w-2.5 h-2.5 rounded-full bg-wine-red shadow-sm" />
                  <span>London Fintech Mixer Cohorts</span>
                </div>
                <div class="p-3 bg-white/2 border border-white/5 rounded-xl flex items-center gap-3">
                  <div class="w-2.5 h-2.5 rounded-full bg-gold-primary shadow-sm" />
                  <span>MIT AI Agent Sandbox</span>
                </div>
                <div class="p-3 bg-white/2 border border-white/5 rounded-xl flex items-center gap-3">
                  <div class="w-2.5 h-2.5 rounded-full bg-wine-red shadow-sm" />
                  <span>Singapore Venture Summit</span>
                </div>
              </div>
            </div>

            <!-- Bottom Console Status Row -->
            <div class="border-t border-white/5 pt-6 mt-8 flex items-center justify-between text-[9px] tracking-widest font-sans text-gold-soft/50 uppercase font-bold">
              <span class="flex items-center gap-2">
                <Cpu class="w-3.5 h-3.5 animate-spin" />
                SYSTEM RUNTIME: SECURE
              </span>
              <span>YNC-OS v4.12</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scanline {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(420px); opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
