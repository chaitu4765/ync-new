<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight, Github, Linkedin, Twitter, Check } from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

const newsletterEmail = ref('');
const isSubscribed = ref(false);
const subError = ref('');

function handleSubscribe() {
  if (!newsletterEmail.value.trim() || !newsletterEmail.value.includes('@')) {
    subError.value = 'Please enter a valid email.';
    return;
  }
  subError.value = '';
  isSubscribed.value = true;
  newsletterEmail.value = '';

  setTimeout(() => {
    isSubscribed.value = false;
  }, 4000);
}

function scrollToSection(selector: string) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <footer
    class="relative py-20 px-6 bg-space-black border-t border-white/5 overflow-hidden"
  >
    <!-- Background Stars & Particles -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="0.8"
        :max-size="2"
        :speed="2"
        :particle-density="40"
      />
    </div>

    <!-- Cosmic Glow -->
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-wine-red/5 rounded-full blur-[120px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mb-16">
      
      <!-- Column 1: Logo & Tagline -->
      <div class="md:col-span-4">
        <!-- Logo -->
        <a
          href="#"
          @click.prevent="scrollToSection('#app')"
          class="flex items-center gap-3 mb-6 focus:outline-none"
        >
          <div class="w-10 h-10 rounded-full overflow-hidden border border-gold-primary/30 flex items-center justify-center bg-space-black shadow-[0_0_15px_rgba(217,178,122,0.15)]">
            <img src="/images/ync_logo.jpg" alt="YNC Logo" class="w-full h-full object-cover select-none" />
          </div>
          <div class="flex flex-col">
            <span class="font-serif text-xl font-bold tracking-[0.2em] text-gold-primary">YNC</span>
            <span class="font-sans text-[8px] tracking-[0.3em] text-text-muted/60 uppercase">Youth Networking</span>
          </div>
        </a>
        <p class="font-sans text-xs md:text-sm text-text-muted/80 leading-relaxed max-w-sm mb-6">
          An elite international youth community bringing together builders, designers, and founders under a constellation of opportunities.
        </p>

        <!-- Social Handles -->
        <div class="flex items-center gap-3">
          <a
            href="#"
            class="w-9 h-9 rounded-full border border-white/5 bg-white/2 flex items-center justify-center text-text-muted hover:text-gold-primary hover:border-gold-primary/30 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin class="w-4 h-4" />
          </a>
          <a
            href="#"
            class="w-9 h-9 rounded-full border border-white/5 bg-white/2 flex items-center justify-center text-text-muted hover:text-gold-primary hover:border-gold-primary/30 transition-all duration-300"
            aria-label="Twitter"
          >
            <Twitter class="w-4 h-4" />
          </a>
          <a
            href="#"
            class="w-9 h-9 rounded-full border border-white/5 bg-white/2 flex items-center justify-center text-text-muted hover:text-gold-primary hover:border-gold-primary/30 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github class="w-4 h-4" />
          </a>
        </div>
      </div>

      <!-- Column 2: Navigation Links -->
      <div class="md:col-span-2 md:col-start-6">
        <h4 class="font-serif text-lg font-bold text-gold-soft tracking-wider mb-6">Navigation</h4>
        <ul class="space-y-3 font-sans text-xs tracking-wider text-text-muted">
          <li>
            <a href="#about" @click.prevent="scrollToSection('#about')" class="hover:text-gold-primary transition-colors">About</a>
          </li>
          <li>
            <a href="#features" @click.prevent="scrollToSection('#features')" class="hover:text-gold-primary transition-colors">Features</a>
          </li>
          <li>
            <a href="#events" @click.prevent="scrollToSection('#events')" class="hover:text-gold-primary transition-colors">Events</a>
          </li>
          <li>
            <a href="#stats" @click.prevent="scrollToSection('#stats')" class="hover:text-gold-primary transition-colors">Why YNC</a>
          </li>
          <li>
            <a href="#gallery" @click.prevent="scrollToSection('#gallery')" class="hover:text-gold-primary transition-colors">Gallery</a>
          </li>
        </ul>
      </div>

      <!-- Column 3: Resource Links -->
      <div class="md:col-span-2">
        <h4 class="font-serif text-lg font-bold text-gold-soft tracking-wider mb-6">Resources</h4>
        <ul class="space-y-3 font-sans text-xs tracking-wider text-text-muted">
          <li>
            <a href="#team" @click.prevent="scrollToSection('#team')" class="hover:text-gold-primary transition-colors">Leadership</a>
          </li>
          <li>
            <a href="#faq" @click.prevent="scrollToSection('#faq')" class="hover:text-gold-primary transition-colors">FAQ</a>
          </li>
          <li>
            <a href="#contact" @click.prevent="scrollToSection('#contact')" class="hover:text-gold-primary transition-colors">Contact</a>
          </li>
          <li>
            <a href="#" class="hover:text-gold-primary transition-colors">Membership Portal</a>
          </li>
        </ul>
      </div>

      <!-- Column 4: Newsletter Submission -->
      <div class="md:col-span-3">
        <h4 class="font-serif text-lg font-bold text-gold-soft tracking-wider mb-6">Broadcast Deck</h4>
        <p class="font-sans text-xs text-text-muted/80 leading-relaxed mb-6">
          Subscribe to our orbital transmissions. Get early notice of new mixers and event passes.
        </p>

        <!-- Newsletter form -->
        <form @submit.prevent="handleSubscribe" class="relative max-w-sm">
          <input
            v-model="newsletterEmail"
            type="email"
            placeholder="e.g., mail@ync.space"
            class="w-full bg-space-black/50 border border-white/8 rounded-xl pl-4 pr-12 py-3.5 text-xs text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-colors shadow-inner"
            :disabled="isSubscribed"
          />
          <button
            type="submit"
            class="absolute right-1.5 top-1.5 p-2 rounded-lg bg-gradient-to-r from-gold-bronze to-gold-primary hover:shadow-[0_0_10px_rgba(217,178,122,0.3)] text-space-black focus:outline-none transition-all duration-300"
            aria-label="Subscribe"
            :disabled="isSubscribed"
          >
            <Check class="w-3.5 h-3.5" v-if="isSubscribed" />
            <ArrowRight class="w-3.5 h-3.5" v-else />
          </button>
        </form>
        <p v-if="subError" class="mt-2 text-[10px] text-wine-red font-sans">{{ subError }}</p>
        <p v-if="isSubscribed" class="mt-2 text-[10px] text-gold-primary font-sans flex items-center gap-1.5 animate-pulse">
          Subscribed to Broadcasts!
        </p>
      </div>

    </div>

    <!-- Copyright Block -->
    <div class="max-w-7xl mx-auto relative z-10 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-[10px] tracking-widest text-text-muted/50 uppercase">
      <div>
        © 2026 YNC (Youth Networking Community). All rights reserved.
      </div>
      <div class="flex items-center gap-6">
        <a href="#" class="hover:text-gold-primary transition-colors">Privacy Charter</a>
        <a href="#" class="hover:text-gold-primary transition-colors">Orbital Conduct</a>
      </div>
    </div>
  </footer>
</template>
