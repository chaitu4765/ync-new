<script setup lang="ts">
import { ref } from 'vue';
import { Mail, Phone, MapPin, Check } from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const name = ref('');
const email = ref('');
const message = ref('');
const isSubmitting = ref(false);
const success = ref(false);
const error = ref('');

const chapters = [
  { city: 'San Francisco', coords: 'top-[35%] left-[15%]' },
  { city: 'London', coords: 'top-[25%] left-[45%]' },
  { city: 'Bangalore', coords: 'top-[55%] left-[70%]' },
  { city: 'Singapore', coords: 'top-[62%] left-[75%]' },
  { city: 'Tokyo', coords: 'top-[38%] left-[82%]' }
];

async function handleSubmit() {
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    error.value = 'All fields are required.';
    return;
  }
  if (!email.value.includes('@')) {
    error.value = 'Please provide a valid email.';
    return;
  }

  error.value = '';
  isSubmitting.value = true;

  // Simulate server transmission
  await new Promise((resolve) => setTimeout(resolve, 1500));

  isSubmitting.value = false;
  success.value = true;

  // Reset form
  name.value = '';
  email.value = '';
  message.value = '';

  // Reset success message after some time
  setTimeout(() => {
    success.value = false;
  }, 4000);
}
</script>

<template>
  <section
    id="contact"
    class="relative py-24 md:py-32 px-6 bg-sec-bg"
  >
    <!-- Background Sparkles overlay -->
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
    <div class="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-burgundy-deep/5 rounded-full blur-[140px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Establish Connection
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Contact the Hangar
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          Reach out for chapter sponsorships, membership questions, or ecosystem alliances.
        </p>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- Left Column: Details & Futuristic Chapter Map -->
        <div class="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <h3 class="font-serif text-3xl font-bold text-text-primary tracking-wide mb-6">
              Global Headquarters
            </h3>
            <p class="font-sans text-sm text-text-muted leading-relaxed mb-8">
              YNC operates as a decentralized network of active builder chapters. Our central operations team coordinates global logistics, summits, and grants.
            </p>

            <!-- Contact List -->
            <div class="space-y-6 font-sans text-sm text-text-muted mb-12">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full border border-gold-primary/20 bg-space-black flex items-center justify-center text-gold-primary">
                  <Mail class="w-4 h-4" />
                </div>
                <div>
                  <div class="text-[9px] tracking-widest uppercase text-gold-soft/50 font-bold">Mail Transmission</div>
                  <a href="mailto:hello@ync.community" class="hover:text-gold-primary transition-colors">hello@ync.community</a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full border border-gold-primary/20 bg-space-black flex items-center justify-center text-gold-primary">
                  <Phone class="w-4 h-4" />
                </div>
                <div>
                  <div class="text-[9px] tracking-widest uppercase text-gold-soft/50 font-bold">Secure Line</div>
                  <a href="tel:+1800YNCHUB" class="hover:text-gold-primary transition-colors">+1 (800) YNC-HUB</a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full border border-gold-primary/20 bg-space-black flex items-center justify-center text-gold-primary">
                  <MapPin class="w-4 h-4" />
                </div>
                <div>
                  <div class="text-[9px] tracking-widest uppercase text-gold-soft/50 font-bold">HQ Orbit Coordinate</div>
                  <span>San Francisco, California</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Futuristic Minimal Network Map Placeholder -->
          <div class="relative w-full h-56 rounded-3xl border border-white/5 bg-space-black/60 overflow-hidden shadow-inner flex flex-col justify-end p-6 group">
            <!-- Vector Grid Background Pattern -->
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            <!-- Slow orbit circle overlay -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="w-48 h-48 rounded-full border border-gold-primary/5 animate-[spin_40s_linear_infinite]" />
              <div class="w-32 h-32 rounded-full border border-white/5 absolute animate-[spin_20s_linear_infinite_reverse]" />
            </div>

            <!-- Chapter Hotspots -->
            <div
              v-for="chap in chapters"
              :key="chap.city"
              class="absolute z-10 group/node cursor-pointer"
              :class="chap.coords"
            >
              <!-- Glowing Dot -->
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-primary opacity-75" />
                <span class="relative inline-flex rounded-full h-3 w-3 bg-gold-primary shadow-[0_0_8px_#D9B27A]" />
              </span>
              
              <!-- Hover City Tag -->
              <span class="absolute left-4 top-1/2 -translate-y-1/2 bg-space-black/90 border border-gold-primary/30 text-[9px] tracking-widest text-gold-primary px-2 py-0.5 rounded font-sans uppercase opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md whitespace-nowrap">
                {{ chap.city }}
              </span>
            </div>

            <!-- Map Label -->
            <span class="relative z-10 font-sans text-[9px] tracking-[0.3em] text-gold-soft/50 uppercase select-none">
              Global Orbital Chapter Grid
            </span>
          </div>
        </div>

        <!-- Right Column: Glass Transmission Form -->
        <div class="lg:col-span-7 relative">
          <!-- Glow underlying -->
          <div class="absolute -inset-4 bg-gradient-to-tr from-gold-primary/5 to-burgundy-deep/5 rounded-[2.5rem] blur-2xl opacity-60" />
          
          <div class="relative glass-card p-8 md:p-10 rounded-[2.5rem] border border-white/5 overflow-hidden">
            
            <!-- Success Overlay inside Card -->
            <div
              v-if="success"
              class="absolute inset-0 bg-space-black/90 z-20 flex flex-col items-center justify-center text-center p-8 transition-opacity duration-500 animate-[fadeIn_0.5s_ease-out]"
            >
              <div class="w-16 h-16 rounded-full border border-gold-primary flex items-center justify-center bg-gold-primary/10 text-gold-primary mb-6 shadow-[0_0_20px_rgba(217,178,122,0.35)] animate-pulse">
                <Check class="w-8 h-8" />
              </div>
              <h4 class="font-serif text-2xl font-bold text-gold-primary mb-3">Transmission Logged</h4>
              <p class="font-sans text-xs md:text-sm text-text-muted leading-relaxed max-w-sm">
                Your message has been encrypted and broadcasted to YNC Command. An operator will review and establish a connection shortly.
              </p>
            </div>

            <span class="font-sans text-[9px] tracking-[0.3em] text-gold-primary uppercase font-bold block mb-2">
              Secure Transmission
            </span>
            <h3 class="font-serif text-2xl md:text-3xl font-bold tracking-wide text-text-primary mb-8">
              Send Message
            </h3>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Your Name</label>
                <input
                  v-model="name"
                  type="text"
                  placeholder="e.g., Alexander Vance"
                  class="w-full bg-space-black/40 border border-white/8 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-colors shadow-inner"
                />
              </div>

              <div>
                <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Your Email</label>
                <input
                  v-model="email"
                  type="email"
                  placeholder="e.g., alex@cosmos.io"
                  class="w-full bg-space-black/40 border border-white/8 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-colors shadow-inner"
                />
              </div>

              <div>
                <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Message Description</label>
                <textarea
                  v-model="message"
                  rows="5"
                  placeholder="Describe your project, chapter proposal, or sponsor requirements..."
                  class="w-full bg-space-black/40 border border-white/8 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-colors shadow-inner resize-none"
                />
              </div>

              <!-- Error Box -->
              <p v-if="error" class="text-xs text-wine-red tracking-wide font-sans">
                {{ error }}
              </p>

              <!-- Submit button -->
              <InteractiveHoverButton
                type="submit"
                :disabled="isSubmitting"
                :text="isSubmitting ? 'BROADCASTING TRANSMISSION...' : 'SEND TRANSMISSION'"
                class="w-full text-xs font-semibold tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes shinesweep {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
