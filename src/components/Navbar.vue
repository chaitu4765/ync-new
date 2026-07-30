<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  Home,
  Compass,
  Milestone,
  Cpu,
  Calendar,
  Sparkles as SparklesIcon,
  Image as ImageIcon,
  MessageSquare,
  User,
  ShieldAlert
} from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isScrolled = ref(false);
const hoveredIndex = ref<number | null>(null);

const dockItems = [
  { label: 'Home', icon: Home, href: '#hero' },
  { label: 'HQ Center', icon: Compass, href: '#about' },
  { label: 'Orbit', icon: Milestone, href: '#journey' },
  { label: 'Offerings', icon: Cpu, href: '#features' },
  { label: 'Galas', icon: Calendar, href: '#events' },
  { label: 'Stats Orbit', icon: SparklesIcon, href: '#stats' },
  { label: 'Benefits', icon: SparklesIcon, href: '#benefits' },
  { label: 'Polaroids', icon: ImageIcon, href: '#gallery' },
  { label: 'Holograms', icon: MessageSquare, href: '#testimonials' },
];

function handleScroll() {
  isScrolled.value = window.scrollY > 80;
}

function handleItemClick(item: typeof dockItems[0]) {
  if (route.path !== '/') {
    // If not on home page, navigate to home with hash
    router.push({ path: '/', hash: item.href });
  } else {
    // Scroll directly
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function navigateToDashboard() {
  if (authStore.isAuthed) {
    router.push('/dashboard');
  } else {
    router.push('/auth');
  }
}

function navigateToAdmin() {
  router.push('/admin');
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Proximity scales for signature macOS dock animation
function getProximityStyle(index: number) {
  if (hoveredIndex.value === null) return {};
  const diff = Math.abs(hoveredIndex.value - index);
  if (diff === 0) {
    return { transform: 'scale(1.4) translateY(-10px)', zIndex: 30 };
  } else if (diff === 1) {
    return { transform: 'scale(1.2) translateY(-4px)', zIndex: 20 };
  }
  return {};
}
</script>

<template>
  <!-- macOS inspired bottom center glass dock -->
  <div
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
    :class="[
      isScrolled 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-90 md:opacity-100 translate-y-0 scale-95'
    ]"
  >
    <div
      class="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 rounded-full border bg-space-black/45 border-white/8 backdrop-blur-xl shadow-[0_24px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(217,178,122,0.06)]"
      :class="{ 'border-gold-primary/20 shadow-[0_24px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(150,29,43,0.15)]': isScrolled }"
    >
      <!-- Navigation Anchor Icons loop -->
      <div
        v-for="(item, idx) in dockItems"
        :key="item.label"
        @click="handleItemClick(item)"
        @mouseenter="hoveredIndex = idx"
        @mouseleave="hoveredIndex = null"
        class="relative p-2 rounded-full cursor-pointer text-text-muted hover:text-gold-primary transition-all duration-300 origin-bottom"
        :style="getProximityStyle(idx)"
      >
        <!-- Floating Label Tooltip (macOS style) -->
        <div
          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 rounded-lg bg-space-black/95 border border-gold-primary/20 text-[9px] tracking-widest text-gold-primary uppercase font-sans font-bold whitespace-nowrap shadow-xl opacity-0 scale-90 pointer-events-none transition-all duration-200"
          :class="{ 'opacity-100 scale-100': hoveredIndex === idx }"
        >
          {{ item.label }}
          <!-- Small arrow under tooltip -->
          <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-space-black/95" />
        </div>

        <component :is="item.icon" class="w-5 h-5 shrink-0" />
      </div>

      <!-- Vertical Dock Separator Line -->
      <div class="w-[1px] h-6 bg-white/10 mx-1" />

      <!-- User Mission Control Terminal Icon -->
      <div
        @click="navigateToDashboard"
        @mouseenter="hoveredIndex = dockItems.length"
        @mouseleave="hoveredIndex = null"
        class="relative p-2 rounded-full cursor-pointer text-text-muted hover:text-gold-primary transition-all duration-300 origin-bottom"
        :style="getProximityStyle(dockItems.length)"
      >
        <div
          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 rounded-lg bg-space-black/95 border border-gold-primary/20 text-[9px] tracking-widest text-gold-primary uppercase font-sans font-bold whitespace-nowrap shadow-xl opacity-0 scale-90 pointer-events-none transition-all duration-200"
          :class="{ 'opacity-100 scale-100': hoveredIndex === dockItems.length }"
        >
          {{ authStore.isAuthed ? 'Mission Control' : 'Access Terminal' }}
          <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-space-black/95" />
        </div>
        <User class="w-5 h-5" :class="{ 'text-gold-primary filter drop-shadow-[0_0_5px_#D9B27A]': authStore.isAuthed }" />
      </div>

      <!-- Admin Hangar Panel Icon (Visible only if admin is logged in) -->
      <div
        v-if="authStore.isAdmin"
        @click="navigateToAdmin"
        @mouseenter="hoveredIndex = dockItems.length + 1"
        @mouseleave="hoveredIndex = null"
        class="relative p-2 rounded-full cursor-pointer text-text-muted hover:text-wine-red transition-all duration-300 origin-bottom"
        :style="getProximityStyle(dockItems.length + 1)"
      >
        <div
          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 rounded-lg bg-space-black/95 border border-wine-red/20 text-[9px] tracking-widest text-wine-red uppercase font-sans font-bold whitespace-nowrap shadow-xl opacity-0 scale-90 pointer-events-none transition-all duration-200"
          :class="{ 'opacity-100 scale-100': hoveredIndex === (dockItems.length + 1) }"
        >
          Admin Hangar
          <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-space-black/95" />
        </div>
        <ShieldAlert class="w-5 h-5 text-wine-red filter drop-shadow-[0_0_5px_#7A2435]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth Dock Transition */
.origin-bottom {
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), color 0.2s ease;
}
</style>
