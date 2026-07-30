<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import About from '@/components/About.vue';
import JourneyOrbit from '@/components/JourneyOrbit.vue';
import Features from '@/components/Features.vue';
import Events from '@/components/Events.vue';
import Stats from '@/components/Stats.vue';
import BenefitsSystem from '@/components/BenefitsSystem.vue';
import Gallery from '@/components/Gallery.vue';
import Testimonials from '@/components/Testimonials.vue';
import JoinPortal from '@/components/JoinPortal.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="relative w-full">
    <!-- Floating Glass macOS Dock Navbar -->
    <Navbar />

    <!-- Story chapters -->
    <Hero />
    <About />
    <JourneyOrbit />
    <Features />
    <Events />
    <Stats />
    <BenefitsSystem />
    <Gallery />
    <Testimonials />
    <JoinPortal />
    <Footer />
  </div>
</template>
