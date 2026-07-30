<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { Calendar as CalendarIcon, MapPin, X, Check, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useEventStore } from '@/stores/eventStore';
import { useAuthStore } from '@/stores/authStore';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const router = useRouter();
const eventStore = useEventStore();
const authStore = useAuthStore();

const activeIndex = ref(0);
const countdowns = ref<Record<number, TimeRemaining>>({});
let timerId: number | undefined;

// Modal Registration States
const isModalOpen = ref(false);
const selectedEventId = ref<number | null>(null);
const registrantName = ref('');
const registrantEmail = ref('');
const registrantRole = ref('Builder');
const formError = ref('');
const successRegister = ref(false);

const isSubmitting = ref(false);
const successMessage = ref('');

const roles = ['Builder', 'Designer', 'Researcher', 'Founder', 'Investor'];

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

function openRegistration(eventId: number) {
  if (!authStore.isAuthed) {
    router.push('/auth');
    return;
  }
  selectedEventId.value = eventId;
  registrantName.value = authStore.currentUser?.name || '';
  registrantEmail.value = authStore.currentUser?.email || '';
  registrantRole.value = 'Builder';
  formError.value = '';
  successRegister.value = false;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  isModalOpen.value = false;
  document.body.style.overflow = '';
}

async function handleRegister() {
  if (!registrantName.value.trim()) {
    formError.value = 'Name is required.';
    return;
  }
  if (!registrantEmail.value.trim() || !registrantEmail.value.includes('@')) {
    formError.value = 'A valid email address is required.';
    return;
  }
  if (selectedEventId.value === null) return;

  const activeEvent = eventStore.events.find(e => e.id === selectedEventId.value);
  if (!activeEvent) return;

  formError.value = '';
  isSubmitting.value = true;

  const success = await authStore.applyForEventPass(
    selectedEventId.value,
    activeEvent.title,
    registrantRole.value
  );

  isSubmitting.value = false;

  if (success) {
    successMessage.value = 'Your celestial boarding pass has been secured! Check your dashboard credentials.';
    successRegister.value = true;
    setTimeout(() => {
      closeModal();
    }, 2200);
  }
}

onMounted(() => {
  updateCountdowns();
  timerId = window.setInterval(updateCountdowns, 1000);
});

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId);
});

function formatEventDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
    class="relative min-h-screen py-24 md:py-32 px-6 bg-sec-bg flex flex-col justify-center select-none"
  >
    <!-- Background Sparkles overlay -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1"
        :max-size="3.5"
        :speed="1.8"
        :particle-density="45"
      />
    </div>

    <!-- Active Spotlight glow behind slides -->
    <div class="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#050505_100%] opacity-90" />
    <div class="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
    <div class="absolute bottom-[25%] right-[5%] w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

    <div class="max-w-7xl mx-auto w-full relative z-10">
      
      <!-- Section Header -->
      <div class="text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
            Executive Assemblies
          </span>
          <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
            Flagship Keynotes
          </h2>
        </div>
        
        <!-- Slide selectors -->
        <div class="flex gap-4">
          <button
            @click="prevSlide"
            class="p-3.5 rounded-full border border-white/8 bg-white/2 hover:border-gold-primary/30 text-text-muted hover:text-gold-primary cursor-pointer transition-all duration-300 focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button
            @click="nextSlide"
            class="p-3.5 rounded-full border border-white/8 bg-white/2 hover:border-gold-primary/30 text-text-muted hover:text-gold-primary cursor-pointer transition-all duration-300 focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight class="w-4 h-4" />
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
              @click="openRegistration(eventStore.events[activeIndex].id)"
              class="w-full sm:w-auto text-xs tracking-widest"
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

    <!-- Registration Modal Overlay -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-999 flex items-center justify-center px-6"
    >
      <!-- Backdrop -->
      <div @click="closeModal" class="absolute inset-0 bg-space-black/90 backdrop-blur-md" />

      <!-- Modal Card -->
      <div class="relative glass-panel rounded-[2.5rem] border border-white/8 w-full max-w-lg overflow-hidden p-8 md:p-10 shadow-2xl z-10 transition-all duration-500 animate-[modalScale_0.3s_ease-out]">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-6 right-6 p-2 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 text-text-muted hover:text-text-primary focus:outline-none transition-colors"
        >
          <X class="w-4 h-4" />
        </button>

        <div v-if="!successRegister">
          <span class="font-sans text-[9px] tracking-[0.3em] text-gold-primary uppercase font-bold block mb-2">
            Secure Boarding Pass
          </span>
          <h3 class="font-serif text-2xl md:text-3xl font-bold tracking-wide text-text-primary mb-6">
            Register Application
          </h3>

          <!-- Form -->
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div>
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Full Name</label>
              <input
                v-model="registrantName"
                type="text"
                placeholder="e.g., Alexander Vance"
                class="w-full bg-space-black/50 border border-white/8 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-colors shadow-inner"
              />
            </div>

            <div>
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Email Address</label>
              <input
                v-model="registrantEmail"
                type="email"
                placeholder="e.g., alex@cosmos.io"
                class="w-full bg-space-black/50 border border-white/8 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-colors shadow-inner"
              />
            </div>

            <div>
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Ecosystem Role</label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="role in roles"
                  :key="role"
                  type="button"
                  @click="registrantRole = role"
                  class="py-2.5 rounded-lg border text-center text-xs font-sans tracking-wide transition-all duration-300 focus:outline-none"
                  :class="registrantRole === role
                    ? 'border-gold-primary bg-gold-primary/10 text-gold-primary shadow-[0_0_10px_rgba(217,178,122,0.15)]'
                    : 'border-white/5 bg-white/2 text-text-muted hover:border-white/10 hover:text-text-primary'"
                >
                  {{ role }}
                </button>
              </div>
            </div>

            <!-- Error message -->
            <p v-if="formError" class="text-xs text-wine-red tracking-wide font-sans">
              {{ formError }}
            </p>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-4 rounded-xl bg-gradient-to-r from-gold-bronze to-gold-primary text-space-black font-semibold tracking-widest text-xs shadow-[0_4px_15px_rgba(217,178,122,0.25)] hover:shadow-[0_4px_25px_rgba(217,178,122,0.45)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
            >
              {{ isSubmitting ? 'VERIFYING CREDENTIALS...' : 'SUBMIT REGISTRATION' }}
            </button>
          </form>
        </div>

        <!-- Success Animation Overlay -->
        <div v-else class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 rounded-full border border-gold-primary flex items-center justify-center bg-gold-primary/10 text-gold-primary mb-6 shadow-[0_0_20px_rgba(217,178,122,0.3)] animate-pulse">
            <Check class="w-8 h-8" />
          </div>
          <h4 class="font-serif text-2xl font-bold tracking-wide text-gold-primary mb-3">Pass Allocated</h4>
          <p class="font-sans text-xs md:text-sm text-text-muted leading-relaxed max-w-sm">
            {{ successMessage }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes modalScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
