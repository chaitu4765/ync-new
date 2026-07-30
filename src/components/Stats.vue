<script setup lang="ts">
import { ref } from 'vue';
import { Users, Calendar, Share2, Library } from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

interface StatPlanet {
  id: number;
  label: string;
  count: string;
  subtext: string;
  details: string;
  icon: any;
  color: string; // gradient classes
  positionClass: string; // coordinate offset
}

const activeIndex = ref(0);

const statsList = ref<StatPlanet[]>([
  {
    id: 0,
    label: 'Verified Members',
    count: '1,000+',
    subtext: 'Global builder nodes',
    details: 'Our decentralized directory spans elite developers, software designers, AI researchers, and startup founders across major chapters.',
    icon: Users,
    color: 'from-gold-primary to-gold-bronze',
    positionClass: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
  },
  {
    id: 1,
    label: 'Curation Galas',
    count: '50+',
    subtext: 'High-profile summits',
    details: 'Formal mixers, private VC networking dinners, and luxury ballroom assemblies scheduled across global tech hubs.',
    icon: Calendar,
    color: 'from-gold-bronze to-burgundy-deep',
    positionClass: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2'
  },
  {
    id: 2,
    label: 'Ecosystem Partners',
    count: '100+',
    subtext: 'Sponsors & Incubators',
    details: 'Alliances with tech brands, university hubs, venture syndicates, and open source communities supporting developer grants.',
    icon: Share2,
    color: 'from-rose-gold to-gold-primary',
    positionClass: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
  },
  {
    id: 3,
    label: 'Advanced Cohorts',
    count: '25+',
    subtext: 'Masterclass series',
    details: 'Intensive code cohorts, design masterclasses, and entrepreneurial acceleration workshops directed by industry veterans.',
    icon: Library,
    color: 'from-[#5C1E28] to-gold-bronze',
    positionClass: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
  }
]);
</script>

<template>
  <section
    id="stats"
    class="relative py-24 md:py-32 px-6 bg-space-black overflow-hidden"
  >
    <!-- Background particles -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1"
        :max-size="3"
        :speed="2"
        :particle-density="40"
      />
    </div>

    <!-- Cosmic Glow -->
    <div class="absolute top-[20%] right-[-15%] w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-24">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Telemetry Indices
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Orbital Metrics
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          Inspect our operational statistics by selecting a metric planet revolving in the YNC telemetry orbit.
        </p>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <!-- Left Column: Orbit Circle Selector -->
        <div class="lg:col-span-6 flex items-center justify-center">
          <div class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            
            <!-- Central core orbit system -->
            <div class="w-20 h-20 md:w-24 md:h-24 rounded-full border border-gold-primary/20 bg-sec-bg shadow-[0_0_15px_rgba(217,178,122,0.1)] flex items-center justify-center z-20">
              <span class="font-serif text-sm font-bold text-gold-soft">TELEMETRY</span>
            </div>

            <!-- Orbit line -->
            <div class="absolute inset-0 rounded-full border border-white/5 animate-[spin_60s_linear_infinite] z-10">
              <!-- Planet Nodes looping -->
              <div
                v-for="planet in statsList"
                :key="planet.id"
                @mouseenter="activeIndex = planet.id"
                class="absolute w-12 h-12 rounded-full border bg-space-black flex items-center justify-center cursor-pointer transition-all duration-300 z-30"
                :class="[
                  activeIndex === planet.id 
                    ? 'border-gold-primary shadow-[0_0_15px_#D9B27A] scale-110' 
                    : 'border-white/10 hover:border-white/20',
                  planet.positionClass
                ]"
              >
                <!-- Icon -->
                <component 
                  :is="planet.icon" 
                  class="w-4 h-4 transition-colors"
                  :class="activeIndex === planet.id ? 'text-gold-primary' : 'text-text-muted'"
                />
              </div>
            </div>
            
          </div>
        </div>

        <!-- Right Column: Live Data Telemetry Board -->
        <div class="lg:col-span-6 relative">
          <!-- Ambient card glow -->
          <div class="absolute -inset-2 bg-gradient-to-tr from-gold-primary/5 to-wine-red/5 rounded-[2.5rem] blur-xl opacity-60" />

          <!-- Console details -->
          <div class="relative glass-card rounded-[2.5rem] border border-white/5 bg-space-black/50 p-8 md:p-12 overflow-hidden min-h-[340px] flex flex-col justify-between">
            <div class="space-y-6">
              <div class="flex items-center justify-between border-b border-white/5 pb-4">
                <span class="font-sans text-[8px] tracking-[0.25em] text-wine-red font-bold uppercase">
                  METRICS FEED: LIVE
                </span>
                <span class="font-sans text-[9px] tracking-widest text-text-muted/50 font-semibold uppercase">
                  INDEX 0{{ activeIndex + 1 }}
                </span>
              </div>

              <!-- Huge metric number -->
              <div class="font-serif text-5xl md:text-6xl font-bold tracking-tight text-gold-gradient select-none">
                {{ statsList[activeIndex].count }}
              </div>

              <!-- Title -->
              <h3 class="font-serif text-xl font-bold text-text-primary tracking-wide">
                {{ statsList[activeIndex].label }}
              </h3>

              <!-- Description -->
              <p class="font-sans text-xs md:text-sm text-text-muted/80 leading-relaxed">
                {{ statsList[activeIndex].details }}
              </p>
            </div>

            <!-- Tiny bottom status -->
            <div class="mt-8 font-sans text-[9px] tracking-widest text-gold-soft/50 uppercase font-bold text-left border-t border-white/5 pt-4">
              {{ statsList[activeIndex].subtext }}
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
