<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Calendar as CalendarIcon, MapPin, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useEventStore } from '@/stores/eventStore';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

interface TimeRemaining {
  id?: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const eventStore = useEventStore();
const activeIndex = ref(0);
const countdowns = ref<Record<number, TimeRemaining>>({});
let timerId: number | undefined;

function updateCountdowns() {
  eventStore.events.forEach((event) => {
    const target = new Date(event.date).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      countdowns.value[event.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      countdowns.value[event.id] = { days, hours, minutes, seconds };
    }
  });
}

function openGoogleForm() {
  window.open('https://forms.gle/2JfCxTawPJachhL47', '_blank', 'noopener,noreferrer');
}

onMounted(() => {
  updateCountdowns();
  timerId = window.setInterval(updateCountdowns, 1000);
});

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId);
});

function formatEventDate(dateStr: string) {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', options);
}

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % eventStore.events.length;
}

function prevSlide() {
  activeIndex.value = (activeIndex.value - 1 + eventStore.events.length) % eventStore.events.length;
}
</script>

<template>
  <section
    id="events"
    class="relative py-24 md:py-32 px-6 bg-sec-bg overflow-hidden select-none"
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

    <!-- Cosmic ambient glow lights -->
    <div class="absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="text-left">
          <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
            Upcoming Assemblies
          </span>
          <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Flagship Keynotes
          </h2>
        </div>

        <!-- Slider Arrow Controls -->
        <div v-if="eventStore.events.length > 1" class="flex gap-3 justify-start md:justify-end">
          <button
            @click="prevSlide"
            class="p-3 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 text-text-muted hover:text-text-primary focus:outline-none transition-all duration-300"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <button
            @click="nextSlide"
            class="p-3 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 text-text-muted hover:text-text-primary focus:outline-none transition-all duration-300"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Widescreen active slide layout -->
      <div 
        v-if="eventStore.events[activeIndex]"
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <!-- Left: Detail Event Info (Keynote details) -->
        <div class="lg:col-span-6 flex flex-col justify-between h-full order-2 lg:order-1 text-left">
          <div class="space-y-6">
            <!-- Event Type Badge -->
            <div class="flex items-center gap-3">
              <span class="px-3.5 py-1.5 rounded-full bg-wine-red/10 border border-wine-red/20 font-sans text-[9px] tracking-widest text-wine-red uppercase font-bold">
                {{ eventStore.events[activeIndex].type }}
              </span>
              <span class="font-sans text-[9px] tracking-widest text-gold-soft/80 uppercase font-semibold">
                {{ eventStore.events[activeIndex].subtitle }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="font-serif text-4xl md:text-5xl font-bold text-text-primary tracking-wide leading-tight">
              {{ eventStore.events[activeIndex].title }}
            </h3>

            <!-- Description -->
            <p class="font-sans text-xs md:text-sm text-text-muted/80 leading-relaxed max-w-xl">
              {{ eventStore.events[activeIndex].description }}
            </p>

            <!-- Meta metrics -->
            <div class="grid grid-cols-2 gap-4 border-y border-white/5 py-6 font-sans text-xs text-text-muted">
              <div class="flex items-center gap-3">
                <CalendarIcon class="w-4 h-4 text-gold-primary shrink-0" />
                <span>{{ formatEventDate(eventStore.events[activeIndex].date) }}</span>
              </div>
              <div class="flex items-center gap-3">
                <MapPin class="w-4 h-4 text-gold-primary shrink-0" />
                <span>{{ eventStore.events[activeIndex].venue }}</span>
              </div>
            </div>

            <!-- Countdown Timer Widgets -->
            <div class="flex gap-4 md:gap-6 justify-start items-center">
              <div 
                v-for="(value, unit) in countdowns[eventStore.events[activeIndex].id] || { days: 0, hours: 0, minutes: 0, seconds: 0 }" 
                :key="unit"
                class="flex flex-col items-start"
              >
                <span class="font-serif text-3xl md:text-4xl font-semibold text-gold-primary leading-none">
                  {{ String(value).padStart(2, '0') }}
                </span>
                <span class="font-sans text-[8px] tracking-widest text-text-muted/60 uppercase mt-1">
                  {{ unit }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <InteractiveHoverButton
              text="SECURE BOARDING PASS"
              @click="openGoogleForm"
              class="w-full sm:w-auto text-xs tracking-widest cursor-pointer"
            />
          </div>
        </div>

        <!-- Right: Widescreen Poster Glass Layer -->
        <div class="lg:col-span-6 order-1 lg:order-2 relative h-72 sm:h-96 lg:h-[450px] w-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-space-black/50 shadow-2xl flex items-center justify-center group">
          <!-- Glass filter overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent z-10" />
          <div class="absolute inset-0 bg-gold-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

          <!-- Image -->
          <img
            :src="eventStore.events[activeIndex].image"
            :alt="eventStore.events[activeIndex].title"
            class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-102"
          />
        </div>
      </div>

    </div>
  </section>
</template>
