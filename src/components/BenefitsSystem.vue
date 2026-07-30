<script setup lang="ts">
import { ref } from 'vue';
import { Award, Zap, Library, Users, ShieldAlert, Compass } from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

interface BenefitPlanet {
  id: number;
  title: string;
  codename: string;
  description: string;
  points: string[];
  icon: any;
  positionClass: string;
}

const activeIndex = ref(0);

const benefits = ref<BenefitPlanet[]>([
  {
    id: 0,
    title: 'Masterclass Learning',
    codename: 'VAL-LEARN',
    description: 'Deep-dive technology, business strategy, and product design workshops directed by startup veterans.',
    points: ['Access to selective cohort guilds', 'Intensive live-build case studies', 'Direct code reviews from mentors'],
    icon: Library,
    positionClass: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
  },
  {
    id: 1,
    title: 'High-Tier Mixer Networking',
    codename: 'VAL-CONNECT',
    description: 'Exclusive access to our luxury space-themed networking mixers, gala summits, and VC dinners.',
    points: ['Direct links to top-tier founders', 'Venture capital pitch introductions', 'Selective alumni mixer circles'],
    icon: Users,
    positionClass: 'right-0 top-1/3 translate-x-1/2 -translate-y-1/2'
  },
  {
    id: 2,
    title: 'Executive Mentorship',
    codename: 'VAL-MENTOR',
    description: '1-on-1 advisor sessions with startup engineers, venture partners, and product leaders.',
    points: ['Strategic advice for pitch decks', 'Technical stack consultations', 'Career path mapping sessions'],
    icon: Compass,
    positionClass: 'right-0 bottom-1/3 translate-x-1/2 translate-y-1/2'
  },
  {
    id: 3,
    title: 'Smart Credentials',
    codename: 'VAL-VERIFY',
    description: 'Verified digital proof of leadership roles, event attendance, and program credentials.',
    points: ['Secure credentials wallet cards', 'Shareable LinkedIn accreditation badges', 'Verifiable portfolio proofs'],
    icon: ShieldAlert,
    positionClass: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
  },
  {
    id: 4,
    title: 'Developer Venture Grants',
    codename: 'VAL-GRANTS',
    description: 'Direct cash equity-free grants to fund prototypes, host chapter mixers, or scale opensource builds.',
    points: ['Cohort build pools up to $5,000', 'Cloud hosting & API sponsor keys', 'Incubator resource credits'],
    icon: Zap,
    positionClass: 'left-0 bottom-1/3 -translate-x-1/2 translate-y-1/2'
  },
  {
    id: 5,
    title: 'Ecosystem Lounges',
    codename: 'VAL-LOUNGE',
    description: 'Access to selective digital lounges, workspace wikis, templates, and active libraries.',
    points: ['24/7 technical advice channels', 'Incubator resources and template decks', 'Private developer wikis and repos'],
    icon: Award,
    positionClass: 'left-0 top-1/3 -translate-x-1/2 -translate-y-1/2'
  }
]);
</script>

<template>
  <section
    id="benefits"
    class="relative py-24 md:py-32 px-6 bg-[#12090B] overflow-hidden"
  >
    <!-- Background sparkles overlay -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1"
        :max-size="3.2"
        :speed="1.4"
        :particle-density="40"
      />
    </div>

    <!-- Cosmic Glow spotlight -->
    <div class="absolute top-[30%] right-[-15%] w-[600px] h-[600px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-[30%] left-[-15%] w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-24">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Ecosystem Valuations
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Benefits Orbit System
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          Hover or click on the orbiting value planets mapping our concentric community solar system.
        </p>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <!-- Left: Interactive Solar System Graphic -->
        <div class="lg:col-span-6 flex items-center justify-center">
          <div class="relative w-80 h-80 md:w-[400px] md:h-[400px] flex items-center justify-center">
            <!-- Central Sun core -->
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gold-primary/10 bg-[#1A0D0F] shadow-[0_0_25px_rgba(122,36,53,0.25)] flex flex-col items-center justify-center z-20">
              <span class="font-serif text-lg font-bold text-gold-primary">VALUE</span>
              <span class="font-sans text-[7px] tracking-widest text-text-muted/60 uppercase">CORE</span>
            </div>

            <!-- Concentric orbit path ring -->
            <div class="absolute inset-0 rounded-full border border-white/5 animate-[spin_80s_linear_infinite] z-10">
              <!-- Benefit planets looping -->
              <div
                v-for="benefit in benefits"
                :key="benefit.id"
                @mouseenter="activeIndex = benefit.id"
                class="absolute w-12 h-12 rounded-full border bg-space-black flex items-center justify-center cursor-pointer transition-all duration-300 z-30"
                :class="[
                  activeIndex === benefit.id
                    ? 'border-gold-primary shadow-[0_0_15px_#D9B27A] scale-110'
                    : 'border-white/10 hover:border-white/20',
                  benefit.positionClass
                ]"
              >
                <component
                  :is="benefit.icon"
                  class="w-4 h-4"
                  :class="activeIndex === benefit.id ? 'text-gold-primary' : 'text-text-muted'"
                />
              </div>
            </div>
            
            <!-- Secondary background orbit guides -->
            <div class="absolute w-[80%] h-[80%] rounded-full border border-white/2 pointer-events-none" />
            <div class="absolute w-[60%] h-[60%] rounded-full border border-white/2 pointer-events-none" />
          </div>
        </div>

        <!-- Right: Glass Information Deck -->
        <div class="lg:col-span-6 relative">
          <!-- Glass card -->
          <div class="glass-card rounded-[2.5rem] border border-white/5 bg-space-black/50 p-8 md:p-12 overflow-hidden min-h-[380px] flex flex-col justify-between transition-all duration-500">
            <div>
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-2xl bg-white/3 border border-gold-primary/20 flex items-center justify-center text-gold-primary shrink-0 shadow-lg">
                  <component :is="benefits[activeIndex].icon" class="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span class="block font-sans text-[8px] tracking-[0.25em] text-wine-red font-bold uppercase">
                    METRIC CODE: {{ benefits[activeIndex].codename }}
                  </span>
                  <h3 class="font-serif text-2xl font-bold text-text-primary tracking-wide">
                    {{ benefits[activeIndex].title }}
                  </h3>
                </div>
              </div>

              <!-- Description -->
              <p class="font-sans text-xs md:text-sm text-text-muted/80 leading-relaxed mb-6">
                {{ benefits[activeIndex].description }}
              </p>

              <!-- Bullet Points -->
              <ul class="space-y-3 font-sans text-xs text-text-muted">
                <li
                  v-for="point in benefits[activeIndex].points"
                  :key="point"
                  class="flex items-center gap-3 text-left"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-gold-primary shadow-sm" />
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>

            <!-- Dot list Year navigator -->
            <div class="flex gap-3 justify-start items-center mt-8 border-t border-white/5 pt-6">
              <button
                v-for="ben in benefits"
                :key="ben.id"
                @click="activeIndex = ben.id"
                class="w-8 h-8 rounded-full border text-xs font-serif font-bold flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
                :class="activeIndex === ben.id
                  ? 'border-gold-primary bg-gold-primary/10 text-gold-primary'
                  : 'border-white/5 bg-transparent text-text-muted hover:border-white/10'"
              >
                0{{ ben.id + 1 }}
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
