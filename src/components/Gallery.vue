<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { X, ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon } from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

interface PolaroidItem {
  id: number;
  title: string;
  category: string;
  image: string;
  styleClass: string; // Scattered absolute coordinate offsets
  rotate: number; // Default scatter angle
}

// Keep the album empty for now as requested
const items = ref<PolaroidItem[]>([]);

// Lightbox States
const isOpen = ref(false);
const activeIndex = ref(0);

function openLightbox(index: number) {
  activeIndex.value = index;
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  isOpen.value = false;
  document.body.style.overflow = '';
}

function prevImage() {
  activeIndex.value = (activeIndex.value - 1 + items.value.length) % items.value.length;
}

function nextImage() {
  activeIndex.value = (activeIndex.value + 1) % items.value.length;
}

function handleKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <section
    id="gallery"
    class="relative py-24 md:py-32 px-6 bg-sec-bg select-none"
  >
    <!-- Background Sparkles overlay -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1"
        :max-size="3"
        :speed="1.2"
        :particle-density="40"
      />
    </div>

    <!-- Ambient glow lights -->
    <div class="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Ecosystem Chronicles
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Atmospheric Gallery
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          Scattered logs of previous mixers and builds. Memories of YNC will appear here as they are archived.
        </p>
      </div>

      <!-- Scattered polaroid viewport wrapper -->
      <div 
        v-if="items.length > 0"
        class="relative w-full min-h-[600px] hidden md:block rounded-[3rem] border border-white/5 bg-space-black/35 overflow-hidden"
      >
        <!-- Background Grid Helper -->
        <div class="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div
          v-for="(item, idx) in items"
          :key="item.id"
          @click="openLightbox(idx)"
          class="absolute rounded-2xl p-3 pb-8 glass-card border border-white/8 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 hover:scale-110 hover:z-30 hover:border-gold-primary/30 shadow-2xl"
          :class="item.styleClass"
          :style="{ transform: `rotate(${item.rotate}deg)` }"
        >
          <!-- Image -->
          <div class="relative w-full h-[75%] rounded-lg overflow-hidden bg-space-black flex items-center justify-center">
            <!-- Zoom Icon on Hover -->
            <div class="absolute inset-0 bg-space-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-gold-primary transition-all duration-300 z-10">
              <ZoomIn class="w-5 h-5 animate-pulse" />
            </div>

            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Polaroid footer details -->
          <div class="text-left mt-3">
            <span class="block font-sans text-[7px] tracking-widest text-gold-primary uppercase font-bold">
              {{ item.category }}
            </span>
            <span class="block font-serif text-sm font-bold text-text-primary mt-0.5 truncate">
              {{ item.title }}
            </span>
          </div>
        </div>
      </div>

      <!-- Responsive Mobile Columns Grid -->
      <div v-else-if="items.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
        <div
          v-for="(item, idx) in items"
          :key="item.id + '-mobile'"
          @click="openLightbox(idx)"
          class="rounded-2xl p-3 pb-6 glass-card border border-white/8 cursor-pointer shadow-lg"
        >
          <div class="w-full h-48 rounded-lg overflow-hidden bg-space-black mb-3">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          </div>
          <div class="text-left">
            <span class="block font-sans text-[7px] tracking-widest text-gold-primary uppercase font-bold">{{ item.category }}</span>
            <span class="block font-serif text-sm font-bold text-text-primary mt-0.5">{{ item.title }}</span>
          </div>
        </div>
      </div>

      <!-- Empty state placeholder when no items exist -->
      <div
        v-else
        class="relative w-full py-20 px-8 rounded-[3rem] border border-white/5 bg-space-black/20 backdrop-blur-sm text-center flex flex-col items-center justify-center min-h-[400px]"
      >
        <div class="w-16 h-16 rounded-full border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-4 bg-gold-primary/5">
          <ImageIcon class="w-6 h-6 animate-pulse" />
        </div>
        <h3 class="font-serif text-xl font-semibold text-gold-soft mb-2">No transmissions logged in this gallery.</h3>
        <p class="font-sans text-xs md:text-sm text-text-muted/70 max-w-sm">
          Memories of our upcoming Visakhapatnam Prom Night and subsequent summits will appear here as they are archived. Check back soon!
        </p>
      </div>

    </div>

    <!-- Lightbox Modal -->
    <div
      v-if="isOpen && items.length > 0"
      class="fixed inset-0 z-999 flex items-center justify-center p-4 animate-[modalScale_0.35s_ease-out]"
    >
      <!-- Backdrop -->
      <div @click="closeLightbox" class="absolute inset-0 bg-space-black/95 backdrop-blur-md" />

      <!-- Close Button -->
      <button
        @click="closeLightbox"
        class="absolute top-6 right-6 p-3 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 text-text-muted hover:text-text-primary focus:outline-none transition-colors z-20"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Navigation Arrows -->
      <button
        @click="prevImage"
        class="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 text-text-muted hover:text-text-primary focus:outline-none transition-colors z-20"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>

      <button
        @click="nextImage"
        class="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 text-text-muted hover:text-text-primary focus:outline-none transition-colors z-20"
      >
        <ChevronRight class="w-5 h-5" />
      </button>

      <!-- Active Content Card -->
      <div class="relative max-w-5xl w-full max-h-[85vh] z-10 flex flex-col items-center justify-center select-none">
        <img
          :src="items[activeIndex].image"
          :alt="items[activeIndex].title"
          class="max-w-full max-h-[70vh] object-contain rounded-2xl border border-white/5 shadow-2xl"
        />

        <!-- Title block below picture -->
        <div class="mt-4 text-center">
          <span class="font-sans text-[10px] tracking-widest text-gold-primary uppercase font-bold">
            {{ items[activeIndex].category }}
          </span>
          <h4 class="font-serif text-xl md:text-2xl text-text-primary mt-1">
            {{ items[activeIndex].title }}
          </h4>
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
