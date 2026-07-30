<script setup lang="ts">
import { ref } from 'vue';
import { Linkedin, Github } from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  linkedin: string;
  github: string;
}

const members = ref<TeamMember[]>([
  {
    id: 1,
    name: 'Aurelia Vance',
    role: 'Executive Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneering startup pipelines, structuring cohort funding nodes, and managing chapter integrations.',
    linkedin: '#',
    github: '#'
  },
  {
    id: 2,
    name: 'Lysander Thorne',
    role: 'Technical Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Steering platform software, hackathon compute hubs, and decentralization credentials architecture.',
    linkedin: '#',
    github: '#'
  },
  {
    id: 3,
    name: 'Seraphina Sterling',
    role: 'Summit Curator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Arranging Ritz-Carlton summit assemblies, investor dinners, and global cohort outreach partnerships.',
    linkedin: '#',
    github: '#'
  },
  {
    id: 4,
    name: 'Cassian Mercer',
    role: 'Outreach Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Sustaining university chapter alignments, developer lounges, and community grant distributions.',
    linkedin: '#',
    github: '#'
  }
]);

// 3D Perspective Tilt on Hover
const hoveredMemberId = ref<number | null>(null);
const tiltX = ref(0);
const tiltY = ref(0);

function handleMouseMove(e: MouseEvent, id: number) {
  const el = e.currentTarget as HTMLElement;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  tiltX.value = (x / rect.width) * 15; // Max 15deg rotation
  tiltY.value = -(y / rect.height) * 15;
  hoveredMemberId.value = id;
}

function handleMouseLeave() {
  tiltX.value = 0;
  tiltY.value = 0;
  hoveredMemberId.value = null;
}
</script>

<template>
  <section
    id="team"
    class="relative py-24 md:py-32 px-6 bg-space-black overflow-hidden select-none"
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

    <!-- Cosmic Glow -->
    <div class="absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
    <div class="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-24">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Chapter Directors
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Command Crew
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          The developers, directors, and curators steering YNC chapter coordinates globally.
        </p>
      </div>

      <!-- Holographic profile capsules grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="member in members"
          :key="member.id"
          @mousemove="handleMouseMove($event, member.id)"
          @mouseleave="handleMouseLeave"
          class="relative p-8 rounded-[3rem] border border-white/5 bg-space-black/35 backdrop-blur-xl flex flex-col items-center justify-between min-h-[420px] transition-all duration-500 hover:border-gold-primary/30 shadow-2xl cursor-crosshair overflow-hidden group origin-center"
          :style="{
            transform: hoveredMemberId === member.id
              ? `perspective(1000px) rotateY(${tiltX}deg) rotateX(${tiltY}deg) scale(1.02)`
              : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
            boxShadow: hoveredMemberId === member.id ? '0 24px 50px rgba(0,0,0,0.8), 0 0 25px rgba(217,178,122,0.08)' : 'none'
          }"
        >
          <!-- Glowing background accent -->
          <div class="absolute -inset-4 bg-gradient-to-tr from-wine-red/10 to-gold-primary/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none" />

          <!-- Profile Photo with Orbiting SVG ring -->
          <div class="relative w-32 h-32 mb-6 flex items-center justify-center shrink-0">
            <!-- Orbiting SVG circle -->
            <svg class="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(217,178,122,0.25)" stroke-width="1.5" stroke-dasharray="10 20" />
            </svg>
            
            <div class="w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-space-black shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10">
              <img :src="member.avatar" :alt="member.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>

          <!-- Name and Role -->
          <div class="text-center space-y-1 mb-4 z-10">
            <h3 class="font-serif text-lg font-bold text-text-primary tracking-wide">{{ member.name }}</h3>
            <span class="block font-sans text-[8px] tracking-[0.25em] text-gold-primary uppercase font-bold">{{ member.role }}</span>
          </div>

          <!-- Bio -->
          <p class="font-sans text-[11px] text-text-muted/80 leading-relaxed text-center mb-6 z-10">
            {{ member.bio }}
          </p>

          <!-- Social links -->
          <div class="flex gap-4 items-center justify-center z-10">
            <a
              :href="member.linkedin"
              class="p-2.5 rounded-full border border-white/5 bg-white/2 hover:border-gold-primary/30 text-text-muted hover:text-gold-primary transition-all duration-300 focus:outline-none"
              aria-label="LinkedIn Profile"
            >
              <Linkedin class="w-3.5 h-3.5" />
            </a>
            <a
              :href="member.github"
              class="p-2.5 rounded-full border border-white/5 bg-white/2 hover:border-gold-primary/30 text-text-muted hover:text-gold-primary transition-all duration-300 focus:outline-none"
              aria-label="GitHub Profile"
            >
              <Github class="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.origin-center {
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>
