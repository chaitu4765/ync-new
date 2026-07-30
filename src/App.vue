<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import StarsBackground from '@/components/ui/stars/StarsBackground.vue';

interface StarTrail {
  id: number;
  x: number;
  y: number;
  scale: number;
  angle: number;
}

const isLoading = ref(true);

// Global Cursor Glow Coordinates
const cursorX = ref(-100);
const cursorY = ref(-100);
const cursorOpacity = ref(0);

// Star Trails List
const starTrails = ref<StarTrail[]>([]);
let starId = 0;
let lastTime = 0;

function addStar(x: number, y: number) {
  const id = starId++;
  const scale = Math.random() * 0.7 + 0.3;
  const angle = Math.random() * 360;

  starTrails.value.push({ id, x, y, scale, angle });

  // Remove star after animation fades out (800ms)
  setTimeout(() => {
    const index = starTrails.value.findIndex(s => s.id === id);
    if (index !== -1) {
      starTrails.value.splice(index, 1);
    }
  }, 800);
}

function updateCursor(e: MouseEvent) {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
  cursorOpacity.value = 1;

  // Throttle trail emissions
  const now = Date.now();
  if (now - lastTime > 35) {
    addStar(e.clientX, e.clientY);
    lastTime = now;
  }
}

function hideCursor() {
  cursorOpacity.value = 0;
}

onMounted(() => {
  // Clear old localStorage keys to ensure new launch parameters apply cleanly
  if (localStorage.getItem('ync_users') && !localStorage.getItem('ync_version_5')) {
    localStorage.clear();
    localStorage.setItem('ync_version_5', 'true');
    window.location.reload();
    return;
  }
  localStorage.setItem('ync_version_5', 'true');

  window.addEventListener('mousemove', updateCursor);
  document.addEventListener('mouseleave', hideCursor);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', updateCursor);
  document.removeEventListener('mouseleave', hideCursor);
});
</script>

<template>
  <div>
    <!-- Global Preloader -->
    <LoadingScreen v-if="isLoading" @complete="isLoading = false" />

    <!-- Site Wrapper -->
    <div
      v-else
      class="relative min-h-screen text-text-primary overflow-hidden animate-[fadeInSite_1.2s_ease-out]"
    >
      <!-- Global Cursor Glow layer -->
      <div
        class="cursor-glow hidden md:block"
        :style="{
          left: `${cursorX}px`,
          top: `${cursorY}px`,
          opacity: cursorOpacity
        }"
      />

      <!-- Cursor Particles (Stars Trail) -->
      <svg
        v-for="star in starTrails"
        :key="star.id"
        class="fixed pointer-events-none z-[9999] text-gold-primary/70 filter drop-shadow-[0_0_3px_rgba(217,178,122,0.8)] animate-[starFade_0.8s_ease-out_forwards]"
        :style="{
          left: `${star.x}px`,
          top: `${star.y}px`,
          width: '10px',
          height: '10px',
          transform: `translate(-50%, -50%) scale(${star.scale}) rotate(${star.angle}deg)`
        }"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>

      <!-- Primary Stars Parallax Background wrapping router views -->
      <StarsBackground
        :factor="0.02"
        :speed="70"
        star-color="rgba(217, 178, 122, 0.45)"
        class="min-h-screen bg-space-black"
      >
        <router-view />
      </StarsBackground>
    </div>
  </div>
</template>

<style>
@keyframes fadeInSite {
  from {
    opacity: 0;
    transform: scale(1.01);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@keyframes starFade {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) translateY(12px);
  }
}
</style>
